const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controlers/auth');

const route = express.Router();

route.get('/current', authenticate, ctrl.getCurrent);
route.post('/register', validateBody(schemas.registerSchema), ctrl.register);
route.post('/login', validateBody(schemas.loginSchema), ctrl.login);
route.post('/logout', authenticate, ctrl.logout);

route.post('/register');
route.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

module.exports = route;
