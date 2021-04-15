const connexion         = require('../bdd');
const getQuery          = require('../functions/functions');

exports.new             = (req, res) => {
    const id            = req.body.id;
    const username      = req.body.username;
    const onlyText      = req.body.onlyText;
    const description   = req.body.description;
    const filePath      = onlyText === '0' ? `${req.protocol}://${req.get('host')}/upload/${req.file.filename}` : null
    const comantary     = {};
    const query         = "INSERT INTO publication SET idUser = ?, usernameUser = ?, description = ?, onlyText = ?, date_post = NOW(), filePath = ?, comantary = ?";
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

exports.getAllPubli     = (req, res) => {
    connexion()
        .then(con => {
            con.query("SELECT * FROM publication WHERE idUser = ?", [req.params.id])
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
    const query         = "SELECT * FROM publication";

    connexion()
        .then(con => {
            con.query(query)
                .then(rows => res.status(200).json(rows))
                .catch(err => res.status(400).json({error: err.code}))
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