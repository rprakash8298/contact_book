const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema =new mongoose.Schema({
    name: String,
    email: String,
    password:String
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    return userObj
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

module.exports = mongoose.model("User", userSchema)