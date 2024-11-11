const mongoose = require('mongoose');

const MarketTrendSchema = new mongoose.Schema({
  priceTrend: [Number],
  averagePrice: { type: Number },
  rentPriceIndex: { type: Number },
  crimeRate: { type: Number }
});

module.exports = mongoose.model('MarketTrend', MarketTrendSchema);
