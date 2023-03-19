const express = require('express');
const router = express.Router();

const controller = require('../controllers/blogsController')


router.post('/postBlogs', controller.postBlog)
router.get('/blog/:id', controller.showblog)
router.get('/getBlogPosts', controller.getBlogPosts);
router.delete('/deleteBlog/:id', controller.deletePost);
router.put('/updateBlog/:id', controller.updatePost);
router.delete('/deleteAllBlogs', controller.deleteAllBlogs);
router.get('/blogs', controller.getAllBlogs);
router.get('/blogs/:id', controller.getBlogById);


//postman
router.get("/getAllBlogPostsPostman", controller.getAllBlogPostsPostman)

module.exports= router;