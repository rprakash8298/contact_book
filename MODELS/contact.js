const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    image: String,
    fullname: String,
    number: String,
    email: String,
    alt_number: String,
    address: String,
    owner: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model("Contact", contactSchema)