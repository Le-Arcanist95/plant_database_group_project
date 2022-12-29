const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies; // Get cookies from request
    if (!cookies?.jwt) return res.status(401).json({ msg: 'No cookies found' }); // No content
    const refreshToken = cookies.jwt; // Get refresh token from cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // Clear cookie

    const foundUser = await User.findOne({ refreshToken }).exec(); // Find user with refresh token
    
    // Detected refresh token reuse
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden
                const compromisedUser = await User.findOne({ username: decoded.username }).exec(); // Find user with refresh token
                compromisedUser.refreshToken = []; // Clear refresh token
                const result = await compromisedUser.save(); // Save changes
                console.log(result);
            }
        );
        return res.sendStatus(403); //Forbidden
    };

    const newRefreshTokenArray = foundUser.refreshToken.filter(rToken => rToken !== refreshToken); // Remove refresh token from array

    // Verify refresh token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            // Refresh token was expired
            if (err) {
                foundUser.refreshToken = [...newRefreshTokenArray]; // Remove refresh token from array
                const result = await foundUser.save(); // Save changes
                console.log(result);
            }
            // Refresh token was tampered
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // Forbidden

            // Refresh token was still valid
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            // Create new refresh token
            const newRefreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();
            console.log(result);

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 86400000 });
            
            // Send access token
            res.json({ accessToken })
        }
    );
};

module.exports = { handleRefreshToken };