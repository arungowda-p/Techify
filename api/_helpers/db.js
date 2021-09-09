const { connectionString } = require('config.json')
const mongoose = require('mongoose')
const connectionOpt = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(connectionString, connectionOpt);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
}