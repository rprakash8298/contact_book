const Contact = require('../MODELS/contact')
const mongoose = require('mongoose')

exports.ADD_CONTACT = async (req, res) => {
    const post = req.body
    try {
        const contact = await Contact.create({ ...post,owner:req.userId, createdAt: new Date().toISOString()})
        await contact.save()

        res.status(201).json(contact)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Something Went wrong"})
    }
}

exports.UPDATE_CONTACT = async (req, res) => {
    const { id } = req.params
    // console.log(id)
    const { image, fullname, number, email, alt_number, address } = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(400).json({ msg: "No Post found" }) }
        const post = { image, fullname, number, email, alt_number, address,_id: id }
        const contact = await Contact.findByIdAndUpdate(id, post, { new: true })
        res.status(201).json(contact)
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"})
    }
}
exports.READ_CONTACT = async (req, res) => {
    try {
        const contact = await Contact.find({ owner: req.userId })

        res.status(200).json(contact)
    } catch (error) {
        res.status(404).json({msg:'Something went wrong'})
    }
}

exports.SEARCH_CONTACT = async (req, res) => {
    const { searchQuery } = req.query
    console.log(searchQuery)
    try {
        const fullname = new RegExp(searchQuery, 'i')
        const contact = await Contact.find({ $or: [{ fullname }] })

        res.status(200).json({data:contact})
    } catch (error) {
        res.status(404).json(error.message)
    }
}

exports.DELETE_CONTACT = async (req, res) => {
    const { id } = req.params
    try {
         if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(400).json({ msg: "No Post found" }) }
        await Contact.findByIdAndRemove(id)
        res.status(200).json({msg:"Deleted Successfully"})
    } catch (error) {
         res.status(404).json({msg:'Something went wrong'})
    }
}