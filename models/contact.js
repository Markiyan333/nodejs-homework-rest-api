const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
      match: /^\(\d{3}\) \d{3}-\d{4}$/,
    },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);
const addContactShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.boolean(),
});
const updateFavoriteShema = Joi.object({ favorite: Joi.boolean().required() });
const shemas = { addContactShema, updateFavoriteShema };
const Contact = model("contact", contactSchema);
module.exports = { Contact, shemas };
