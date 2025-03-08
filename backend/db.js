const mongoose = require('mongoose')

const MONGOURI = 'mongodb://localhost:27017/mern3'

mongoose.connect(MONGOURI)
const db = mongoose.connection

db.on('connected',()=>console.log("Connected to MongoDB")
)
module.exports = db