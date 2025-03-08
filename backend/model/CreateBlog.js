const mongoose = require('mongoose')
const CreateSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    summary:{
        type:String,
        required:true,

    },
    blogger:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,

    },
})

const Userblog= mongoose.model('Userblog',CreateSchema)
module.exports = Userblog