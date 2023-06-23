const { Contact } = require("../models/contact");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const data = await Contact.find();
  res.json(data);
};

const getOneContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findById(contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

const addOneContact = async (req, res, next) => {
  const data = await Contact.create(req.body);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(data);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndDelete(contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }

  res.json(data);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

const updateFavoriteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContactById: ctrlWrapper(getOneContactById),
  addOneContact: ctrlWrapper(addOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavoriteContact: ctrlWrapper(updateFavoriteContact),
};
