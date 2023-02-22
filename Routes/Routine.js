const express = require('express')
const router = express.Router();
const { upload } = require('../gridFs')


const { routine } = require('../Model/model')


router.get("/", (req, res) => {
    res.send("routine testing done");
})
// add routine [/api/routine/add]
router.post("/add", upload.single('file'), async (req, res) => {
    try {
        const response = await routine.create({
            filename: req.file.filename,
            fileid: req.file.id,
            batch: req.body.batch,
        })
        console.log("routine added successfully");
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
});
// get teacher
router.get("/fetch", async (req, res) => {
    try {
        const response = await routine.find().sort({ batch: 1 });
        console.log("routine fetched");
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
})
delete teacher
router.delete("/delete/:id", async (req, res) => {
    let ft = await routine.findById(req.params.id);
    if (!ft)
        return res.status(400).json({ "msg": "This year does not exists" })
    ft = await routine.findByIdAndDelete(req.params.id)
    console.log("routine deleted sucessfully");
    res.json({ "msg": "year has been deleted" })
});

module.exports = router