const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const property = new Property({
    title: req.body.title,
    type: req.body.type,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    price: req.body.price,
    description: req.body.description
  });

  try {
    const newProperty = await property.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
