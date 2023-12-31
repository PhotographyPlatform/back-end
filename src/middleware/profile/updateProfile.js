"use strict";

const { user } = require("../../models");
module.exports = async (req, res, next) => {
  try {
    const data = req.data;
    const body = req.body;
    if (body) {
      if (body.username) {
        const updateName = await user.findOne({
          where: { username: body.username },
        });
        updateName === null
          ? await data.update({ username: body.username })
          : next("username is already exits");
      }
      console.log(body.firstName);
      await data.update({ firstName: body.firstName });
      await data.update({ lastName: body.lastName });
      await data.update({ password: body.password });
      await data.update({ birthday: body.birthday });
      await data.update({ address: body.address });
    }
    next();
  } catch (err) {
    next(err);
  }
};
