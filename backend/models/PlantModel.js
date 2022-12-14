const mongoose = require("mongoose")
const Schema = mongoose.Schema 
const CommentModel = require("./CommentModel")

const plantsSchema = new Schema ({
    comments: {
        type: [CommentModel], 
        default: undefined,
    },
    liked: Number,
    api_slug: {
        type: String,
        required: true,
    },
    api_id: {
        type: Number, 
        required: true,
    }
})


module.exports = mongoose.model("Plants", plantsSchema)