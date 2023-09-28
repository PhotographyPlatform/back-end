const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Followers}  = require('../../models/index')
require('dotenv').config();

const userModel = (newSequlize, DataTypes) => {
     const User = newSequlize.define('users', {
          username: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
          },
          password: {
               type: DataTypes.STRING,
               allowNull: false,
               set(password) {
                    const hashPass = bcrypt.hashSync(password, 5);
                    this.setDataValue('password', hashPass);
               },
          },
          role: {
               type: DataTypes.ENUM('admin', 'user'),
               required: true,
               defaultValue: 'user',
          },
          capabilities: {
               type: DataTypes.VIRTUAL,
               get() {
                    const acl = {
                         user: ['user'],
                         admin: ['admin'],
                    };
                    return acl[this.role];
               },
          },
          token: {
               type: DataTypes.VIRTUAL,
               get() {
                    return jwt.sign({ userId: this.id, role: this.role }, process.env.SECRET);
               },
          },
          birthday: {
               type: DataTypes.STRING,
          },
          img: {
               type: DataTypes.BLOB('long'),
          },
          gender: {
               type: DataTypes.ENUM('male', 'female'),
          },
          email: {
               type: DataTypes.STRING,
               validate: { isEmail: true },
               allowNull: false,
          },
     });

     // User.prototype.getFollowers = async function () {
     //      try {
     //           const followers = await this.getFollowers({
     //                through: {
     //                     model: Followers,
     //                     as: 'Followers',
     //                },
     //                attributes: ['id', 'username', 'email'], 
     //           });

     //           return followers;
     //      } catch (error) {
     //           throw new Error(error);
     //      }
     // };

     // User.prototype.getFollowing = async function () {
     //      try {
     //           const following = await this.getFollowing({
     //                through: {
     //                     model: Followers,
     //                     as: 'Following',
     //                },
     //                attributes: ['id', 'username', 'email'], 
     //           });

     //           return following;
     //      } catch (error) {
     //           throw new Error(error);
     //      }
     // };

     return User;
};

module.exports = userModel;