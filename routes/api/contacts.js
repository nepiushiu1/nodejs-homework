const express = require("express");
const {
  getAll,
  getById,
  add,
  updateById,
  removeById,
  updateFavorite,
} = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const {
  newContactSchema,
  contactChangesSchema,
  favoriteContact,
} = require("../../models");

const router = express.Router();

router.get("/", ctrlWrapper(getAll));

router.get("/:id", ctrlWrapper(getById));

router.post("/", validation(newContactSchema), ctrlWrapper(add));

router.delete("/:id", ctrlWrapper(removeById));

router.put("/:id", validation(contactChangesSchema), ctrlWrapper(updateById));

router.patch(
  "/:id/favorite",
  validation(favoriteContact),
  ctrlWrapper(updateFavorite)
);

module.exports = router;
