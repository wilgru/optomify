const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/optomifydb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//TGQBCvnqfXMWTPCa

module.exports = mongoose.connection;
