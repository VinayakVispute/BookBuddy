const express = require("express");

const router = express.Router();

const { signup, login, response,getAllStudents ,getStudent  } = require("../controllers/studentController");

router.get("/test", response);
router.post("/auth/Register", signup);
router.post("/auth", login);
router.get('/students/:studentId', getStudent);

// Route to get data for all students
router.get('/students', getAllStudents);
module.exports = router;
