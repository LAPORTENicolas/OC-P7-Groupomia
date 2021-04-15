const connection    = require('../bdd');

exports.new         = (req, res) => {
    console.log(req.body)

    const commentary    = req.body.commentary;
    const id            = req.body.id;
    const query         = "UPDATE publication SET commantary = ? WHERE id = ?";
    const data          = [JSON.stringify(commentary), id];
    console.log(data);
    connection()
        .then(con => {
            con.query(query, data)
                .then(_ => res.status(201).json({message: 'Commentaire publié'}))
                .catch(err => res.status(400).json({error: err.code}))
        })
}