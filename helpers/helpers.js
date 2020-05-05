const Privilege = require('../models/privilege');
const User = require('../models/user');

exports.updatePrivilege = (userId, level) => {

  const getPrivilege = Privilege.findOne({ name: level });

  return getPrivilege
    .then(status => {
      return User.findByIdAndUpdate( userId, { status: status }, { new: true });
    })
    .then((user) => Promise.resolve(user))
    .catch(err => Promise.reject(err));
}

exports.getRichErrorObj = (req, errors) => {
    // Create an object that will contain each field of the form, with value
    // and error message
    const data = {};

    for (let property in req.body) {
      data[property] = {
        value: req.body[property]
      };
    };

    // pass the error message to the data object. errors.array() is from express-validator
    errors.array().forEach(error => {
      data[error.param].errorMsg = error.msg;
    });

  return data;
};
