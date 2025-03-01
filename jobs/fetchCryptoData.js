const axios = require('axios');
const CryptoData = require('../models/cryptoData');

// Function to fetch cryptocurrency data from the CoinGecko API
const fetchCryptocurrencyData = async () => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    for (const coin of coins) {
      const entry = new CryptoData({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });
      await entry.save();
    }
    console.log('Data fetched and stored successfully!');
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};

module.exports = fetchCryptocurrencyData;
