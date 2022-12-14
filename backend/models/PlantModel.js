const mongoose = require("mongoose")
const Schema = mongoose.Schema 

const plantsSchema = new Schema ({
    commonName: {
        type: String, 
        required: true,
    }, 
    sciName: {
        type: String,
        required: true, 
    },
    imgUrl: {
        type: String,
        required: true,
    },
    _id: {
        type: Number, 
        required: true,
    }
})


module.exports = mongoose.model("Plants", plantsSchema)