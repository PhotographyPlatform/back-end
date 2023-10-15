"use strict";

module.exports = async (req, res, next) => {
    try {
        console.log(req.image);
        const data = req.data;
        await data.update({ img: req.image });
        next();
    } catch (err) {
        next(err);
    }
};
