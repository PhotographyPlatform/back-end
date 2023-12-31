const express = require("express");
const authRoutes = express.Router();
const login = require("./middleWare/login");
const modules = require("../models");
const sendCode = require("../auth/middleWare/verifyEmail");
const adminAuth = require('./middleWare/validationAdmin');
const isAuth = require('./middleWare/bearer')

// store the obj and the code in queue
let obj = null;
let codeObj = null;

authRoutes.get("/login", async (req, res, next) => {
  try {
    res.status(200).json({
      message: "user login page",
    });
  } catch (err) {
    next(err);
  }
});

authRoutes.post("/login", login, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
});


authRoutes.post("/logout", isAuth, async (req, res) => {
  let token = req.users
  token = null
  console.log(token);
  res.status(200).json('logged out')
})

authRoutes.post("/signup", sendCode, async (req, res, next) => {
  try {
    const codes = req.users;
    codeObj = codes;
    console.log(codes);
    const data = req.body;
    console.log(data);
    // if (data.role === null) res.status(400).json(`Can't signup with admin role, Should have premission before !!!`)
    obj = data;
    res.status(200).json(`code has been send to ${req.body.email}`);
  } catch (err) {
    next(err);
  }
});

authRoutes.post("/signup/confirm", async (req, res, next) => {
  try {
    const code = req.body.codes;
    console.log(code);
    if (parseInt(code) === codeObj) {
      const createUSer = await modules.newUserCOll.create(obj);
      obj = null;
      codeObj = null;
      res.status(200).json(createUSer);
    } else {
      res.status(500).json("wrong codes");
    }
  } catch (err) {
    next(err);
  }
});

authRoutes.post('/admin/signup', adminAuth, async (req, res, next) => {
  try {
    const codes = req.users
    adminCode = codes
    const data = req.body
    obj = data;
    res.status(200).json(`code has been send to ${req.body.email}`);

  } catch (err) {
    next(err);
  }
})
authRoutes.post('/admin/signup/confirm', async (req, res, next) => {
  try {
    const code = req.body.codes
    console.log(adminCode);
    console.log(code);
    if (code === adminCode) {
      const createUSer = await modules.newUserCOll.create(obj)
      obj = null
      adminCode = null
      res.status(200).json({ id: createUSer.id, username: createUSer.username, Email: createUSer.email })
    } else {
      res.status(500).json('wrong codes')
    }
  } catch (err) {
    next(err);
  }
})

module.exports = authRoutes;
