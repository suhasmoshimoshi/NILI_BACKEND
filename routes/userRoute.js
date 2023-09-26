const express = require("express");
const router = express.Router();
const studentController = require("../controllers/userController");



router.post("/signup", studentController.signupUser);
router.post("/login", studentController.loginUser);


module.exports = router;