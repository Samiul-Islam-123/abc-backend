const AnnouncementModel = require('../models/AnnouncementModel');

// Create a new announcement
const CreateAnnouncement = async (req, res) => {
  const { title, content, author, isPublished } = req.body;
  if (title && content && author) {
    try {
      const announcementData = new AnnouncementModel({
        title: title,
        content: content,
        author: author,
        isPublished: isPublished || false,
      });

      await announcementData.save();

      return res.json({
        success: true,
        message: 'New announcement created successfully',
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

// Get all announcements
const ReadAllAnnouncements = async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find();

    return res.json({
      success: true,
      message: 'Announcements fetched successfully',
      announcements: announcements,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: 'Internal server error :(',
    });
  }
};

// Get an announcement by ID
const ReadAnnouncement = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const announcement = await AnnouncementModel.findById(id);

      if (announcement) {
        return res.json({
          success: true,
          message: 'Announcement fetched successfully',
          announcement: announcement,
        });
      } else {
        return res.json({
          success: false,
          message: 'Announcement not found',
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

// Update an announcement by ID
const UpdateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, content, isPublished } = req.body;
  if (id) {
    try {
      const updatedData = {};
      if (title) updatedData.title = title;
      if (content) updatedData.content = content;
      if (isPublished !== undefined) updatedData.isPublished = isPublished;
      updatedData.updatedAt = Date.now();

      const updatedAnnouncement = await AnnouncementModel.findByIdAndUpdate(id, updatedData, { new: true });

      if (updatedAnnouncement) {
        return res.json({
          success: true,
          message: 'Announcement updated successfully',
          announcement: updatedAnnouncement,
        });
      } else {
        return res.json({
          success: false,
          message: 'Announcement not found',
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

// Delete an announcement by ID
const DeleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const deletedAnnouncement = await AnnouncementModel.findByIdAndDelete(id);

      if (deletedAnnouncement) {
        return res.json({
          success: true,
          message: 'Announcement deleted successfully',
        });
      } else {
        return res.json({
          success: false,
          message: 'Announcement not found',
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
  CreateAnnouncement,
  ReadAllAnnouncements,
  ReadAnnouncement,
  UpdateAnnouncement,
  DeleteAnnouncement,
};
