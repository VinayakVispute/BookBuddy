const express = require("express");

const router = express.Router();

const { signup, login, logout } = require("../controllers/authControllers");

router.post("/Register", signup);
router.post("/", login);
router.get("/logout", logout);

module.exports = router;
