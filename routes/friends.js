const express = require('express');
const User = require('../models/user');
const config = require('../config/database');

const router = express.Router();

router.post('/add', (req, res, next) => {
	let username = req.body.to.username;
	let userToAdd = req.body.addme;

	User.findOne({username: username}, (err, user) => {
		if (err) {
			res.json({success: false, msg: 'Something went wrong, Server side'});
			return;
		}
		if (!user) {
			res.json({success: false, msg: "User doesn't exist."});
			return;
		}


		if (user.friends.includes(userToAdd.id)) {
			res.json({success: false, msg: "You're already friends with this user."})
			return;
		}
		if (user.pending.includes(userToAdd.id)) {
			res.json({success: false, msg: "You already sent a request to this user."});
			return;
		}

		user.pending.push(userToAdd.id);
		user.save();
		res.json({success: true, msg: "Friend request sent successfully."});
	});
});


// <>
module.exports = router;