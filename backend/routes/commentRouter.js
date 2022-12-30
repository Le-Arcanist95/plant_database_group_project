const express = require("express");
const commentController = require("../controllers/commentController.js");
const commentRouter = express.Router();

commentRouter.route("/")
    // Create comment
    .post(commentController.createComment);

commentRouter.route("/:_id")
    // Get all comments
    .get(commentController.getAllComments)
    // Get comment
    .get(commentController.getComment)
    // Update comment
    .put(commentController.updateComment)
    // Delete comment
    .delete(commentController.deleteComment);

module.exports = commentRouter;