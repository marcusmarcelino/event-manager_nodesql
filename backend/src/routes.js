const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const EventController = require ('./controllers/EventController');

routes.post('/users', UserController.store);
routes.post('/events', EventController.store);

routes.get('/users', UserController.index);
routes.get('/events', EventController.index);

routes.get('/users/:event_id', UserController.show);
routes.get('/events/:event_id', EventController.show);

module.exports = routes;