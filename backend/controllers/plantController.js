const Plant = require('../models/Plant.js');

// Get all plants
const getAllPlants = async (req, res) => {
    const plants = await Plant.find(); // Find all plants
    if (!plants) return res.status(404).json({ msg: 'No plants found' }); // Not found
    res.json(plants); // Return plants
}

// Get plant
const getPlant = async (req, res) => {
    if(!req?.params?._id) return res.status(401).json({ msg: 'Plant ID required' }); // Unauthorized
    const plant = await Plant.findOne({ _id: req.params._id }).exec(); // Find plant
    if (!plant) return res.status(404).json({ msg: `Plant ID ${req.params._id} not found` }); // Not found
    res.json(plant); // Return plant
}

// Create plant
const createPlant = async (req, res) => {
    if(!req?.body?.name) return res.status(401).json({ msg: 'Plant name required' }); // Unauthorized
    if(!req?.body?.scientificName) return res.status(401).json({ msg: 'Scientific name required' }); // Unauthorized
    if(!req?.body?.description) return res.status(401).json({ msg: 'Description required' }); // Unauthorized
    if(!req?.body?.image) return res.status(401).json({ msg: 'Image required' }); // Unauthorized
    const plant = await Plant.create(req.body); // Create plant
    res.json(plant); // Return plant
};

// Update plant
const updatePlant = async (req, res) => {
    if(!req?.params?._id) return res.status(401).json({ msg: 'Plant ID required' }); // Unauthorized
    const plant = await
    Plant.findOne({ _id: req.params._id }).exec(); // Find plant
    if (!plant) return res.status(404).json({ msg: `Plant ID ${req.params._id} not found` }); // Not found
    const updatedPlant = await Plant.findOneAndUpdate({ _id: req.params._id}, req.body).exec(); // Update plant
    res.json(updatedPlant); // Return updated plant
};

// Delete plant
const deletePlant = async (req, res) => {
    if(!req?.params?._id) return res.status(401).json({ msg: 'Plant ID required' }); // Unauthorized
    const plant = await Plant.findOne({ _id: req.params._id }).exec(); // Find plant
    if (!plant) return res.status(404).json({ msg: `Plant ID ${req.params._id} not found` }); // Not found
    const deletedPlant = await Plant.findOneAndDelete({ _id: req.params._id }).exec(); // Delete plant
    res.json(deletedPlant); // Return deleted plant
};

module.exports = { getAllPlants, getPlant, createPlant, updatePlant, deletePlant };