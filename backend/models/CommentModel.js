const mongoose = require("mongoose");
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment: {type: String, max: 300},
    userName: {type: String, max: 50},
    timeStamp: {type: Date}, 
    plantId: {type: String, required:true}
})

module.exports = mongoose.model("Comment", CommentSchema)