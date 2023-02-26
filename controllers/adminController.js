const { teacher, student, syllabus, routine, alumni, notice, placement } = require('../Model/model')

async function testUser(req, res, next) {
    return res.status(200).send({ msg: "Testing done" })
}

// ----------------------------------------        TEACHER             ----------------------------------------------------
async function teacherFetch (req, res) {
    try {
        const tres = await teacher.find().sort({ fname: 1 });
        res.send({ tres });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
}
async function teacherAdd(req, res){
    try {
        const response = await teacher.create({
            imageurl: `${process.env.host}/api/files/image/${req.file.filename}`,
            imageid: req.file.id,
            name: req.body.fname,
            gender: req.body.gen,
            email: req.body.email,
            mobile: req.body.mno,
            designation: req.body.desg,
            education: req.body.edu,
        })
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
        const response = await student.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: req.body.batch,
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
            return res.status(400).json({ "msg": "This student list does not exists" })
        ft = await student.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "Student has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};

// ----------------------------------------        SYLLABUS             ----------------------------------------------------
async function syllabusFetch (req, res) {
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
        const response = await syllabus.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: req.body.batch,
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
            return res.status(400).json({ "msg": "This syllabus list does not exists" })
        ft = await syllabus.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "syllabus has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};

// ----------------------------------------        ROUTINE             ----------------------------------------------------
async function routineFetch (req, res) {
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
        const response = await routine.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: req.body.batch,
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
            return res.status(400).json({ "msg": "This routine list does not exists" })
        ft = await routine.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "routine has been deleted successfully" });
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
        const response = await alumni.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: req.body.batch,
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
            return res.status(400).json({ "msg": "This alumni list does not exists" })
        ft = await alumni.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "alumni has been deleted successfully" });
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
        const response = await notice.create({
            pdfurl: `${process.env.host}/api/files/pdf/${req.file.filename}`,
            pdfid: req.file.id,
            batch: req.body.batch,
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
            return res.status(400).json({ "msg": "This notice list does not exists" })
        ft = await notice.findByIdAndDelete(req.params.id)
        res.status(200).send({ "msg": "notice has been deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Some error occured" });
    }
};

// ----------------------------------------        NOTICE             ----------------------------------------------------
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

module.exports = { testUser, teacherFetch, teacherAdd, delTeacher, studentFetch, studentAdd, delStudent, syllabusFetch, syllabusAdd, delsyllabus, routineFetch, routineAdd, delroutine, alumniFetch, alumniAdd, delalumni, noticeAdd, noticeFetch, delnotice, addYear, yearFetch, specificYearFetch, deleteYear, addCompany, deleteCompany }