const mongoose = require('mongoose');

// Connect to MongoDB Database
const connectDB = async () => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectDB;