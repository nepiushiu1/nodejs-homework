const express = require("express");
// _______________
const router = express.Router();

const contactsOperations = require("../../models/contacts");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = contactsOperations;

const Joi = require("joi");

const newContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required(),
});

const contactChangesSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string(),
  phone: Joi.string().pattern(
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
  ),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({
      status: "success",
      code: 200,
      result: {
        data: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await getContactById(id);

    if (!contactById) {
      res
        .status(404)
        .json({ status: "error", code: 404, massage: "Not found" });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      result: {
        data: contactById,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = newContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    }
    const result = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      result: {
        data: result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactChangesSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }
    const { id } = req.params;
    const result = await updateContact(id, req.body);

    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      result: {
        data: result,
      },
    });
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await removeContact(id);

    if (!contactById) {
      res
        .status(404)
        .json({ status: "error", code: 404, massage: "Not found" });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact deleted",
      result: {
        data: contactById,
      },
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
