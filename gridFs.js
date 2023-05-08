const crypto = require("crypto");
const { GridFsStorage } = require('multer-gridfs-storage');
const { mongoURI } = require('./db')
const multer = require("multer");
const path = require("path");



// Storage
const storage = new GridFsStorage({
    url: mongoURI,  
    file: (req, file) => {
        console.log(file);
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 30 * 1024 * 1024, // 30MB
    },
});


module.exports = { upload, limits: { fileSize: 50 * 1024 * 1024 } }
