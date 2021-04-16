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

    connection()
        .then(con => {
            con.query('DELETE FROM user WHERE id = ?', [id])
                .then(_ => res.status(200).json({message: 'Compte supprimé'}))
                .catch(err => res.status(400).json({err}))
        })
}

exports.edit        = (req, res) => {

    const username  = req.body.username;
    const email     = req.body.email;
    const password  = req.body.password;
    const id        = req.body.id;

    bcrypt.hash(password, 10)
        .then(hash => {
            const data = [username, email, hash, id];
            connection()
                .then(con => {
                    con.query('UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?', data)
                        .then(data => res.status(200).json(data))
                        .catch(err => res.status(400).json({err}));
                })
        })
}