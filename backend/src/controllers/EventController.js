const Event = require('../models/Event');

module.exports = {
  async index(req, res) {
    const events = await Event.findAll();
    return res.json(events);
  },
  async store(req, res) {
    const { name, location, date, time } = req.body;
    const event = await Event.create({ name, location, date, time });
    return res.json(event);
  },
  async show(req, res) {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    return res.json(event);
  }
};