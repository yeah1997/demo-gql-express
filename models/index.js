const mongoose = require('mongoose');
const { dbURL } = require('../config/config.default')
mongoose.connect(dbURL);

const db = mongoose.connection;
// connect fail
db.on('error', console.error.bind(console, 'connection error:'));
// connect succeed
db.once('open', function () {
  // we're connected!
  console.log('we are connected!')
});

// Schema
module.exports = {
  User: mongoose.model('User', require('./user')),
  Article: mongoose.model('Article', require('./article'))
}   