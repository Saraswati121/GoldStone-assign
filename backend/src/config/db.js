const mongoose = require('mongoose')
const connection = mongoose.connect("mongodb://localhost:27017/goldstone")
module.exports= connection

// mongodb+srv://goldstone:goldstone@cluster0.1puv2po.mongodb.net/?retryWrites=true&w=majority