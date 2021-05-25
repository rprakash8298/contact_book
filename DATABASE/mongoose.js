const mongoose = require('mongoose')

mongoose.connect(`${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
    console.log('DATABASE CONNECTED')
}).catch((e) => {
    console.log(e.message)
})

// mongodb://127.0.0.1:27017/contact_book