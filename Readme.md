# Cryptocurrency Tracking - Bitcoin, ethereum and matic-network

## Overview

The **Cryptocurrency Tracking** is a backend application built with Node.js and MongoDB that monitors the performance of cryptocurrencies, including Bitcoin, Ethereum, and Matic. The system retrieves up-to-date data such as price, market capitalization, and 24-hour percentage changes by integrating with the [CoinGecko API](https://www.coingecko.com/en/api/documentation) every two hours. It offers the following endpoints:
- `/api/stats`: Retrieves the most recent details for a specified cryptocurrency (Bitcoin, Ethereum, or Matic).
- `/api/deviation`: Computes the standard deviation of the latest 100 recorded prices for a given cryptocurrency.

---

## Features

1. MongoDB database for persistent data storage.
2. RESTful APIs for fetching and analyzing cryptocurrency data.
3. Scheduled background jobs to fetch data every 2 hours.

---

## Prerequisites
- Node.js 
- MongoDB Compass 
- npm package manager

## Installation

1. Clone the repository
```bash
git clone https://github.com/luxprajapati/Cryptocurrency.git
cd .\Cryptocurrency\
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```
PORT=4000
MONGO_URI=your_mongodb_uri
```

4. Start the server
```bash
# Development mode
node index.js
```

## API Endpoints

### Get Latest Cryptocurrency Stats
```
GET /api/stats?coin=coinName
```
- `coinName`: bitcoin, ethereum, or matic-network
- Returns: Current price, market cap, and 24h change

### Get Price Standard Deviation
```
GET /api/deviation?coin=coinName
```
- `coinName`: bitcoin, ethereum, or matic-network
- This will return standard deviation calculated from the last 100 price points