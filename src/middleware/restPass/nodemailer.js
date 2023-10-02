'use strict'

const nodemailer = require('nodemailer');
const { newUserCOll } = require('../../models');
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
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
        const find = await newUserCOll.getEmail(email);
        if (find) {
            req.users = find
            const token = await jwt.sign(find.id, secret)
            const mailOptions = {
                from: user,
                to: email,
                subject: 'Reset Password',
                text: '<p>Here is the link: http://localhost:3000/resetPassword</p>',
                html: `link to reset your password: http://localhost:3000/resetPassword <p> or \n Click <a href="http://localhost:3000/resetPassword/${find.id}">here</a> to access the link.</p>`
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
            res.status(404).send('email not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
};


