const express = require("express");

const router = express.Router();

const { signup, login} = require('../controllers/authControllers')


router.post("/Register", signup);
router.post("/", login);


module.exports = router;
