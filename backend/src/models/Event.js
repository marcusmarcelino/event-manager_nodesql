const { Model, DataTypes } = require('sequelize');

class Event extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      date: DataTypes.DATE,
      time: DataTypes.TIME,
    }, {
      sequelize
    });
  }
}

module.exports = Event;