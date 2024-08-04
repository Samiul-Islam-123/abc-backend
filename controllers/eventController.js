const EventModel = require('../models/eventModel');

// Create a new event
const CreateEvent = async (req, res) => {
  const { name, description, date, location, organizer, isPublic } = req.body;
  if (name && description && date && location && organizer) {
    try {
      const eventData = new EventModel({
        name: name,
        description: description,
        date: date,
        location: location,
        organizer: organizer,
        isPublic: isPublic || true,
      });

      await eventData.save();

      return res.json({
        success: true,
        message: 'New event created successfully',
      });
    } catch (error) {
      console.error(error);
      return res.json({
        success: false,
        message: 'Server error :(',
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Insufficient data',
    });
  }
};

// Get all events
const ReadAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find();

    return res.json({
      success: true,
      message: 'Events fetched successfully',
      events: events,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: 'Internal server error :(',
    });
  }
};

// Get an event by ID
const ReadEvent = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const event = await EventModel.findById(id);

      if (event) {
        return res.json({
          success: true,
          message: 'Event fetched successfully',
          event: event,
        });
      } else {
        return res.json({
          success: false,
          message: 'Event not found',
        });
      }
    } catch (error) {
      console.error(error);
      return res.json({
        success: false,
        message: 'Server error :(',
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Insufficient data',
    });
  }
};

// Update an event by ID
const UpdateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, date, location, isPublic } = req.body;
  if (id) {
    try {
      const updatedData = {};
      if (name) updatedData.name = name;
      if (description) updatedData.description = description;
      if (date) updatedData.date = date;
      if (location) updatedData.location = location;
      if (isPublic !== undefined) updatedData.isPublic = isPublic;
      updatedData.updatedAt = Date.now();

      const updatedEvent = await EventModel.findByIdAndUpdate(id, updatedData, { new: true });

      if (updatedEvent) {
        return res.json({
          success: true,
          message: 'Event updated successfully',
          event: updatedEvent,
        });
      } else {
        return res.json({
          success: false,
          message: 'Event not found',
        });
      }
    } catch (error) {
      console.error(error);
      return res.json({
        success: false,
        message: 'Server error :(',
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Insufficient data',
    });
  }
};

// Delete an event by ID
const DeleteEvent = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const deletedEvent = await EventModel.findByIdAndDelete(id);

      if (deletedEvent) {
        return res.json({
          success: true,
          message: 'Event deleted successfully',
        });
      } else {
        return res.json({
          success: false,
          message: 'Event not found',
        });
      }
    } catch (error) {
      console.error(error);
      return res.json({
        success: false,
        message: 'Server error :(',
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Insufficient data',
    });
  }
};

module.exports = {
  CreateEvent,
  ReadAllEvents,
  ReadEvent,
  UpdateEvent,
  DeleteEvent,
};
