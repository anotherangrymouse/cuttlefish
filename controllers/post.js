'use strict';


var PostModel = require('../models/post'),
    auth = require('../lib/auth'),
    Post = require('../lib/article');


module.exports = function (app) {

    var model = new PostModel();


    app.get('/post', function (req, res) {
        
        res.render('post', model);
        
    });

};
