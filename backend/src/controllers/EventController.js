const Event = require('../models/Event');

module.exports = {
  async index(req, res){
    const events = await Event.findAll();
    return res.json(events);
  },
  async show(req, res){
    const { event_id } = req.params;
    const event = await Event.findByPk(event_id);
    
    if(!event){
      return res.status(400).json({error: 'Event not found'});
    }
    return res.json(event);
  },
  async store(req, res){
    const { name, location, date, time } = req.body;

    const [ event, created] = await Event.findOrCreate({
      where: { 
        date,
        time
      },
      defaults: {
        name,
        location,
      }
    });

    if(created){
      return res.status(200).json(event);
    }

    return res.json(event);
  },
  async update(req, res){
    const { name, location, date, time } = req.body;

    const { event_id } = req.params;
    const existe = await Event.findByPk(event_id);
    
    if(!existe){
      return res.status(400).json({error: 'Event not found'});
    }

    const event = await Event.update({ name, location, date, time }, {
      where: {
        id:event_id
      }
    });

    return res.status(200).json({success: 'Event updated success!'});
  },
  async destroy(req, res){
    const { event_id } = req.params;
    await Event.destroy({
      where: {
        id: event_id
      }
    });
    return res.status(200).json({success: 'Event deleted success!'});
  }
}