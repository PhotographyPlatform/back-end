'use strict'

const nodemailer = require('nodemailer');
const { newUserCOll } = require('../../models');
require('dotenv').config()

const user = process.env.EMAIL
console.log(user);
const pass = process.env.PASS
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
        if (!validEmail) {
            // generate 4 random numbers function            
            function randomCodes() {
                return Math.floor(1000 + Math.random() * 9000);
            }
            const randomNumbers = randomCodes()
            req.users = randomNumbers
            const mailOptions = {
                from: user,
                to: email,
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
            res.status(500).send('email is already exits');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
};


