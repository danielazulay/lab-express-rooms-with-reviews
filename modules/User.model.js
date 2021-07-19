const mongoose = require('mongoose')

const UserSchema = new mongoose({
    name:{type:String, required:true},
    email:{type:String , unique:true,require:true,trim:true},
    passwordHash:{type:String,required:true}
})

module.exports = mongoose.model("User",UserSchema)