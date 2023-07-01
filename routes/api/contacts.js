const express = require('express');

const router = express.Router();
const {
  getAll,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require('../../controllers/contacts');

const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', authenticate, getAll);

router.get('/:id', authenticate, isValidId, getById);

router.post('/', authenticate, validateBody(schemas.addSchema), addContact);

router.put(
  '/:id',
  isValidId,
  authenticate,
  validateBody(schemas.addSchema),
  updateContact
);
router.patch(
  '/:id/favorite',
  isValidId,
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

router.delete('/:id', authenticate, isValidId, removeContact);

module.exports = router;
