// Import required modules and file
require('dotenv').config();
const path = require('path');
const fs = require('fs'); 
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require("mongoose");
const connectDB = require('./config/dbConnection');
const PORT = process.env.PORT;

// Connect to MongoDB Database
connectDB();

// Handle options credentials check for CORS and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware for handling urlencoded data
app.use(express.urlencoded({ extended: false }));

// Middleware for handling json data
app.use(express.json());

// Middleware for handling cookies
app.use(cookieParser());

// Middleware for logging requests
app.use(morgan('dev'));

// Trefle API
const params = {
    origin: 'http://localhost:3000/',
    ip: '127.0.0.1',
    token: 'yiibkfmOBF4rXDUHS87VjTQylY0SNSxw2Noz6VOq_2o'
};
const getToken = async () => {
    const response = await fetch('https://trefle.io/api/auth/claim', {
        method: 'post',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return data;
};

app.get('/trefleAuth', async (req, res) => {
    const authToken = await getToken();
    console.log(authToken);
    res.send(authToken);
});

// Routes
app.use('/auth/register', require('./routes/registerRouter'));
app.use('/auth/login', require('./routes/authRouter'));
app.use('/auth/refresh', require('./routes/refreshRouter'));
app.use('/auth/logout', require('./routes/logoutRouter'));
app.use('/api/plants', require('./routes/plantRouter'));

// Middleware for verifying JWT (All routes after must pass through authentication)
app.use(verifyJWT);

// Routes -- Protected
app.use('/users', require('./routes/api/userRouter'));

// 404 Handler
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '..', 'client', 'public', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not found' });
    } else {
        res.type('txt').send('404 Not found');
    }
});

// Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send({ errMsg: err.message }); // Set error status and return error message to user.
});


// Listen
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});