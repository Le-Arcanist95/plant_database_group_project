const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies; // Get cookies from request
    if (!cookies) return res.status(401).json({ msg: 'No cookies found' }); // No content
    const refreshToken = cookies.jwt; // Get refresh token from cookie

    const foundUser = await User.findOne({ refreshToken }).exec(); // Find user with refresh token
    if (!foundUser) return res.status(403).json({ msg: 'User not found' }); // Forbidden

    // Verify refresh token
    jwt.verify(
        refreshToken, // Token to verify
        process.env.REFRESH_TOKEN_SECRET, // Secret key
        (err, decoded) => {
            if (err || foundUser.username !== user.username) return res.status(403).json({ msg: 'Invalid token' }); // Forbidden
            const roles = Object.values(foundUser.roles); // Get roles from user
            const accessToken = jwt.sign( // Create access token
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            res.json({ roles, accessToken });
        }
    );
};

module.exports = { handleRefreshToken };