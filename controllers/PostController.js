const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');

// Create a new post
const createPost = async (req, res) => {
    const { content, media, clerkID } = req.body;

    if (!clerkID || !content) {
        return res.json({
            success: false,
            message: "Insufficient data"
        });
    }

    try {
        const user = await UserModel.findOne({ clerkID });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const newPost = new PostModel({
            user: user._id,
            content,
            media
        });

        await newPost.save();

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error :("
        });
    }
};

// Get all posts
const readAllPosts = async (req, res) => {
    try {
        // Fetch all posts, populate the 'user' field with 'username' and 'profilePicture', and sort by 'createdAt' in descending order
        const posts = await PostModel.find()
            .populate('user', 'username profilePicture')
            .sort({ updatedAt: -1 }); // Sort by createdAt in descending order

        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error :("
        });
    }
};

// Get a single post by ID
const readPost = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.json({
            success: false,
            message: "Insufficient data"
        });
    }

    try {
        const post = await PostModel.findById(id).populate('user', 'username profilePicture');
        if (!post) {
            return res.json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error :("
        });
    }
};

// Update a post
const updatePost = async (req, res) => {
    const { id, content, media, clerkID } = req.body;

    if (!id || !clerkID) {
        return res.json({
            success: false,
            message: "Insufficient data"
        });
    }

    try {
        const user = await UserModel.findOne({ clerkID });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const post = await PostModel.findById(id);
        if (!post || post.user.toString() !== user._id.toString()) {
            return res.json({
                success: false,
                message: "Unauthorized action"
            });
        }

        const updatedData = {};
        if (content) updatedData.content = content;
        if (media) updatedData.media = media;
        updatedData.updatedAt = Date.now();

        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true } // To return the updated document
        );

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error :("
        });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    const { id, clerkID } = req.body;

    if (!id || !clerkID) {
        return res.json({
            success: false,
            message: "Insufficient data"
        });
    }

    try {
        const user = await UserModel.findOne({ clerkID });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const post = await PostModel.findById(id);
        if (!post || post.user.toString() !== user._id.toString()) {
            return res.json({
                success: false,
                message: "Unauthorized action"
            });
        }

        await PostModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error :("
        });
    }
};

module.exports = {
    createPost,
    readAllPosts,
    readPost,
    updatePost,
    deletePost
};
