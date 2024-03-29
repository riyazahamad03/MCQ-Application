const express = require("express");
const router = express.Router();

const userController = require("../controllers/mcqUser");

router.post("/signup", userController.user_signup);
router.post("/login", userController.user_login);

module.exports = router;
