const mongoose = require('mongoose')
const connection = mongoose.connect("mongodb+srv://goldstone:goldstone@cluster0.1puv2po.mongodb.net/?retryWrites=true&w=majority")
module.exports= connection