const connexion         = require('../bdd');
const getQuery          = require('../functions/functions');

exports.new             = (req, res) => {
    [query, data] = getQuery(false, req);

    connexion()
        .then (con => {
            con.query(query, data)
                .then (_ => res.status(201).json({message: 'Publication publié'}))
                .catch (err => res.status(400).json({err}));
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
                .then (rows => res.status(200).json(rows['0']))
                .catch (err => res.status(400).json({err}));
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