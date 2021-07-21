const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    comment:{type:String, maxlength:200},
    roomId:{type:mongoose.Schema.Types.ObjectId, ref:"room"}
})

module.exports = mongoose.model("review",reviewSchema )