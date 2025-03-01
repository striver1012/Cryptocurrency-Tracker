if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cron = require('node-cron');
const cors = require('cors');
const expressError = require('./utils/ExpressError');
const cryptoStatsRouter = require('./routers/cryptoStatsDeviation');
const fetchCryptocurrencyData = require('./jobs/fetchCryptoData');
cron.schedule('0 */2 * * *', fetchCryptocurrencyData);


const DB_URL = process.env.MONGO_URI;

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"))
db.once("open", () => {
    console.log("Database connected Successfully");
});



app.use(express.json());
app.use(cors({origin: '*'}));

app.use('/api', cryptoStatsRouter);


app.all("*", (req, res, next) => {
    next(new expressError('Page not found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if(!err.message) err.message = "Something went wrong"
    console.log(err);
    res.status(statusCode).json(err.message);
})


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
