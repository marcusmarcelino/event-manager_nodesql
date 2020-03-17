const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController')
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');
const ReportController = require('./controllers/ReportController');
const EventController = require('./controllers/EventController');

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', AddressController.store);

routes.get('/users/:user_id/techs', TechController.index);
routes.post('/users/:user_id/techs', TechController.store);
routes.delete('/users/:user_id/techs', TechController.destroy);

routes.get('/report', ReportController.show);

routes.get('/events', EventController.index);
routes.get('/events/:event_id', EventController.show);
routes.post('/events', EventController.store);
routes.put('/events/:event_id', EventController.update);
routes.delete('/events/:event_id', EventController.destroy);

module.exports = routes;