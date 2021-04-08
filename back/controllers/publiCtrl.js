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