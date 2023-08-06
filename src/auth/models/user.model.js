const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userModel = (newSequlize, DataTypes) => newSequlize.define('users', {
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
     token: {
          type: DataTypes.VIRTUAL,
          get() {
               return jwt.sign({ username: this.username, userId: this.id }, process.env.SECRET)
          }
     },
     birthday: {
          type: DataTypes.STRING
     },
     img: {
          type: DataTypes.BLOB('long')
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