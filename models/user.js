const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	friends:  {
		type: Array
	},
	pending: {
		type: Array
	}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
	user = {username: username};
	User.findOne(user, callback);
}

module.exports.addUser = function(newUser, callback) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			console.log('new user registered');
			newUser.save(callback);
		});
	});
}

module.exports.comparePassword = function(guess, hash, callback) {
 bcrypt.compare(guess, hash, (err, isMatch) => {
 	if (err) throw err;
 	callback(null, isMatch);
 })
}