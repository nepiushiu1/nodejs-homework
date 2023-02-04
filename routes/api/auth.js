const express = require("express");

const { users, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { userSchema, userLoginSchema } = require("../../schemas");

const router = express.Router();

router.post("/register", validation(userSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(userLoginSchema), ctrlWrapper(ctrl.login));

router.get("logout", users, ctrlWrapper(ctrl.logout));

module.exports = router;
