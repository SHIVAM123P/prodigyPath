const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models/blog');

// POST request to create a new blog post
async function postBlog(req, res) {
  const { title, content, author, image } = req.body;

  try {
    // create a new blog post using the BlogPost model
    const newPost = new BlogPost({
      title: title,
      content: content,
      author: author,
      image: image
    });

    // save the new post to the database
    const savedPost = await newPost.save();

    // generate a unique URL for the new post
    const postUrl = `http://localhost:5004/posts/${savedPost._id}`;

    // send the URL of the new post back to the client
    res.status(201).send({ url: postUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

  

  async function showblog(req, res) {
    const blogs = await BlogPost.findById(req.params.id);
    res.render('blog', {layout:'_layout', blogs:blogs });
  };

  async function getAllBlogs(req,res){
    try {
      const blogs = await BlogPost.find({});

      res.render('blog', {layout:'_layout.ejs' ,blogs:blogs });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
  async function getBlogById(req, res) {
    try {
      const blog = await BlogPost.findById(req.params.id);
      res.render('singleBlog', { layout: '_layout', blog:blog });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
  


async function getBlogPosts (req, res)  {
  try {
    const blogs = await BlogPost.find({});
    res.render('index', { blogs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
async function getAllBlogPostsPostman (req, res)  {
  try {
    const blogs = await BlogPost.find({});
    res.send( {blogs });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};




// Delete a blog post by its ID
 async function deletePost (req, res) {
    try {
      const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  async function updatePost (req, res) {
    try {
      const blog = await BlogPost.findByIdAndUpdate(
        req.params.id, // ID of the blog post to update
        req.body, // The updated blog post data
        { new: true } // Set this option to true to return the updated document instead of the original document
      );
      res.json(blog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // DELETE all blog posts
 async function deleteAllBlogs (req, res)  {  //just to use during dev phase
    try {
      await BlogPost.deleteMany({});
      res.status(200).json({ message: 'All blog posts deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {postBlog, getBlogPosts, deletePost, updatePost, 
  deleteAllBlogs, showblog,getAllBlogs,getBlogById,
  getAllBlogPostsPostman
};
