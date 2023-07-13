const express = require("express");

const router = express.Router();

const { getData, getAllData } = require("../controllers/task");

router.route("/vans").get(getAllData);
router.route("/vans/:id").get(getData);

module.exports = router;
