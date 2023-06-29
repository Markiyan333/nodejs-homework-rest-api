const express = require('express');

const ctrl = require('../../controlers');
const { shemas } = require('../../models/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const router = express.Router();

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getOneContactById);

router.post(
  '/',
  authenticate,
  validateBody(shemas.addContactShema),
  ctrl.addOneContact
);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContact);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(shemas.addContactShema),
  ctrl.updateContact
);
router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(shemas.updateFavoriteShema),
  ctrl.updateFavoriteContact
);

module.exports = router;
