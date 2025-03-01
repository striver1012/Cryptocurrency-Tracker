const mongoose = require('mongoose');

// Schema for storing cryptocurrency data
const cryptocurrencySchema = new mongoose.Schema({
  coin: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CryptoData', cryptocurrencySchema);
