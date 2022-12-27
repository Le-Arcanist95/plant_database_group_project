const allowedOrigins = require('./allowedOrigins');

// Options for CORS
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin || origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(new Error(`${origin} is not allowed by CORS`));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
};

module.exports = corsOptions;