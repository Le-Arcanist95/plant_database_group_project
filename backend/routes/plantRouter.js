const express = require("express");
const PlantModel = require("../models/PlantModel.js");
const plantRouter = express.Router();


plantRouter.get("/", (req, res, next) => {
        PlantModel.find((err, results) => {
            if (err) {
                res.status(400);
                return next(err);
            }
            res.status(200).send(results);
        });
    });

plantRouter.get("/:plantId", (req, res, next) => {
    PlantModel.find({_id: req.params._id}, (err, plant) => {
        if (err) {
            res.status(400);
            return next(err)
        }
        res.status(200).send(plant)
    })
})
plantRouter.put("/:plantId", (req, res, next) => {
    PlantModel.findOneAndUpdate(
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