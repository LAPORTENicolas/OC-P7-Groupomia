const connection        = require('../bdd');

exports.new             = (req, res) => {
    const userId        = req.body.userId;
    const publicationId = req.body.publicationId;
    const query         = "INSERT INTO userLike SET userId = ?, publicationId = ?";
    const data          = [userId, publicationId]

    connection()
        .then(con => {
            con.query(query, data)
                .then(_ => res.status(201).json({message: 'Like enregistré'}))
                .catch(err => res.status(400).json({error: err.code}))
        })
}

exports.delete          = (req, res) => {
    const userId        = req.body.userId;
    const publicationId = req.body.publicationId;
    const query         = 'DELETE userLike FROM userLike WHERE userId = ? AND publicationId = ?';
    const data          = [userId, publicationId];

    connection()
        .then(con => {
            con.query(query, data)
                .then(_ => res.status(200).json({meesage: 'Like supprimer'}))
        })
}
