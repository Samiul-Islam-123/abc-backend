const express = require('express');
const EventRouter = express.Router();
const eventController = require('../controllers/eventController');

// Event routes
EventRouter.post('/', eventController.CreateEvent);
EventRouter.get('/', eventController.ReadAllEvents);
EventRouter.get('/:id', eventController.ReadEvent);
EventRouter.put('/:id', eventController.UpdateEvent);
EventRouter.delete('/:id', eventController.DeleteEvent);

module.exports = EventRouter;
