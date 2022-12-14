const express = require("express");
const Model = require("../models/PlantModel.js");
const plantRouter = express.Router();

plantRouter.get("/", (req, res, next) => {
        Model.find((err, results) => {
            if (err) {
                res.status(400);
                return next(err);
            }
            res.status(200).send(results);
        });
    });

plantRouter.get("/:plantId", (req, res, next) => {
    Model.find({_id: req.params._id}, (err, plant) => {
        if (err) {
            res.status(400);
            return next(err)
        }
        res.status(200).send(plant)
    })
})

module.exports = plantRouter;