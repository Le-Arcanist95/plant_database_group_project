const mongoose = require("mongoose");
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment: {type: String, max: 300},
    userName: {type: String, max: 50},
    //this passes a Date object/function?, I am not sure if it will work but it's here as a placeholder.  
    timeStamp: {type: Date}, 
    plantId: {type: String, required:true},
    user: {type: Schema.Types.ObjectId, ref: "User"}
})

module.exports = mongoose.model("Comment", CommentSchema)