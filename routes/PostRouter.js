const {
    createPost,
    readPost,
    readAllPosts,
    updatePost,
    deletePost
} = require('../controllers/PostController');

const PostRouter = require('express').Router();

PostRouter.post("/create-post", createPost);
PostRouter.get("/read-post/:id", readPost);
PostRouter.get("/read-posts-all", readAllPosts);
PostRouter.put("/update-post", updatePost);
PostRouter.delete("/delete-post", deletePost);

module.exports = PostRouter;
