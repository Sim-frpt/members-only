const { check, validationResult } = require('express-validator');
const User = require('../models/user');

function validateSignUpForm() {
  return [
    check('firstName', 'First name must be between 2 and 30 characters')
    .isLength({ min: 2, max: 30 })
    .isAlpha().withMessage('First Name must contain only letters')
    .escape()
    .trim(),
    check('lastName', 'Last name must be between 2 and 50 characters')
    .isAlpha().withMessage('First Name must not contain numbers')
    .isLength({ min: 2, max: 50 })
    .escape()
    .trim(),
    check('email', 'Email must be valid')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(async email => {
      if (await isMailAlreadyInUse(email)) {
        return Promise.reject('Email is already registered');
      }
    }),
    check('password', 'Password must be at least 8 characters long')
    .isAlphanumeric().withMessage('Password must contain letters and numbers')
    .isLength({ min: 8 }),
    check('passwordConf')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject('Password confirmation does not match the password field');
      }

      return true;
    })
  ];
}

async function isMailAlreadyInUse(email) {
  const query = User.findOne().byMail(email);

  try {
    const results = await query.exec();
    if (results !== null) {
      return true;
    }

    return false;
  } catch(err) {
    console.error(err);
  }
}

module.exports = validateSignUpForm;
