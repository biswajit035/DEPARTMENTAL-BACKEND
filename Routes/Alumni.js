const express = require('express')
const router = express.Router();
const { upload } = require('../gridFs')


const { alumni } = require('../Model/model')


router.get("/", (req, res) => {
    res.send("alumni testing done");
})
// add alumni [/api/alumni/add]
router.post("/add", upload.single('file'), async (req, res) => {
    try {
        const response = await alumni.create({
            filename: req.file.filename,
            fileid: req.file.id,
            batch: req.body.batch,
        })
        console.log("alumni added successfully");
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
});
// get teacher
router.get("/fetch", async (req, res) => {
    try {
        const response = await alumni.find().sort({ batch: 1 });
        console.log("alumni fetched");
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
})
delete teacher
router.delete("/delete/:id", async (req, res) => {
    let ft = await alumni.findById(req.params.id);
    if (!ft)
        return res.status(400).json({ "msg": "This year does not exists" })
    ft = await alumni.findByIdAndDelete(req.params.id)
    console.log("alumni deleted sucessfully");
    res.json({ "msg": "year has been deleted" })
});

module.exports = router