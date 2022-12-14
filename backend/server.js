// Import required modules and file
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

// Middleware for every request
app.use(express.json()); // Used to parse the req.body into json.
app.use(morgan('dev')); // Logs requests to the console

// Database Connection
const uri = "mongodb+srv://<username>:" + encodeURIComponent("p!=Mb6S&B(XBX,b[5S#ea") + "@cluster0.jd6rnhp.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', false);
mongoose.connect(uri, () => console.log("Successfully connected to the database."));

// Routes
app.use('plants', require('./routes/plantRouter'));

// Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send({errMsg: err.message}); // Set error status and return error message to user.
});

console.log("I exist for no reason.")

// Port and Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The server is live and listening for requests on port #${port}`);
});