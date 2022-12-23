const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    // Get username and password from request body
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).json({ msg: 'Please enter all fields' });

    // Check if user exists
    const foundUser = await User.findOne({ username: user });
    if (!foundUser) return res.status(400).json({ msg: 'User does not exist' });

    // Check if password is correct
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // Returns an array of roles that are true
        const roles = Object.values(foundUser.roles).filter(Boolean);
        
        // Create access token
        const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles 
                    }
                }, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '15m' }
        );
        // Create refresh token
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Save refresh token to database
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        // Send refresh token as cookie
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 86400000 });
        
        // Send access token and roles
        res.json({ roles, accessToken });
    
    } else if (!match) return res.status(401).json({ msg: 'Invalid credentials' });
}

module.exports = { handleLogin };