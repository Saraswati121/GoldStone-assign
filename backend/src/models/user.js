const mongoose = require ("mongoose")

const userSchema = mongoose.Schema({
    id:{type:Number, required:true},
    name:{type:String,required:true},
    email: {type:String, required:true},
    gender: {type:String, required:true},
    status:{ type: String, required: true}
},{
    timestamps:true,
    versionkey:false
})

const uaerModel = mongoose.model('user', userSchema)

module.exports = uaerModel
