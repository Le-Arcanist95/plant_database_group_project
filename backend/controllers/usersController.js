const User = require('../models/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(404).json({ msg: 'No users found' });
    res.json(users);
};

const deleteUser = async (req, res) => {
    if(!req?.body?._id) return res.status(401).json({ msg: 'User ID required' });
    const user = await User.findOne({ _id: req.body._id }).exec();
    if (!user) return res.status(404).json({ msg: `User ID ${req.body._id} not found` });
    const deletedUser = await User.deleteOne({ _id: req.body.id});
    res.json(deletedUser);
};

const getUser = async (req, res) => {
    if(!req?.params?._id) return res.status(401).json({ msg: 'User ID required' });
    const user = await User.findOne({ _id: req.params._id }).exec();
    if (!user) return res.status(404).json({ msg: `User ID ${req.params._id} not found` });
    res.json(user);
};

module.exports = { getAllUsers, deleteUser, getUser };