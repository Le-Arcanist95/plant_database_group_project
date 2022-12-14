const express = require("express");
const Model = require("backend\models\PlantModel.js");
const plantRouter = express.Router();

plantRouter.route("/")
    .get((req, res, next) => {
        Model.get(req.body, (err, results) => {
            if (err) {
                res.status(400);
                return next(err);
            }
            res.status(200).send(results);
        });
    });

module.exports = plantRouter;