const mongoose = require('mongoose');

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

function createUser(fName, lName, email, password, status) {
  const user = new User({
    firstName: fName,
    lastName: lName,
    email: email,
    password: password,
    status: status
  });

  return user.save()
    .then(result => {
      console.log('saved user', result);
      users.push(result);
    })
    .catch(err => console.error(err));
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
  return Promise.all([
    createUser(
      'Marie',
      'Courcillon',
      'marie.courcillon@gmail.com',
      'courcillon',
      privileges[0]
    ),
    createUser(
      'Charle',
      "d'Ailly",
      'charles.dailly@hotmail.com',
      'dailly',
      privileges[0]
    ),
    createUser(
      'Catherine',
      'Rohan',
      'catherine.rohanne@gmail.com',
      'rohan',
      privileges[0]
    ),
    createUser(
      'Jeanne',
      'Luyne',
      'jeanne.luyne@gmail.com',
      'luyne',
      privileges[1]
    ),
    createUser(
      'Honoré',
      'Claude',
      'honore.claude@gmail.com',
      'claude',
      privileges[1]
    ),
    createUser(
      'admin',
      'root',
      'admin@root.com',
      'root',
      privileges[2]
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
