const contacts = require('../models/contacts');
const { httpError, ctrlWrapper } = require('../utils');
const isEmpty = require('lodash.isempty');

// const Joi = require('joi');
// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
  console.log(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw httpError(404, 'Not found');
  }
  res.json(result);
};

const addContact = async (req, res) => {
  // const { error } = contactSchema.validate(req.body);
  // if (error) {
  //   throw httpError(400, error.message);
  // }

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacts.removeContact(contactId);
  if (!data) {
    throw httpError(404, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  // const { error } = contactSchema.validate(req.body);
  if (isEmpty(req.body)) {
    throw httpError(400, 'Missing fields');
  }
  // if (error) {
  //   throw httpError(400, error.message);
  // }

  const data = await contacts.updateContact(contactId, req.body);
  if (!data) {
    throw httpError(404, 'Not found');
  }
  res.json(data);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
