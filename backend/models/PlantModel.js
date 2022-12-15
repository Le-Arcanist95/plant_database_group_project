const mongoose = require("mongoose")
const Schema = mongoose.Schema 
const { CommentSchema } = require("./CommentModel")

const plantSchema = new Schema ({
    comments: {
            type: Schema.Types.ObjectId,
            ref: "CommentModel"
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


module.exports = mongoose.model("Plant", plantSchema)