const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) return res.status(400).json({ msg: 'Please enter all fields' });
    if (password !== confirmPassword) return res.status(400).json({ msg: 'Passwords do not match' });

    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.status(409).json({ msg: 'User already exists' });

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            "username": username,
            "roles": { "User": 2000 },
            "password": hash
        });
        
        console.log(newUser);

        res.status(201).json({ 'success': `New user ${username} created.`});
    } catch (err) {
        res.status(500).json({ error: err.message });
    };
};

module.exports = { handleRegister };