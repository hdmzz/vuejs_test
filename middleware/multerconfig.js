const multer = require('multer');

// Liste des formats d'images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

// Lieu d'enregistrement et nom du fichier
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
const maxSize = 1 * 1024 * 1024; // 1MB

module.exports = multer({
    storage,
    limits: {fileSize: maxSize}
}).single('file');

