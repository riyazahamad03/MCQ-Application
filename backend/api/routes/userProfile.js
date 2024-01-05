const express = require("express");
const router = express.Router();

const userProfileController = require("../controllers/userProfile");

router.post("/user", userProfileController.post_user_data);
router.get("/usertest/:userName", userProfileController.get_user_data);

module.exports = router;
