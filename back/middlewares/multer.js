const multer        = require('multer');

const MULTER_TYPE   = {
    'images/jpg': '.jpg',
    'images/jpeg': '.jpg',
    'images/gif': '.gif',
}

const storage       = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'upload');
    },
    filename: (req, file, callback) => {
        const name      = file.originalname.split(' ').join('_');
        const extension = MINE_TYPES[file.mimeType];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports          = multer({storage: storage}).single('upload');