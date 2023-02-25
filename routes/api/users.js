const express = require("express");

const { users, ctrlWrapper, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", users, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  users,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
