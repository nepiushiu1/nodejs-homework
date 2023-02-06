const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { users, validation, ctrlWrapper } = require("../../middlewares");
const {
  newContactSchema,
  contactChangesSchema,
  favoriteContact,
} = require("../../schemas");

const router = express.Router();

router.get("/", users, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", users, ctrlWrapper(ctrl.getById));

router.post("/", users, validation(newContactSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", users, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  users,
  validation(contactChangesSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  users,
  validation(favoriteContact),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
