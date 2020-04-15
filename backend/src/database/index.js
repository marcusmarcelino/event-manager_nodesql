const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Event = require('../models/Event');

const connection = new Sequelize(dbConfig);

User.init(connection);
Event.init(connection);

module.exports = connection;