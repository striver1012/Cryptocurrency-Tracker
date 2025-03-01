
const CryptoData = require("../models/cryptoData");

// Function to get the stats of a cryptocurrency
const stats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) return res.status(400).send({ error: "Coin is required." });

  const latestData = await CryptoData.findOne({ coin }).sort({ fetchedAt: -1 });
  if (!latestData)
    return res
      .status(404)
      .send({ error: "Data not found for the specified coin." });

  res.send({
    price: latestData.price,
    marketCap: latestData.marketCap,
    "24hChange": latestData.change24h,
  });
};

// Function to get the deviation of a cryptocurrency
const deviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) return res.status(400).send({ error: "Coin is required." });

  const records = await CryptoData.find({ coin })
    .sort({ fetchedAt: -1 })
    .limit(100);

  if (records.length < 2)
    return res
      .status(400)
      .send({ error: "Not enough data to calculate deviation." });

  // Calculate the deviation
  const prices = records.map((record) => record.price);
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const variance =
    prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
    prices.length;

  res.send({ deviation: Math.sqrt(variance).toFixed(2) });
};


module.exports = { stats, deviation };