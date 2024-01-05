const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const mcqController = require("../controllers/mcq");
router.get("/", mcqController.get_all_creators);
router.post("/create", checkAuth, mcqController.create_mcq);
router.get("/:creatorId", mcqController.get_creator);
router.get("/:creatorId/:testId", checkAuth ,mcqController.get_test);
module.exports = router;
