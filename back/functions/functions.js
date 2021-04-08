const getQuery          = (alreadyCreate, req) => {
    const id            = req.file === undefined ? '' : req.publi.id;
    const userId        = req.file === undefined ? req.body.userId : req.body.publi.userId;
    const username      = req.file === undefined ? req.body.username : req.body.publi.username;
    const description   = req.file === undefined ? req.body.description : req.body.publi.description;
    const file          = req.file === undefined ? 'NULL' : `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
    const onlyText      = req.file === undefined ? '1' : '0';
    const query         = alreadyCreate === true ? "INSERT INTO publication SET usernameUser = ?, description = ?, onlyText = ?, date_post = NOW(), file = ?" : "UPDATE publication SET usernameUser = ?, description = ?, onlyText = 0, date_post = NOW, file = ? WHERE id = ?";
    const data          = alreadyCreate === true ? [username, description, onlyText, file] : [userId, username, description, onlyText, file, id];

    return [query, data];
}

module.exports          = getQuery;