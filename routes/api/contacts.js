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

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", users, validation(newContactSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(contactChangesSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteContact),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
