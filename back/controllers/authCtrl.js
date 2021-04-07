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
                                token: jwt.sign(
                                    { userId: rows['0'].id },
                                'RANDOM_TOKEN_SECRET',
                                { expiresIn: '24h' }
                                )}) : res.status(400).json({error: 'L\'adresse email ou le mot passe n\'est pas correct'}))
                            .catch(err => res.status(500).json({err}))
                    }
                    con.end();
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({err})
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
                            res.status(201).json({message: 'Utilisateur créer'})
                        })
                        .catch(err => res.status(500).json({err}))
                })
                .catch(_ => res.status(401).json({error: 'Cette email est déjà utliser'}));
        })
}

exports.delete      = (req, res) => {
    console.log('lol');
    const email     = req.body.email;
    const password  = req.body.password;

    connection()
        .then(con => {
            con.query('SELECT * FROM user WHERE email = ?', [email])
                .then(rows => {
                    if (rows['0'] === undefined) {
                        res.status(400).json({error: 'Aucun utilisateur trouvé'});
                    } else {
                        bcrypt.compare(password, rows['0'].password)
                            .then(verif => {
                                if (verif){
                                    con.query('DELETE FROM user WHERE email = ?', [email])
                                        .then(_ => res.status(200).json({message: 'Compte supprimé'}))
                                        .catch(err => res.status(400).json({err}));
                                } else {
                                    res.status(400).json({error: 'Mot de passe incorrect'})
                                }
                            })
                            .catch(err => res.status(500).json({err}))
                    }
                })
        })
}