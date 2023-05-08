const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();


const registerMail = (req, res) => {

    const { userEmail, OTP } = req.body;

    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "HALDIA INSTITUTE OF TECHNOLOGY (INFORMATION TECHNOLOGY)",
            link: 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name: "Dear Sir/Madam",
            intro: "We are sending you this one-time-password (OTP) to verify your identity and reset the passward . ",
            table: {
                data: [
                    {
                        otp: `code : <h1>${OTP}<h1>`
                    }
                ]
            },
            outro: ""
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Your Verification Code for Reset Password",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({"msg": error })
    })
}

module.exports = { registerMail }
