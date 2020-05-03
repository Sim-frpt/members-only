const { check, validationResult } = require('express-validator');
const Message = require('../models/message');

function validateMessageForm() {
  return [
    check('title', "Title must be between 2 and 100 characters")
    .isLength({ min: 2, max: 100 })
    .escape()
    .trim(),
    check('text', "Text must be between 2 and 1000 characters")
    .isLength({ min: 2, max: 1000 })
    .escape()
    .trim(),
  ];
}

module.exports = validateMessageForm;
