const { teacher, student, syllabus, routine, alumni, notice, placement, event } = require('../Model/model')
const { conn } = require('../db')
const mongoose = require("mongoose");



let gfs;
conn.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

async function testUser(req, res, next) {
    return res.status(200).send({ msg: "Testing done" })
}

// ----------------------------------------        TEACHER             ----------------------------------------------------
async function teacherFetch(req, res) {
    try {
        const tres = await teacher.find().sort({ fname: 1 });
        res.send({ tres });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function teacherAdd(req, res) {
    try {
        const data = JSON.parse(JSON.stringify(req.body));
        const response = await teacher.create({
            imageurl: `${process.env.host}/api/files/image/${req.file.filename}`,
            imageid: req.file.id,
            name: data.fname,
            gender: data.gen,
            email: data.email,
            mobile: data.mno,
            designation: data.desg,
            education: data.edu,
        })
        // console.log(data);
        res.status(200).send({ "msg": "Teacher has been added Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};
async function delTeacher(req, res) {
    try {
        let ft = await teacher.findById(req.params.id);
        if (!ft)
            return res.status(400).json({ "msg": "teacher does not exists" })
        ft = await gfs.delete(new mongoose.Types.ObjectId(ft.imageid), (err, data) => {
                if (err) return res.status(404).json({ err: err.message });
            })
        ft = await teacher.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "Teacher has been deleted successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};

// ----------------------------------------        STUDENT             ----------------------------------------------------
async function studentFetch(req, res) {
    try {
        const response = await student.find().sort({ batch: 1 });
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function studentAdd(req, res) {
    try {
        const data = JSON.parse(JSON.stringify(req.body));
        const response = await student.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: data.batch,
        })
        res.status(200).send({ "msg": "Student has been added Successfully" });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};
async function delStudent(req, res) {
    try {
        let ft = await student.findById(req.params.id);
        if (!ft)
            return res.status(400).json({ "msg": "student does not exists" })
        ft = await gfs.delete(new mongoose.Types.ObjectId(ft.pdfid), (err, data) => {
            if (err) return res.status(404).json({ err: err.message });
        })
        ft = await student.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "Teacher has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};

// ----------------------------------------        SYLLABUS             ----------------------------------------------------
async function syllabusFetch(req, res) {
    try {
        const response = await syllabus.find().sort({ batch: 1 });
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function syllabusAdd(req, res) {
    try {
        const data = JSON.parse(JSON.stringify(req.body));
        const response = await syllabus.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: data.batch,
        })
        res.status(200).send({ "msg": "syllabus has been added Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};
async function delsyllabus(req, res) {
    try {
        let ft = await syllabus.findById(req.params.id);
        if (!ft)
            return res.status(400).json({ "msg": "syllabus does not exists" })
        ft = await gfs.delete(new mongoose.Types.ObjectId(ft.pdfid), (err, data) => {
            if (err) return res.status(404).json({ err: err.message });
        })
        ft = await syllabus.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "Teacher has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};

// ----------------------------------------        ROUTINE             ----------------------------------------------------
async function routineFetch(req, res) {
    try {
        const response = await routine.find().sort({ batch: 1 });
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function routineAdd(req, res) {
    try {
        const data = JSON.parse(JSON.stringify(req.body));
        const response = await routine.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: data.batch,
        })
        res.status(200).send({ "msg": "routine has been added Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};
async function delroutine(req, res) {
    try {
        let ft = await routine.findById(req.params.id);
        if (!ft)
            return res.status(400).json({ "msg": "routine does not exists" })
        ft = await gfs.delete(new mongoose.Types.ObjectId(ft.pdfid), (err, data) => {
            if (err) return res.status(404).json({ err: err.message });
        })
        ft = await routine.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "Teacher has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};

// ----------------------------------------        ALUMNI             ----------------------------------------------------
async function alumniFetch(req, res) {
    try {
        const response = await alumni.find().sort({ batch: 1 });
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function alumniAdd(req, res) {
    try {
        const data = JSON.parse(JSON.stringify(req.body));
        const response = await alumni.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: data.batch,
        })
        res.status(200).send({ "msg": "alumni has been added Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};
async function delalumni(req, res) {
    try {
        let ft = await alumni.findById(req.params.id);
        if (!ft)
            return res.status(400).json({ "msg": "alumni does not exists" })
        ft = await gfs.delete(new mongoose.Types.ObjectId(ft.pdfid), (err, data) => {
            if (err) return res.status(404).json({ err: err.message });
        })
        ft = await alumni.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "Teacher has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};

// ----------------------------------------        NOTICE             ----------------------------------------------------
async function noticeFetch(req, res) {
    try {
        const response = await notice.find().sort({ date: -1 });
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function noticeAdd(req, res) {
    try {
        const data = JSON.parse(JSON.stringify(req.body));
        const response = await notice.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: data.batch,
        })
        res.status(200).send({ "msg": "notice has been added Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};
async function delnotice(req, res) {
    try {
        let ft = await notice.findById(req.params.id);
        if (!ft)
            return res.status(400).json({ "msg": "notice does not exists" })
        ft = await gfs.delete(new mongoose.Types.ObjectId(ft.pdfid), (err, data) => {
            if (err) return res.status(404).json({ err: err.message });
        })
        ft = await notice.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "Teacher has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};

// ----------------------------------------        EVENT             ----------------------------------------------------
async function eventFetch(req, res) {
    try {
        const response = await event.find();
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function eventAdd(req, res) {
    try {
        const data = JSON.parse(JSON.stringify(req.body));
        const filesToUpload = req.files
        const response = await event.create({
            desc: data.desc,
            title: data.title
        })
        const upimg = () => {
            filesToUpload.forEach(async (file) => {
                const pimage = await event.findByIdAndUpdate(response.id, {
                    $push: {
                        image: {
                            imageurl: `${process.env.host}/api/files/image/${file.filename}`,
                            imageid: file.id
                        }
                    }
                }, { new: true })
            })
        }

        upimg();
        res.status(200).send(response);

    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};
async function deleteEvent(req, res) {
    try {
        let ft = await event.findById(req.params.id);
        if (!ft)
            return res.status(400).json({ "msg": "This event does not exists" })
        const upimg = () => {
            // deleting all image
            ft.image.forEach(async (file) => {
                gfs.delete(new mongoose.Types.ObjectId(file.imageid), (err, data) => {
                    if (err) return res.status(404).json({ err: err.message });
                })
            })
        }

        upimg();

        ft = await event.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "event has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function Event(req, res) {
    try {
        const filesToUpload = req.files
        res.status(200).send(filesToUpload);

    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};
// ----------------------------------------        PLACEMENT             ----------------------------------------------------
// ----------       year        -----------
async function addYear(req, res) {
    try {
        const fyear = await placement.findOne({ year: req.body.year })
        if (fyear)
            return res.status(400).json({ "msg": "This year already exists" })
        const ryear = await placement.create({
            year: req.body.year
        })
        res.json(ryear)
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};
async function yearFetch(req, res) {
    try {
        const response = await placement.find().sort({ year: 1 });
        res.send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function specificYearFetch(req, res) {
    try {
        const year = await placement.findOne({ year: req.params.id })
        res.send(year)
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function deleteYear(req, res) {
    try {
        let fyear = await placement.findOne({ year: req.params.year });
        if (!fyear)
            return res.status(400).json({ "msg": "This year does not exists" })
        fyear = await placement.findOneAndDelete({ year: req.params.year })
        res.json({ "msg": "year has been deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
// ----------       company        -----------
async function addCompany(req, res) {
    try {
        const data = req.body;
        let fyear = await placement.findOne({ year: req.params.year });
        if (!fyear)
            return res.status(400).json({ error: "This year does not exists" })
        let fc = await placement.findOne({ year: req.params.year }, { records: { $elemMatch: { company: data.company } } }, { "records.$": 1 });
        if (fc.records.length)
            return res.status(400).json({ error: "This company has already been added" })
        // return res.status(400).json(fc.records.length)
        fyear = await placement.findOneAndUpdate({ year: req.params.year }, { $push: { records: data } }, { new: true });
        res.status(200).send({ "msg": "company has been added Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};
async function deleteCompany(req, res) {
    try {
        let fyear = await placement.findOne({ year: req.params.year }, { "records._id": req.params.id }, { "records.$": 1 });
        if (!fyear)
            return res.status(400).json({ error: "This year does not exists" })
        // let fc = await placement.findOne({ year: req.params.year }, { records: { $elemMatch: { _id: req.params.id } } }, { "records.$": 1 });
        // if (!fc.records.length)
        //     return res.status(400).json({ error: "This company has already been deleted" })
        // return res.status(400).json(fc.records.length)
        fyear = await placement.findOneAndUpdate({ year: req.params.year }, {
            $pull: {
                records: {
                    _id: req.params.id
                }
            }
        }, { new: true });
        res.json({ "msg": "company has been deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}

module.exports = { testUser, teacherFetch, teacherAdd, delTeacher, studentFetch, studentAdd, delStudent, syllabusFetch, syllabusAdd, delsyllabus, routineFetch, routineAdd, delroutine, alumniFetch, alumniAdd, delalumni, noticeAdd, noticeFetch, delnotice, addYear, yearFetch, specificYearFetch, deleteYear, addCompany, deleteCompany, eventAdd, eventFetch, deleteEvent }