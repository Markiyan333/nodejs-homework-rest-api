const { httpError } = require('../utils');
const isEmpty = require('lodash.isempty');

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (isEmpty(req.body)) {
      throw httpError(400, 'Missing fields');
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(httpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
