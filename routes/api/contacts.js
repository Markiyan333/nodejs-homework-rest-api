const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const contactSchema = require('../../schemas/contacts');
const { validateBody } = require('../../middlewares');

const app = express();
app.use(express.json());

router.get('/', ctrl.listContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', validateBody(contactSchema), ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validateBody(contactSchema), ctrl.updateContact);

module.exports = router;
