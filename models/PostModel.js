const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    media: {
        type: String, // URL to the media (image/video)
        required: false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update `updatedAt` before saving
PostSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const PostModel = mongoose.model('posts', PostSchema);

module.exports = PostModel;
