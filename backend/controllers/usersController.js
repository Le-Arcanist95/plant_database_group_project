const User = require('../models/User');

// Get all users
const getAllUsers = async (req, res) => {
    const users = await User.find(); // Find all users
    if (!users) return res.status(404).json({ msg: 'No users found' }); // Not found
    res.json(users); // Return users
};

// Delete user
const deleteUser = async (req, res) => {
    if(!req?.body?._id) return res.status(401).json({ msg: 'User ID required' }); // Unauthorized
    const user = await User.findOne({ _id: req.body._id }).exec(); // Find user
    if (!user) return res.status(404).json({ msg: `User ID ${req.body._id} not found` }); // Not found
    const deletedUser = await User.deleteOne({ _id: req.body.id}); // Delete user
    res.json(deletedUser); // Return deleted user
};
// Get user
const getUser = async (req, res) => {
    if(!req?.params?._id) return res.status(401).json({ msg: 'User ID required' }); // Unauthorized
    const user = await User.findOne({ _id: req.params._id }).exec(); // Find user
    if (!user) return res.status(404).json({ msg: `User ID ${req.params._id} not found` }); // Not found
    res.json(user); // Return user
};

module.exports = { getAllUsers, deleteUser, getUser }; // Export functions