const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userModel = (newSequlize, DataTypes) => newSequlize.define('users', {
     firstName: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     lastName: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     address: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
     },
     password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(password) {
               const hashPass = bcrypt.hashSync(password, 5);
               this.setDataValue('password', hashPass)
          }

     },
     role: {
          type: DataTypes.ENUM("admin", "user"),
          required: true,
          defaultValue: 'user'

     },
     capabilities: {
          type: DataTypes.VIRTUAL,
          get() {
               const acl = {
                    user: ['user'],
                    admin: ['admin']
               };
               return acl[this.role];
          }
     },
     token: {
          type: DataTypes.VIRTUAL,
          get() {
               return jwt.sign({ userId: this.id, role: this.role }, process.env.SECRET)
          }
     },
     birthday: {
          type: DataTypes.STRING
     },
     img: {
          type: DataTypes.STRING
     },
     heroImg: {
          type: DataTypes.STRING
     },
     gender: {
          type: DataTypes.ENUM('male', 'female')
     },
     email: {
          type: DataTypes.STRING,
          validate: { isEmail: true },
          allowNull: false
     }
})


module.exports = userModel