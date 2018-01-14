
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User            = require('../app/models/user');
var configAuth = require('./auth');

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});


	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL,
	    passReqToCallback: true,
			profileFields: ['email']
	  },
	  function(req, accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		//user is not logged in yet
	    		if(!req.user){
					User.findOne({'auth.id': profile.id}, function(err, user){
		    			if(err)
		    				return done(err);
		    			if(user)
		    				return done(null, user);
		    			else {
		    				var newUser = new User();
		    				newUser.auth.id = profile.id;
		    				newUser.auth.token = accessToken;
		    				newUser.auth.name = profile.name.givenName;
		    				newUser.auth.email = profile.emails[0].value;



		    				newUser.save(function(err){
		    					if(err)
		    						throw err;
		    					return done(null, newUser);
		    				})
					//			console.log(profile);
		    			}
		    		});
	    		}

	    		//user is logged in already, and needs to be merged
	    		else {
	    			var user = req.user;
	    			user.auth.id = profile.id;
	    			user.auth.token = accessToken;
	    			user.auth.name = profile.name.givenName + ' ' + profile.name.familyName;
	    			user.auth.email = profile.emails[0].value;

	    			user.save(function(err){
	    				if(err)
	    					throw err
	    				return done(null, user);
	    			})
				//console.log(profile);
				}

	    	});
	    }

	));

	passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL,
	    passReqToCallback: true
	  },
	  function(req, accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){

	    		if(!req.user){
	    			User.findOne({'auth.id': profile.id}, function(err, user){
		    			if(err)
		    				return done(err);
		    			if(user)
		    				return done(null, user);
		    			else {
		    				var newUser = new User();
		    				newUser.auth.id = profile.id;
		    				newUser.auth.token = accessToken;
		    				newUser.auth.name = profile.displayName;
		    				newUser.auth.email = profile.emails[0].value;

		    				newUser.save(function(err){
		    					if(err)
		    						throw err;
		    					return done(null, newUser);
		    				})
		    			}
		    		});
	    		} else {
	    			var user = req.user;
	    			user.auth.id = profile.id;
					user.auth.token = accessToken;
					user.auth.name = profile.displayName;
					user.auth.email = profile.emails[0].value;

					user.save(function(err){
						if(err)
							throw err;
						return done(null, user);
					});
	    		}

	    	});
	    }

	));





};
