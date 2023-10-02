"use strict";

const { user } = require("../../models");
module.exports = async (req, res, next) => {
  try {
    const data = req.data;
    const body = req.body;
    console.log(body);
    if (true) {
      if (true) {
        const updateName = await user.findOne({
          where: { username: body.username },
        });
        updateName === null
          ? await data.update({ username: body.username })
          : next("username is already exits");
      }
      await data.update({ firstName: body.firstName });
      await data.update({ lastName: body.lastName });
      await data.update({ password: body.password });
      await data.update({ birthday: body.birthday });
      await data.update({ gender: body.gender });
      await data.update({ address: body.address });
      console.log(req.image);
      await data.update({ img: req.image });
    }
    next();
  } catch (err) {
    next(err);
  }
};
