const { teacher, student, syllabus, routine, alumni } = require('../Model/model')

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


module.exports = { testUser, teacherFetch, teacherAdd, delTeacher, studentFetch, studentAdd, delStudent, syllabusFetch, syllabusAdd, delsyllabus, routineFetch, routineAdd, delroutine, alumniFetch, alumniAdd, delalumni }