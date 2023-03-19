const app = require("express")
const enrolledLanguages = [ 'go'];
const {BlogPost} = require('../models/blog')
async function getIndex(req, res)  {
  const blogs = await BlogPost.find({});

    res.render('index',{layout:'_layout.ejs', enrolledLanguages:enrolledLanguages, blogs:blogs});
  };
  


module.exports={getIndex}