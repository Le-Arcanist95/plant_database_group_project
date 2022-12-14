const express = require("express");
const CommentModel = require("../models/CommentModel.js");
const commentRouter = express.Router();


commentRouter.get("/", (req, res, next) => {
    CommentModel.find((err, results) => {
            if (err) {
                res.status(400);
                return next(err);
            }
            res.status(200).send(results);
        });
    });

commentRouter.get("/:commentId", (req, res, next) => {
    CommentModel.find({_id: req.params._id}, (err, comment) => {
        if (err) {
            res.status(400);
            return next(err)
        }
        res.status(200).send(comment)
    })
})
commentRouter.put("/:commentId", (req, res, next) => {
    CommentModel.findOneAndUpdate(
        {_id: req.params._id},
        req.body, 
        {new:true},
        (err, updated) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updated)
        })
})

module.exports = commentRouter;