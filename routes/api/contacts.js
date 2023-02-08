const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const {
  users,
  validation,
  ctrlWrapper,
  isValidId,
} = require("../../middlewares");
const {
  newContactSchema,
  contactChangesSchema,
  favoriteContact,
} = require("../../schemas");

const router = express.Router();

router.get("/", users, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", users, ctrlWrapper(ctrl.getById));

router.post("/", users, validation(newContactSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", users, isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  users,
  isValidId,
  validation(contactChangesSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  users,
  isValidId,
  validation(favoriteContact),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
