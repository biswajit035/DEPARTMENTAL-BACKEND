const { teacher, user, Otp } = require('../Model/model')
const { conn } = require('../db')
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const mongoose = require("mongoose");
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes in milliseconds
const createdAt = new Date();





let gfs;
conn.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

async function testUser(req, res, next) {
    return res.status(200).send({ msg: "Testing done" })
}




// ----------------------------------------        user             ----------------------------------------------------
async function verifyUser(req, res, next) {
    try {
        const { email } = req.method == "GET" ? req.query : req.body;
        // check the user existance
        let exist = await teacher.findOne({ email });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}

async function generateOTP(req, res) {
    const { email } = req.method == "GET" ? req.query : req.body;

    //     console.log(email);
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({
        code: req.app.locals.OTP,
        mail: email
    })
}

async function verifyOTP(req, res) {
    // destructuring data
    const { email, otp } = req.body;

    try {
        const fuser = await user.findOne({ email: email });

        // User doesn't exists
        if (!fuser) {
            return res.status(401).send({ "msg": "user does not exist" });
        }

        // user is already verified
        if (fuser.isVerified) {
            return res.status(404).send({ msg: "You already hava a password!" });
        }

        // otp expired
        if (createdAt - fuser.createdAt > OTP_EXPIRY) {
            return res.status(401).send({ msg: "OTP expired" });
        }

        // invalid otp
        if (fuser.otp != otp) {
            return res.status(400).send({ msg: "Invalid OTP" });
        }

        // otp verified
        if (otp == fuser.otp) {
            fuser.isVerified = true;
            fuser.save((err, updatedUser) => {
                if (err) {
                    return res.status(400).send({ "msg": "some error occured" });
                }
                const token = jwt.sign({
                    userId: fuser._id,
                    username: fuser.name
                }, process.env.JWT_SECRET);
                return res.status(200).send({
                    "msg": "OTP verified",
                    username: fuser.name,
                    token
                });
            });
        }

    } catch (error) {
        console.log(error);
    }
}


async function createPassword(req, res) {
    const { email, password, name } = req.body;
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

    try {
        const fteacher = await teacher.findOne({ email });
        if (!fteacher) return res.status(404).send({ "msg": "You are not authorised" })
        fteacher
        user.findOne({ email })
            .then(user => {
                if (user.password != "") {
                    return res.status(404).send({ msg: "You already hava a password!" });
                }
            })
            .catch(error => {
                bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        const newUser = new user({ email, password: hashedPassword, otp, createdAt, name, tId: fteacher._id });
                        newUser.save()
                            .then(() => {
                                // sendMail({ userEmail: email, OTP: otp })                               
                                return res.status(201).send({ "msg": "verify your otp", otp })
                            });
                    })
                    .catch(e => {
                        return res.status(500).send({
                            error: "Unable to hashed password"
                        })
                    })
            })

    } catch (error) {
        return res.status(500).send({ error })
    }
}

async function resetPassword(req, res) {
    console.log("test");
    const { email, password } = req.body;
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })

    try {
        const fuser = await user.findOne({ email: email });

        // User doesn't exists
        if (!fuser) {
            return res.status(401).send({ "msg": "user does not exist" });
        }

       

        // password reset
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)

        fuser.password = secPassword;
        fuser.isVerified = false;
        fuser.createdAt = createdAt;
        fuser.otp = otp;

        fuser.save()
            .then(() => {
                // sendMail({ userEmail: email, OTP: otp })                               
                return res.status(201).send({ "msg": "verify your otp", otp })
            });
        

    } catch (error) {
        console.log(error);
    }
}

async function generateOTP(req, res) {
    const { email } = req.method == "GET" ? req.query : req.body;

    //     console.log(email);
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({
        code: req.app.locals.OTP,
        mail: email
    })
}

// async function verifyOTP(req, res) {
//     // destructuring data
//     const { email, password } = req.body;

//     try {
//         const fuser = await user.findOne({ email: email });

//         // User doesn't exists
//         if (!fuser) {
//             return res.status(401).send({ "msg": "user does not exist" });
//         }

//         // password set
//         const salt = await bcrypt.genSalt(10);
//         const secPassword = await bcrypt.hash(password, salt)

//         fuser.password = secPassword;
//         fuser.isVerified = false;



//     } catch (error) {
//         console.log(error);
//     }
// }

async function login(req, res) {


    const { email, password } = req.body;

    try {
        user.findOne({ email })
            .then(fuser => {
                bcrypt.compare(password, fuser.password)
                    .then(passwordCheck => {
                        if (!passwordCheck) {
                            return res.status(404).send({ "msg": "Wrong credentials" });
                        }

                        if (!fuser.isVerified) {
                            return res.status(404).send({ "msg": "You are not verified" });
                        }


                        // create jwt token
                        const token = jwt.sign({
                            userId: fuser._id,
                            username: fuser.name
                        }, process.env.JWT_SECRET);
                        return res.status(200).send({
                            "msg": "Logged in",
                            username: fuser.name,
                            token
                        });
                    })
                    .catch(error => {
                        return res.status(404).send({ "msg": "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ "msg": "Username not Found" });
            })

    } catch (error) {
        return res.status(500).send({ error });
    }
}
async function logout(req, res) {
    // exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "log out",
    });
}

module.exports = { verifyUser, createPassword, generateOTP, verifyOTP, resetPassword, login, logout }