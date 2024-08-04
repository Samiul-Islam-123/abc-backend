const upload = require('../config/MulterConfig');

//it only contains the upload route
const UploadRouter = require('express').Router();

UploadRouter.post('/upload', upload.single('image'),(req,res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    return res.json({ success: true, message: 'Image uploaded successfully', url: req.file.path });
})

module.exports = UploadRouter;