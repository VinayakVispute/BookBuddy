const express = require("express");

const router = express.Router();

const {response,getAllStudents ,getStudent  } = require("../controllers/studentController");

router.get("/test", response);

router.get('/students/:studentId', getStudent);

// Route to get data for all students
router.get('/students', getAllStudents);
module.exports = router;
