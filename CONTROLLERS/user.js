const User = require('../MODELS/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


exports.signup = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) { return res.json({ msg: "User Alreday Exist" }) }
        if(password !== confirmpassword){return res.json({msg:"password doesn't match"})}
        
        const result = await User.create(req.body)
        const token = jwt.sign({ email: result.email, id: result._id }, `${process.env.JWT_SECRET}`, { expiresIn: "1h" })
        res.status(200).json({result,token})
        
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong" })
        console.log(error.message)
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.findOne({ email })
        console.log(user)
        if (!user) { return res.status(404).json({ msg: "User Not registered" }) }
        
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) { return res.status(400).json({ msg: "Invalid credentials" }) }
        const token = jwt.sign({ email: user.email, id: user._id }, `${process.env.JWT_SECRET}`, { expiresIn: "1h" })
        res.status(200).json({user,token})
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error.message)
    }
}
