const mongoose = require("mongoose")
const Schema = mongoose.Schema 


const plantsSchema = new Schema ({
    comments: {
        type: [CommentModel],
        default: undefined
    },
    liked: Number,
    api_id: {
        type: String, 
        required: true,
    },
    api_slug: {
        type: String,
        required: true, 
    }
})


module.exports = mongoose.model("Plants", plantsSchema)