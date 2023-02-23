const express = require('express')
const router = express.Router();
const { upload } = require('../gridFs')


const { syllabus } = require('../Model/model')


router.get("/", (req, res) => {
    res.send("syllabus testing done");
})
// add syllabus [/api/syllabus/add]
router.post("/add", upload.single('file'), async (req, res) => {
    try {
        const response = await syllabus.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: req.body.batch,
        })
        console.log("syllabus added successfully");
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
});
// get teacher
router.get("/fetch", async (req, res) => {
    try {
        const response = await syllabus.find().sort({ batch: 1 });
        console.log("syllabus fetched");
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
})
delete teacher
router.delete("/delete/:id", async (req, res) => {
    let ft = await syllabus.findById(req.params.id);
    if (!ft)
        return res.status(400).json({ "msg": "This year does not exists" })
    ft = await syllabus.findByIdAndDelete(req.params.id)
    console.log("syllabus deleted sucessfully");
    res.json({ "msg": "year has been deleted" })
});

module.exports = router