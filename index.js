"use strict";
require("dotenv").config();

const PORT = process.env.PORT || 3005
const { newSequlize } = require('./src/models/')
const { start, app } = require('./src/server')

//{ force: true }

newSequlize.sync().then(() => {
  start(PORT)
})
  .catch((e) => {
    console.log('error massage:', e.message);
  })


