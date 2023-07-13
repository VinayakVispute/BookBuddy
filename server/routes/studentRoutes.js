const express = require("express");

const router = express.Router();

const { signup, login, response } = require("../controllers/studentController");

router.get("/test", response);
router.post("/auth/Register", signup);
router.post("/auth", login);

module.exports = router;
