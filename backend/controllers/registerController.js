const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { username, password } = req.body; // Get username, password, and confirm password from request body
    if (!username || !password) return res.status(400).json({ msg: 'Please enter all fields' }); // Bad request

    const duplicate = await User.findOne({ username: user }).exec(); // Check if user already exists
    if (duplicate) return res.status(409).json({ msg: 'User already exists' }); // Conflict

    // Hash password
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hash = await bcrypt.hash(password, salt); // Hash password

        // Create new user
        const newUser = new User({
            "username": username,
            "roles": { "User": 2000 },
            "password": hash
        });
        
        console.log(newUser);

        res.status(201).json({ 'success': `New user ${username} created.`}); // Created
    } catch (err) {
        res.status(500).json({ error: err.message }); // Internal server error
    };
};

module.exports = { handleRegister };