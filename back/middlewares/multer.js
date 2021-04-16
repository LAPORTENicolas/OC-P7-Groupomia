const multer        = require('multer');

const MULTER_TYPE   = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/svg+xml': 'svg',
    'image/gif': 'gif',
    'video/mp4': 'mp4',
    'video/webm': 'webm'
}

const storage       = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'upload');
    },
    filename: (req, file, callback) => {
        const name      = file.originalname.split(' ').join('_');
        const extension = MULTER_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports          = multer({storage: storage}).single('upload');