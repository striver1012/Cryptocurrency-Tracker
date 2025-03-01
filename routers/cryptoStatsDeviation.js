const express = require("express");
const router = express.Router();
const CryptoData = require("../models/cryptoData");
const cryptoDataController = require("../controllers/cryptoData");

// Route to get the stats of a cryptocurrency
router.route("/stats")
    .get(cryptoDataController.stats);

// Route to get the deviation of a cryptocurrency
router.route("/deviation")
    .get(cryptoDataController.deviation);

module.exports = router;
// Uppate
