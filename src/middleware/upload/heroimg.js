"use strict";

module.exports = async (req, res, next) => {
    try {
        console.log(req.image);
        const data = req.data;
        await data.update({ heroImg: req.image });
        next();
    } catch (err) {
        next(err);
    }
};
