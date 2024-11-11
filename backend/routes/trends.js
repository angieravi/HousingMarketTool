const express = require('express');
const router = express.Router();
const MarketTrend = require('../models/MarketTrend');

router.get('/', async (req, res) => {
  try {
    const trends = await MarketTrend.find();
    res.json(trends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const trend = new MarketTrend({
    priceTrend: req.body.priceTrend,
    averagePrice: req.body.averagePrice,
    rentPriceIndex: req.body.rentPriceIndex,
    crimeRate: req.body.crimeRate
  });

  try {
    const newTrend = await trend.save();
    res.status(201).json(newTrend);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
