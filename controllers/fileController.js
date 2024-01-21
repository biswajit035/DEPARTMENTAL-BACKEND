const { conn } = require('../db')
const mongoose = require("mongoose");



let gfs;
conn.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});



async function showPdf (req, res) {
    try {
        // gfs.find({
        //     filename: req.params.filename
        // }).toArray(async (err, files) => {
        //     // check if files
        //     if (!files || files.length === 0) {
        //         return res.status(404).json({
        //             err: "no files exist in"
        //         });
        //     }

            const pdf = await gfs.openDownloadStreamByName(req.params.filename);
            res.setHeader('Content-Type', 'application/pdf');
            pdf.pipe(res);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}

async function showimage(req, res) {
    try {
        gfs.find({
            filename: req.params.filename
        }).toArray(async (err, files) => {
            // check if files
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist in"
                });
            }

            const image = await gfs.openDownloadStreamByName(req.params.filename);
            res.setHeader('Content-Type', 'image/jpeg');
            image.pipe(res);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}

async function showAll(req, res) {
    try {
        gfs.find().toArray((err, files) => {
            // check if files
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist in"
                });
            }
            return res.json(files);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}

// Delete chunks from the db
async function delPdf (req, res) {
    try {
        gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err) return res.status(404).json({ err: err.message });
            res.send("File has been deleted")
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
// Delete chunks from the db
async function delAll (req, res) {
    try {
        gfs.find().toArray(function (err, files) {
            if (err) {
                console.log(err);
                return;
            }

            files.forEach(function (file) {
                bucket.delete(file._id, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            })})
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}



module.exports = { showPdf, showimage, showAll, delPdf, delAll }
