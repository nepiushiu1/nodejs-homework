const express = require("express");

const { users, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", users, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
