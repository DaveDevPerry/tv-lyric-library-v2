const express = require('express');
const router = express.Router();
const User = require('../models/User');
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
// const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

router.get('/', async (req, res) => {
	const user = await User.findById(res.locals.user.id);
	const users = await User.find({});
	try {
		res.render('users/index', {
			user: user,
			users: users,
		});
	} catch (err) {
		console.log(err);
	}
});
// router.get('/', async (req, res) => {
// 	const user = await User.find({});
// 	try {
// 		res.render('users/index', {
// 			user: user,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// 	res.render('users/index');
// });

router.get('/:id', async (req, res) => {
	try {
		// const user = await User.findById(req.params.id);
		// const allChildren = await Person.find({});
		// const people = await Person.find({});

		// console.log('children of', children.children);
		const user = await User.findById(req.params.id)
			.populate([
				{
					path: 'songsCreated',
					model: 'Song',
					select: '_id title',
				},
			])
			.exec();

		res.render('users/show', {
			user: user,
		});
	} catch (err) {
		console.log(err);
	}
});

// edit user
router.get('/:id/edit', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.render('users/edit', {
			user: user,
		});
	} catch (err) {
		console.log(err);
	}
});

// router.put('/:id', async (req, res) => {
// 	try {
// 		const user = await User.findByIdAndUpdate(req.params.id, {
// 			username: req.body.username,
// 		});

// 		console.log('user with username? ', user);
// 		res.redirect(`${user.id}`);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// update user - works but hashes password again
// router.put('/:id', async (req, res) => {
// 	let user;
// 	try {
// 		user = await User.findById(req.params.id);
// 		user.username = req.body.username;
// 		if (req.body.cover != null && req.body.cover !== '') {
// 			saveCover(user, req.body.cover);
// 		}
// 		await user.save();
// 		res.redirect(`/users/${user.id}`);
// 	} catch (err) {
// 		console.log(err);
// 		if (user == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('users/edit', {
// 				user: user,
// 				errorMessage: 'error updating user',
// 			});
// 		}
// 	}
// });

// update user - works
router.put('/:id', async (req, res) => {
	let user;
	try {
		user = await User.findByIdAndUpdate(req.params.id);
		user.username = req.body.username;
		if (req.body.cover != null && req.body.cover !== '') {
			saveCover(user, req.body.cover);
		}
		await user.save();
		res.redirect(`/users/${user.id}`);
	} catch (err) {
		console.log(err);
		if (user == null) {
			res.redirect('/');
		} else {
			res.render('users/edit', {
				user: user,
				errorMessage: 'error updating user',
			});
		}
	}
});

// update user
// router.put('/:id', async (req, res) => {
// 	let user;
// 	try {
// 		user = await User.findById(req.params.id);

// 		user.username = req.body.username;
// 		user.email = req.body.email;
// 		// user.phoneNbr = req.body.phoneNbr;
// 		// user.notifications = req.body.notifications;
// 		// if (req.body.cover != null && req.body.cover !== '') {
// 		// 	saveCover(user, req.body.cover);
// 		// }
// 		await user.save();
// 		res.redirect(`/users/${user.id}`);
// 	} catch (err) {
// 		console.log(err);
// 		if (user == null) {
// 			res.redirect('/songs');
// 		} else {
// 			res.render('users/edit', {
// 				user: user,
// 				errorMessage: 'error updating user',
// 			});
// 		}
// 	}
// });

// function saveCover(user, coverEncoded) {
// 	if (coverEncoded == null) return;
// 	const cover = JSON.parse(coverEncoded);
// 	if (cover != null && imageMimeTypes.includes(cover.type)) {
// 		user.coverImage = new Buffer.from(cover.data, 'base64');
// 		user.coverImageType = cover.type;
// 	}
// }
function saveCover(user, coverEncoded) {
	if (coverEncoded == null) return;
	const cover = JSON.parse(coverEncoded);
	if (cover != null && imageMimeTypes.includes(cover.type)) {
		user.coverImage = new Buffer.from(cover.data, 'base64');
		user.coverImageType = cover.type;
	}
}

module.exports = router;
