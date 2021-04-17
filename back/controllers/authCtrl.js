const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const connection    = require('../bdd');

exports.login       = (req, res) => {

    const email     = req.body.email;
    const password  = req.body.password;

    connection()
        .then(con => {
            con.query('SELECT * FROM user WHERE email = ?', [email])
                .then(rows => {
                    if (rows['0'] === undefined) {
                        res.status(400).json({error: 'L\'adresse email ou le mot passe n\'est pas correct'});
                    } else {
                        bcrypt.compare(password, rows['0'].password)
                            .then(verif => verif ? res.status(200).json({
                                userId: rows['0'].id,
                                username: rows['0'].username,
                                email: rows['0'].email,
                                token: jwt.sign(
                                    { userId: rows['0'].id },
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h' }
                                )}) : res.status(400).json({error: 'L\'adresse email ou le mot passe n\'est pas correct'}))
                            .catch(_ => res.status(500).json({error: 'Une erreur est survene'}))
                    }
                    con.end();
                })
                .catch(err => {
                    res.status(400).json({error: 'Une erreur est survenue'})
                })
        })
}

exports.register    = (req, res) => {
    const username  = req.body.username;
    const password  = req.body.password;
    const email     = req.body.email;

    connection()
        .then(con => {
            con.query('SELECT * FROM user WHERE email = ?', [email])
                .then(_ => {
                    bcrypt.hash(password, 10)
                        .then(hash => {
                            con.query('INSERT INTO user SET username = ?, email = ?, password = ?, date_register = NOW()', [username, email, hash])
                                .then(data => res.status(200).json(data))
                                .catch(err => res.status(400).json({error: err.code}));
                            //res.status(201).json({message: 'Utilisateur créer'})
                        })
                        .catch(err => res.status(500).json({error: err.code}))
                })
                .catch(err => res.status(401).json({error: err.code}));
        })
}

exports.delete      = (req, res) => {
    const id        = req.body.userId;
    const query     = 'DELETE user, commantary, publication FROM user, commantary, publication WHERE user.id = ? AND publication.idUser = ? AND (commantary.userId = ? or commantary.idOwnerPublication = ?)'

    connection()
        .then(con => {
            con.query(query, [id, id, id, id])
                .then(_ => res.status(200).json({message: 'Compte supprimé'}))
                .catch(err => res.status(400).json({err}))
        })
}

exports.edit        = (req, res) => {

    const username  = req.body.username;
    const email     = req.body.email;
    const password  = req.body.password;
    const id        = req.body.id;
    let query       = '';
    let data;
    let     publication = false;
    let     commentary  = false;

    connection()
        .then(con => {
            con.query("SELECT * FROM publication WHERE idUser = ?", id)
                .then(row => {
                    if (row[0] !== undefined){
                        publication = true;
                    }
                    con.query("SELECT * FROM commantary WHERE userId = ?", id)
                        .then(row => {
                            if (row[0] !== undefined){
                                commentary = true
                            }
                            bcrypt.hash(password, 10)
                                .then(hash => {
                                    if (commentary === true && publication === false){
                                        query   = "UPDATE commantary, user SET commantary.username = ?, user.username = ?, user.email = ?, user.password = ? WHERE user.id = ? AND commantary.userId = ?"
                                        data    = [username, username, email, hash, id, id];
                                    } else if (commentary === false && publication === true){
                                        query   = "UPDATE publication, user SET publication.usernameUser = ?, user.username = ?, user.email = ?, user.password = ? WHERE user.id = ? AND publication.idUser = ?"
                                        data    = [username, username, email, hash, id, id];
                                    } else if (commentary === true && publication === true){
                                        query   = "UPDATE commantary, publication, user SET publication.usernameUser = ?, commantary.username = ?, user.username = ?, user.email = ?, user.password = ? WHERE user.id = ? AND commantary.userId = ? AND publication.idUser = ?"
                                        data    = [username, username, username, email, hash, id, id, id];
                                    } else if (commentary === false && publication === false){
                                        query   = "UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?"
                                        data    = [username, email, hash, id];
                                    }

                                    connection()
                                        .then(con => {
                                            con.query(query, data)
                                                .then(_ => res.status(200).json({message: 'Modification effectué'}))
                                                .catch(err => res.status(400).json({error: err.code}))
                                        })
                                })
                        })
                })
        })
}