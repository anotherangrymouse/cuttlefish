'use strict';


var kraken = require('kraken-js'),
    db = require('./lib/database'),
    passport = require('passport'),
    auth = require('./lib/auth'),
    flash = require('connect-flash'),
    User = require('./models/user'),
    app = {};


app.configure = function configure(nconf, next) {
    
    db.config(nconf.get('databaseConfig'));
  
    //Add two users to the system.
    
  /*
    var u1 = new User({
         name: 'Andrew Duckworth',
         login: 'andrewd',
         password: '#09afad',
         role: 'admin'
     });
 
     var u2 = new User({
         name: 'Support Staff',
         login: 'support',
         password: 'iknowyoucandoit',
         role: 'user'
     });
  
     u1.save();
     u2.save();
  
  */


  
    passport.use(auth.localStrategy());
  
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
  
    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}, function (err, user) {
          done(null, user);
        });
    });
  
    next(null);
};


app.requestStart = function requestStart(server) {
    // Run before most express middleware has been registered.
    

};


app.requestBeforeRoute = function requestBeforeRoute(server) {
    // Run before any routes have been added.
    
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(flash());
    server.use(auth.injectUser);
  
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Run after all routes have been added.
};


if (require.main === module) {
    kraken.create(app).listen(function (err, server) {
        if (err) {
            console.error(err.stack);
        }
    });
}


module.exports = app;