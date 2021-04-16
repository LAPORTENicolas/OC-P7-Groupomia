const connexion         = require('../bdd');

exports.new             = (req, res) => {
    const id            = req.body.id;
    const username      = req.body.username;
    const onlyText      = req.body.onlyText;
    const description   = req.body.description;
    const filePath      = onlyText === '0' ? `${req.protocol}://${req.get('host')}/upload/${req.file.filename}` : null
    const comantary     = JSON.stringify({});
    const query         = "INSERT INTO publication SET idUser = ?, usernameUser = ?, description = ?, onlyText = ?, date_post = NOW(), filePath = ?, commantary = ?";
    const data          = [id, username, description, onlyText, filePath, comantary];

    connexion()
        .then (con => {
            con.query(query, data)
                .then (_ => res.status(201).json({message: 'Publication publié'}))
                .catch (err => res.status(400).json({error: err.code}) )
        })

}

exports.edit            = (req, res) => {
    const id            = req.body.id;
    const userId        = req.body.userId;
    const description   = req.body.description;
    const file          = req.file === undefined ? undefined : `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
    const onlyText      = req.file === undefined ? undefined : '0';
    const query         = req.file === undefined ? 'UPDATE publication SET description = ? WHERE id = ? AND idUser = ?' : 'UPDATE publication SET description = ?, onlyText = \'0\', filePath = ? WHERE id = ? AND idUser = ?'
    console.log(file);
    const data          = req.file === undefined ? [description, id, userId] : [description, file, id, userId]

    connexion()
        .then (con => {
            con.query(query, data)
                .then (_ => {
                    res.status(200).json({message: 'Publication modifié'})
                })
                .catch (err => res.status(400).json({error: err.code}));
        })
}

exports.editAdmin       = (req, res) => {
    const id            = req.body.id;
    const userId        = req.body.userId;
    const description   = req.body.description;
    const file          = req.file === undefined ? undefined : `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`;
    const onlyText      = req.file === undefined ? undefined : '0';
    const query         = req.file === undefined ? 'UPDATE publication SET description = ? WHERE id = ?' : 'UPDATE publication SET description = ?, onlyText = \'0\', filePath = ? WHERE id = ?'
    const data          = req.file === undefined ? [description, id] : [description, file, id]
    console.log(data);
    connexion()
        .then(con => con.query('SELECT admin FROM user WHERE id = ?', [userId]).then(row => {
            if (row[0].admin === 0) {
                res.status(401).json({error: 'Manque de privileges'})
            } else {
                connexion()
                    .then (con => {
                        con.query(query, data)
                            .then (_ => {
                                console.log(_);
                                res.status(200).json({message: 'Publication modifié'})
                            })
                            .catch (err => res.status(400).json({error: err.code}));
                    })
            }
        }))
}

exports.delete          = (req, res) => {
    const id            = req.body.id;
    const userId        = req.body.userId;
    const query         = 'DELETE FROM publication WHERE id = ? AND idUser = ?';
    const data          = [id, userId];

    connexion()
        .then(con => {
            con.query(query, data)
                .then(_ => res.status(200).json({message: 'Publication supprimé'}))
                .catch(err => res.status(400).json({error: err.code}))
        })
}

exports.deleteAdmin     = (req, res) => {
    const id            = req.body.id;
    const userId        = req.body.userId;
    const query         = 'DELETE FROM publication WHERE id = ?';
    const data          = [id];

    connexion()
        .then(con => con.query("SELECT admin FROM user WHERE id = ?", [userId]).then(row => {
            row[0].admin === 0 ? res.status(401).json({error: 'Manque de priviléges'}) : null
            connexion()
                .then(con => {
                    con.query(query, data)
                        .then(_ => res.status(200).json({message: 'Publication supprimé'}))
                        .catch(err => res.status(400).json({error: err.code}))
                })
        }))
}

exports.getAllPubli     = (req, res) => {
    connexion()
        .then(con => {
            con.query("SELECT * FROM publication WHERE idUser = ? ORDER BY date_post DESC", [req.params.id])
                .then (rows => {
                    if (rows.length === 0) {
                        res.status(400).json({error: 'Vous n\'avez encore rien publié'})
                    } else {
                        res.status(200).json(rows);
                    }
                })
                .catch (err => res.status(401).json({error: err.code}));
        })
        .catch (err => res.status(400).json({error: err.code}))
}

exports.getAll          = (req, res) => {
    const query         = "SELECT * FROM publication ORDER BY date_post DESC";

    connexion()
        .then(con => {
            con.query(query)
                .then(rows => res.status(200).json(rows))
                .catch(err => res.status(400).json({error: err.code}))
        })
}

exports.getAllFrom      = (req, res) => {
    const find          = '%' + req.body.find + '%';
    const query         = "SELECT * FROM publication WHERE usernameUser LIKE ? OR description LIKE ? ORDER BY date_post DESC";

    connexion()
        .then(con => {
            con.query(query, [find, find])
                .then(rows => {res.status(200).json(rows)})
                .catch(err => res.status(400).json({error: err.msg}))
        })
}

exports.getOnePubli     = (req, res) => {
    connexion()
        .then(con => {
            con.query("SELECT * FROM publication WHERE id = ?", [req.params.id])
                .then(row => res.status(200).json(row['0']))
                .catch(err => res.status(400).json({error: err.code}))
        })
}

