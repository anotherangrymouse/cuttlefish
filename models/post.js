'use strict';

var mongoose = require('mongoose');

var postModel = function () {

      var postSchema = mongoose.Schema({
  
          created_at: {
                       type: Date,
                       default: Date.now
                       },
  
               title: {
                      type: String,
                      required: true
                      },
  
               body: {
                      type: String,
                      required: true
                      },
  
               slug: {
                      type: String,
                      unique: true,
                      required: true
                      }
            });

    return mongoose.model('Post', postSchema);
    };

module.exports = new postModel();