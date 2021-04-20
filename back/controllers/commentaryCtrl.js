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

exports.delete          = (req, res) => {
    const userId        = req.body.userId;
    const commentId     = req.body.commentId;
    const publicationId = req.body.idPublication;
    const query         = 'DELETE commantary FROM commantary WHERE id = ? AND userID = ? AND idPublication = ?';
    const data          = [commentId, userId, publicationId];

    connection()
        .then(con => {
            con.query(query, data)
                .then(_ => res.status(200).json({meesage: 'Commentaire supprimé'}))
        })
}

exports.deleteAdmin     = (req, res) => {
    const userId        = req.body.userId;
    const commentId     = req.body.commentId;
    const publicationId = req.body.idPublication;
    const query         = 'DELETE commantary FROM commantary WHERE id = ? AND idPublication = ?';
    const data          = [commentId, publicationId];

    connection()
        .then(con => {
            con.query('SELECT admin FROM user WHERE id = ?', [userId])
                .then(row => {
                    if (row[0].admin === 0){
                        res.status(401).json({message: 'Manque de privilèges'});
                    } else {
                        connection()
                            .then(con => {
                                con.query(query, data)
                                    .then(_ => res.status(200).json({meesage: 'Commentaire supprimé'}))
                            })
                    }
                });
        })
}