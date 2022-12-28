const express = require("express");
const Plant = require("../models/Plant.js");
const plantRouter = express.Router();

plantRouter.get("/", (req, res, next) => {
        Plant.find((err, results) => {
            if (err) {
                res.status(400);
                return next(err);
            }
            res.status(200).send(results);
        });
    });

plantRouter.get("/:plantId", (req, res, next) => {
    Plant.find({_id: req.params._id}, (err, plant) => {
        if (err) {
            res.status(400);
            return next(err)
        }
        res.status(200).send(plant)
    })
})
plantRouter.put("/:plantId", (req, res, next) => {
    Plant.findOneAndUpdate(
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

module.exports = plantRouter;