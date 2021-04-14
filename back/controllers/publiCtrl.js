const connexion         = require('../bdd');
const getQuery          = require('../functions/functions');

exports.new             = (req, res) => {
    console.log()
    const id = parseInt(req.body.userId);
    const username = req.body.username;
    const description = req.body.description;
    const onlyText = req.body.file === undefined ? 1 : 0;
    const file = req.body.file     === undefined ? null : req.body.file.file;
    const query = "INSERT INTO publication SET idUser = ?, usernameUser = ?, description = ?, onlyText = ?, date_post = NOW(), file = ?";

    connexion()
        .then (con => {
            con.query(query, [id, username, description, onlyText, file])
                .then (_ => res.status(201).json({message: 'Publication publié'}))
                .catch (err => res.status(400).json({err}) )
        })

}

exports.edit            = (req, res) => {
    [query, data] = getQuery(true, req);

    connexion()
        .then (con => {
            con.query(query, data)
                .then (_ => res.status(200).json({message: 'Publication modifié'}))
                .catch (err => res.status(400).json({err}));
        })
}

exports.getAllPubli     = (req, res) => {
    connexion()
        .then(con => {
            con.query("SELECT * FROM publication")
                .then (rows => res.status(200).json(rows))
                .catch (err => res.status(401).json({err}));
        })
        .catch (err => res.status(400).json({err}))
}

exports.getOnePubli     = (req, res) => {
    connexion()
        .then(con => {
            con.query("SELECT * FROM publi WHERE id = ?", [req.params.id])
                .then(row => res.status(200).json(row['0']))
                .catch(err => res.status(400).json({err}))
        })
}