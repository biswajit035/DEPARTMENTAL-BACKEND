const express = require('express')
const router = express.Router();
const { upload } = require('../gridFs')


const { teacher } = require('../Model/model')


router.get("/",(req,res)=>{
    res.send("teacher testing done");
})
// add teacher [/api/teacher/add]
router.post("/add", upload.single('file'), async (req, res) => {
    try {
        const response = await teacher.create({
            filename: req.file.filename,
            fileid: req.file.id,
            name: req.body.fname,
            gender: req.body.gen,
            email: req.body.email,
            mobile: req.body.mno,
            designation: req.body.desg,
            education: req.body.edu,
        })
        console.log(req.file);
        // res.json(response);
        res.json(req.file);
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
});
// get teacher [/api/teacher/fetch]
router.get("/fetch", async (req, res) => {
    try {
        const tres = await teacher.find().sort({ fname: 1 });
        res.send({ tres });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
})
// delete teacher [/api/teacher/delete/:id]
router.delete("/delete/:id", async (req, res) => {
    let ft = await teacher.findById(req.params.id);
    if (!ft)
        return res.status(400).json({ "msg": "This year does not exists" })
    ft = await teacher.findByIdAndDelete(req.params.id)
    console.log("teacher deleted successfully");
    res.json({ "msg": "year has been deleted" })
});

module.exports = router