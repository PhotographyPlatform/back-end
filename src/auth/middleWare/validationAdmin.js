'use strict'

const nodemailer = require('nodemailer');
const { newUserCOll } = require('../../models');
const data = require('../../models/')
require('dotenv').config()

const user = process.env.COMPANY_EMAIL
console.log(user);
const pass = process.env.COMPANY_PASS
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: user,
        pass: pass
    }
});

module.exports = async (req, res, next) => {
    try {
        const email = req.body.email;
        const validEmail = await newUserCOll.getEmail(email)
        const validUser = await data.user.findOne({ where: { username: req.body.username } })
        //!validUser
        if (true) {
            //!validEmail
            if (true) {
                // generate 4 random numbers function
                function randomCodes() {
                    return Math.floor(1000 + Math.random() * 90000);
                }
                const randomNumbers = randomCodes()
                console.log(randomNumbers)
                req.users = randomNumbers
                const mailOptions = {
                    from: email,
                    to: user,
                    subject: 'verify Email',
                    html: `<h2> to verify your email use these codes and don't share them with anyone</h2>' \n \n \n <h1>${randomNumbers}</h1>`,
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        res.status(500).send('Error sending email');
                    } else {
                        next()
                    }
                });
            } else {
                res.status(500).send('email is already exits ');
            }
        } else next('username is already exists')
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
};