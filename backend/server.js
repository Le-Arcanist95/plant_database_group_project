// Import required modules and file
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

const params = {  
    origin: 'http://localhost:3000/',  
    ip: '127.0.0.1',  
    token: 'NPVR8QAoQfkS6ZMQbksVWHktk-nsOvhQ4D0Ifa4_6Ag'
}
const getToken = async () => {  
    const response = await fetch('https://trefle.io/api/auth/claim', {      
        method: 'post',      
        body: JSON.stringify(params),      
        headers: { 'Content-Type': 'application/json' }    
    });  
    const data = await response.json();
    return data;
};

app.get('/auth', async (req, res) => {
    const authToken = await getToken();
    console.log(authToken);
    res.send(authToken);
});


// Middleware for every request
app.use(express.json()); // Used to parse the req.body into json.
app.use(morgan('dev')); // Logs requests to the console


// Database Connection
const uri = "mongodb+srv://Lev_Arcanist:" + encodeURIComponent("p!=Mb6S&B(XBX,b[5S#ea") + "@cluster0.jd6rnhp.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', false);
mongoose.connect(uri, () => console.log("Successfully connected to the database."));

// Request and save data from TrefleAPI


// Routes
app.use('/plants', require('./routes/plantRouter'));

// Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send({errMsg: err.message}); // Set error status and return error message to user.
});


// Port and Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The server is live and listening for requests on port #${port}`);
});