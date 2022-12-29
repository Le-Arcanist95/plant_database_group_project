const Comment = require('../models/Comment.js');

// Get all comments
const getAllComments = async (req, res) => {
    const comments = await Comment.find(); // Find all comments
    if (!comments) return res.status(404).json({ msg: 'No comments found' }); // Not found
    res.json(comments); // Return comments
}

// Get comment
const getComment = async (req, res) => {
    if(!req?.params?._id) return res.status(401).json({ msg: 'Comment ID required' }); // Unauthorized
    const comment = await Comment.findOne({ _id: req.params._id }).exec(); // Find comment
    if (!comment) return res.status(404).json({ msg: `Comment ID ${req.params._id} not found` }); // Not found
    res.json(comment); // Return comment
}

// Create comment
const createComment = async (req, res) => {
    // Check if comment, user name, time stamp, and plant ID are provided, otherwise return 401 -- Unauthorized
    if(!req?.body?.comment) 
        return res.status(401).json({ 
            msg: 'Comment required' 
        });
    if(!req?.body?.userName)
        return res.status(401).json({ 
            msg: 'User name required' 
        }); 
    if(!req?.body?.timeStamp) 
        return res.status(401).json({  
            msg: 'Time stamp required' 
        }); 
    if(!req?.body?.plantId) 
        return res.status(401).json({
            msg: 'Plant ID required' 
        }); 
    req.body.user = req.user._id; // Add user ID to request body    
    const comment = await Comment.create(req.body); // Create comment
    res.json(comment); // Return comment
}

// Update comment
const updateComment = async (req, res) => {
    if(!req?.params?._id) return res.status(401).json({ msg: 'Comment ID required' }); // Unauthorized
    const comment = await Comment.findOne({ _id: req.params._id }).exec(); // Find comment
    if (!comment) return res.status(404).json({ msg: `Comment ID ${req.params._id} not found` }); // Not found
    const updatedComment = await Comment.findOneAndUpdate({ _id: req.params._id}, req.body).exec(); // Update comment
    res.json(updatedComment); // Return updated comment
}

// Delete comment
const deleteComment = async (req, res) => {
    if(!req?.params?._id) return res.status(401).json({ msg: 'Comment ID required' }); // Unauthorized
    const comment = await Comment.findOne({ _id: req.params._id }).exec(); // Find comment
    if (!comment) return res.status(404).json({ msg: `Comment ID ${req.params._id} not found` }); // Not found
    const deletedComment = await Comment.findOneAndDelete({ _id: req.params._id }).exec(); // Delete comment
    res.json(deletedComment); // Return deleted comment
}

module.exports = { getAllComments, getComment, createComment, updateComment, deleteComment };