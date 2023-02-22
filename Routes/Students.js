const express = require('express')
const router = express.Router();
const { upload } = require('../gridFs')


const { student } = require('../model/Model')


router.get("/", (req, res) => {
    res.send("student testing done");
})
// add student [/api/student/add]
router.post("/add", upload.single('file'), async (req, res) => {
    try {
        const response = await student.create({
            filename: req.file.filename,
            fileid: req.file.id,
            batch: req.body.batch,
        })
        console.log("student added successfully");
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
});
// get teacher
router.get("/fetch", async (req, res) => {
    try {
        const response = await student.find().sort({ batch: 1 });
        console.log("fetched");
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
})
delete teacher 
router.delete("/delete/:id", async (req, res) => {
    let ft = await student.findById(req.params.id);
    if (!ft)
        return res.status(400).json({ "msg": "This year does not exists" })
    ft = await student.findByIdAndDelete(req.params.id)
    console.log("student deleted sucessfully");
    res.json({ "msg": "year has been deleted" })
});

module.exports = router