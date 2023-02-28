const { teacher, user } = require('../Model/model')
const { conn } = require('../db')
const mongoose = require("mongoose");
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');





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
    const { code } = req.method == "GET" ? req.query : req.body;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!' })
    }
    return res.status(400).send({ error: "Invalid OTP" });
}

async function createPassword(req, res) {
    try {

        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });

        const { email, password } = req.body;
        if (password.length < 8) {
            return res.status(404).send({ msg: "password must be of atleast 8 characters" });
        }
        try {

            user.findOne({ email })
                .then(user => {
                    if (user.password != "") {
                        req.app.locals.resetSession = false;
                        return res.status(404).send({ msg: "You already hava a password!" });
                    }
                    
                })
                .catch(error => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            const newUser = new user({
                                email: email,
                                password: hashedPassword
                            });
                            newUser.save()
                                .then(() => {
                                    req.app.locals.resetSession = false; // reset session
                                    return res.status(201).send({ msg: "your password created... !"+newUser })
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

    } catch (error) {
        return res.status(401).send({ error })
    }
}

async function resetPassword(req, res) {
    try {

        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });

        const { email, password } = req.body;

        try {

            user.findOne({ email })
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            user.updateOne({ email },
                                { password: hashedPassword }, function (err, data) {
                                    if (err) throw err;
                                    req.app.locals.resetSession = false; // reset session
                                    return res.status(201).send({ msg: "Record Updated...!" })
                                });
                        })
                        .catch(e => {
                            return res.status(500).send({
                                error: "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error: "Username not Found" });
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}

async function login(req, res) {

    const { email, password } = req.body;

    try {

        user.findOne({ email })
            .then(fuser => {
                bcrypt.compare(password, fuser.password)
                    .then(passwordCheck => {

                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" });

                        // create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, process.env.JWT_SECRET);
                        res.cookie("jwttoken", token, {
                            expires: new Date(Date.now() + 12000000),
                            httpOnly: true
                        });
                        return res.status(200).send({
                            msg: "Login Successful...!",
                            email: fuser.email,
                            token
                        });
                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" });
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