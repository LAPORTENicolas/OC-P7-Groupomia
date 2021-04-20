const connexion         = require('../bdd');
const fs                = require('fs');

exports.new             = (req, res) => {
    const id            = req.body.id;
    const username      = req.body.username;
    const onlyText      = req.body.onlyText;
    const description   = req.body.description;
    const filePath      = onlyText === '0' ? `${req.protocol}://${req.get('host')}/upload/${req.file.filename}` : null
    const query         = "INSERT INTO publication SET idUser = ?, usernameUser = ?, description = ?, onlyText = ?, date_post = NOW(), filePath = ?";
    const data          = [id, username, description, onlyText, filePath];

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
    let     data;
    let     query       = '';
    const   id          = req.body.id;
    const   userId      = req.body.userId;

    connexion()
        .then(con => {
            con.query("SELECT * FROM commantary WHERE idPublication = ?", id)
                .then(row => {
                    if (row[0] === undefined) {
                        query   = 'DELETE publication FROM publication WHERE id = ? AND idUser = ?';
                        data    = [id, userId];
                    } else {
                        query = 'DELETE publication, commantary FROM publication, commantary WHERE publication.id = ? AND commantary.idPublication = ? AND publication.idUser';
                        data = [id, id, userId];
                    }
                    connexion()
                        .then(con => {
                            con.query("SELECT filePath FROM publication WHERE id = ?", id)
                                .then(row => {
                                    if (row[0] === undefined){
                                    } else {
                                        const file  = row[0].filePath === null ? undefined : row[0].filePath.split('/upload/')[1];
                                        if (file === undefined){
                                            connexion()
                                                .then(con => {
                                                    con.query(query, data)
                                                        .then(_ => res.status(200).json({message: 'Publication supprimé'}))
                                                        .catch(err => res.status(400).json({error: err.code}))
                                                })
                                        } else {
                                            fs.unlink( `upload/${file}`, _ => {
                                                connexion()
                                                    .then(con => {
                                                        con.query(query, data)
                                                            .then(_ => res.status(200).json({message: 'Publication supprimé'}))
                                                            .catch(err => res.status(400).json({error: err.code}))
                                                    })
                                            })
                                        }
                                    }
                                })
                        })
        })
    })
}

exports.deleteAdmin     = (req, res) => {
    let     data;
    let     query       = '';
    const   id          = req.body.id;
    const   userId      = req.body.userId;

    connexion()
        .then(con => {
            con.query("SELECT * FROM commantary WHERE idPublication = ?", id)
                .then(row => {
                    if (row[0] === undefined){
                        query   = 'DELETE publication FROM publication WHERE id = ?';
                        data    = [id];
                    } else {
                        query   = 'DELETE publication, commantary FROM publication, commantary WHERE publication.id = ? AND commantary.idPublication = ?';
                        data    = [id, id];
                    }
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
                });
    })
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
    const query         = "SELECT * FROM publication LEFT JOIN userLike ON userLike.publicationId = publication.id AND userLike.userId = ? ORDER BY publication.date_post DESC";
    const data          = [req.body.userId];

    connexion()
        .then(con => {
            con.query(query, data)
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