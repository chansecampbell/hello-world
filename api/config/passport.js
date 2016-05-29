var LocalStrategy = require("passport-local").Strategy;
var User          = require("../models/user");

module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, function(req, email, password, done) {

    // Find a user with this email
    User.findOne({ 'email' : email }, function(err, user) {
      // Error found
      if (err) return done(err, false, { message: "Something went wrong." });

      // No error but already an user registered
      if (user) return done(null, false, { message: "Please choose another email." });

      var newUser            = new User();
      newUser.email    = req.body.email;
      newUser.username = req.body.username;
      newUser.fullname = req.body.fullname;
      newUser.image    = req.body.image;
      newUser.password = req.body.password;
      newUser.passwordConfirmation = req.body.passwordConfirmation;

      newUser.save(function(err, user) {
        // Error found
        console.log(err);
        if (err) return done(err, false, { message: "Something went wrong." });

        // New user created
        return done(null, user);
      });
    });
  }));

};
