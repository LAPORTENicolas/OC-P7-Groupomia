const connection        = require('../bdd');

exports.new             = (req, res) => {

    const commentary    = req.body.message;
    const username      = req.body.username;
    const userId        = req.body.userId;
    const publicationId = req.body.publicationId;
    const owner         = req.body.owner;
    const query         = "INSERT INTO commantary SET userId = ?, username = ?, message = ?, idPublication = ?, idOwnerPublication = ?";
    const data          = [userId, username, commentary, publicationId, owner];

    connection()
        .then(con => {
            con.query(query, data)
                .then(_ => res.status(201).json({message: 'Commentaire publié'}))
                .catch(err => res.status(400).json({error: err.code}))
        })
}

exports.getAllFromId    = (req, res) => {

    const query         = "SELECT * FROM commantary WHERE idPublication = ?";
    const idPublication = req.params.id;

    connection()
        .then( con => {
            con.query(query, [idPublication])
                .then(rows => res.status(200).json(rows))
                .catch(err => res.status(400).json({error: err.code}))
        })
}