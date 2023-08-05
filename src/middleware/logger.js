'use strict';
let count = 0;
const logger = (req, res, next) => {
    count++;
    console.log("-------------------------------------------")
    console.log(`${count}- REQUEST:', ${req.method}, ${req.path}`);
    console.log("-------------------------------------------")
    next();
};

module.exports = logger;