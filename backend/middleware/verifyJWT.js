const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; // Get authorization header
    if (!authHeader?.startsWith('Bearer ')) return res.status(401); // Unauthorized
    const token = authHeader.split(' ')[1]; // Get token from header
    jwt.verify( // Verify token
        token, // Token to verify
        process.env.ACCESS_TOKEN_SECRET, // Secret key
        (err, decoded) => { // Callback
            if (err) return res.status(403).json({ msg: 'Invalid token' }); // Forbidden
            req.user = decoded.UserInfo.username; // Set username
            req.roles = decoded.UserInfo.roles; // Set roles
            next(); // Continue
        }
    );
}

module.exports = verifyJWT;