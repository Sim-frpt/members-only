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
