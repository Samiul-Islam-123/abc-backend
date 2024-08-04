const express = require('express');
const AnnouncementRouter = express.Router();
const announcementController = require('../controllers/announcementController');

// Announcement routes
AnnouncementRouter.post('/', announcementController.CreateAnnouncement);
AnnouncementRouter.get('/', announcementController.ReadAllAnnouncements);
AnnouncementRouter.get('/:id', announcementController.ReadAnnouncement);
AnnouncementRouter.put('/:id', announcementController.UpdateAnnouncement);
AnnouncementRouter.delete('/:id', announcementController.DeleteAnnouncement);

module.exports = AnnouncementRouter;
