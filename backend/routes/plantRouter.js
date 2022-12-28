const express = require("express");
const plantController = require("../controllers/plantController.js");
const plantRouter = express.Router();

plantRouter.route("/")
    // Get all plants
    .get(plantController.getAllPlants)
    // Create plant
    .post(plantController.createPlant);

plantRouter.route("/:_id")
    // Get plant
    .get(plantController.getPlant)
    // Update plant
    .put(plantController.updatePlant)
    // Delete plant
    .delete(plantController.deletePlant);

module.exports = plantRouter;