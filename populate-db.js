const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Get models
const User = require('./models/user');
const Privilege = require('./models/privilege');
const Message = require('./models/message');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.error('ERROR: You need to specify a valid mongodb URL as the first argument');

    return;
}

mongoose.connect(userArgs[0], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', console.log.bind(console, 'connected to DB'));


const privileges = [];
const users = [];
const messages = [];

function createPrivilege(name) {
  const privilege = new Privilege({ name });

  return privilege.save()
    .then(result => {
      privileges.push(result);
      console.log( 'saved privilege:', result);
    })
    .catch(err => console.error(err));
}

async function createUser(fName, lName, email, password, status) {

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
    firstName: fName,
    lastName: lName,
    email: email,
    password: hashedPassword,
    status: status
    });

    return user.save()
      .then(result => {
        console.log('saved user', result);
        users.push(result);
      })
  } catch (err) {
    console.error(err);
  }


};

function createMessage(title, text, author) {
  const message = new Message({
    title,
    text,
    author
  });

  return message.save()
    .then(result => {
      console.log('saved message', result);
      messages.push(result);
    })
    .catch(err => console.error(err));
}

function createAllPrivileges() {
    return Promise.all([
      createPrivilege('basic'),
      createPrivilege('member'),
      createPrivilege('admin'),
    ]);
}

function createAllUsers() {
  const basicPrivilege = privileges.find( privilege => privilege.name === 'basic');
  const memberPrivilege = privileges.find( privilege => privilege.name === 'member');
  const adminPrivilege = privileges.find( privilege => privilege.name === 'admin');

  return Promise.all([
    createUser(
      'Marie',
      'Courcillon',
      'marie.courcillon@gmail.com',
      'password',
      basicPrivilege
    ),
    createUser(
      'Charle',
      "d'Ailly",
      'charles.dailly@hotmail.com',
      'password',
      basicPrivilege
    ),
    createUser(
      'Catherine',
      'Rohan',
      'catherine.rohanne@gmail.com',
      'password',
      basicPrivilege
    ),
    createUser(
      'Jeanne',
      'Luyne',
      'jeanne.luyne@gmail.com',
      'password',
      memberPrivilege
    ),
    createUser(
      'Honoré',
      'Claude',
      'honore.claude@gmail.com',
      'password',
      memberPrivilege
    ),
    createUser(
      'admin',
      'password',
      'admin@root.com',
      'password',
      adminPrivilege
    )
  ]);
}

function createAllMessages() {
  return Promise.all([
    createMessage(
      'Crazy night',
      'Such a fun time last night! I really had a blast, thank you all for coming',
      users[1]
    ),
    createMessage(
      'This club is insane',
      'I can\'t stress enough how being part of this ELITE club has made my life a fairy tale.\n Such insane parties that all those poor non-members would like to attend hahaha.',
      users[0]
    ),
    createMessage(
      'I lost my underwear',
      'As stated in the title, I lost my undies during our last "reunion".\n Hope someone will send them back to me. Hit me up I Need them!',
      users[4]
    )
  ]);
}

async function populateDB() {
  try {
    await createAllPrivileges();
    await createAllUsers();
    await createAllMessages();
  } catch(err) {
    console.error(err);
  }

  db.close();
}

populateDB();
