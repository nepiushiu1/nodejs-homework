const { Schema, model } = require("mongoose");

const Joi = require("joi");

const contactShema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const newContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required(),
  favorite: Joi.bool(),
});

const contactChangesSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string(),
  phone: Joi.string().pattern(
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
  ),
  favorite: Joi.bool(),
});

const favoriteContact = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactShema);

model.exports = {
  Contact,
  newContactSchema,
  contactChangesSchema,
  favoriteContact,
};
