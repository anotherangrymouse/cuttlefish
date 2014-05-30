'use strict';


var PostModel = require('../models/post'),
  auth = require('../lib/auth'),
  Post = require('./../models/post');


module.exports = function (app) {

  var model = new PostModel();


  app.get("/post", function (req, res) {
    Post.find({}, function (err, docs) {
      res.render('post', {
        posts: docs
      });
    });
  });

  //new
  app.get("/post/new", function (req, res) {
    res.render('posts/new', {
      title: "New Post"
    });
  });


  //create
  app.post('/post', function (req, res) {
    var b = req.body;
    new Post({
      title: b.title,
      body: b.body
    }).save(function (err) {
      if (err)
        console.log(err);
      res.redirect('/post');
    });
  });

  //show-params -- find out what post is selected
  app.param('title', function (req, res, next, title) {
    Post.find({
      title: title
    }, function (err, docs) {
      req.post = docs[0];
      next();
    });
  });

  //show
  app.get('/post/:title', function (req, res) {
    res.render("posts/show", {
      posts: req.post
    });
  });

  //edit
  app.get('/post/:title/edit', function (req, res) {
    res.render("posts/edit", {
      posts: req.post
    });
  });

  //update
  app.put('/post/:title', function (req, res) {
    var b = req.body;
    Post.update({
        title: req.params.title
      }, {
        title: b.title,
        body: b.body
      },
      function (err) {
        res.redirect("/post" + b.title);
      });
  });

  //delete
  app.delete("/post/:title", function (req, res) {
    Post.remove({
      title: req.params.title
    }, function (err) {
      res.redirect('/post');
    });
  });

};