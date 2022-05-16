const express = require('express');
const router = express.Router();
const Song = require('../models/officialSong');
// const Song = require('../models/song');
const User = require('../models/User');
// const ALine = require('../models/aLine');

// All songs route
router.get('/', async (req, res) => {
	// const songs = await Song.find({});
	// const users = await User.find({});
	let query = Song.find();
	if (req.query.title != null && req.query.title != '') {
		query = query.regex('title', new RegExp(req.query.title, 'i'));
	}

	try {
		const songs = await query.exec();
		res.render('officialSongs/index', {
			// song: song,
			searchOptions: req.query,
			songs: songs,
			// songs: songs.sort(function (a, b) {
			// 	let aTitle = a.title.toUppercase();
			// 	let bTitle = b.title.toUppercase();
			// 	return aTitle < bTitle ? -1 : aTitle > bTitle ? 1 : 0;
			// }),
			// users: users,
			songs: songs.sort(function (a, b) {
				let nameA = a.title.toUpperCase();
				let nameB = b.title.toUpperCase();
				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
			}),
		});
	} catch (err) {
		console.log(err);
		res.redirect('/');
	}
});

// new song route
router.get('/new', (req, res) => {
	// console.log('current user? ', res.locals.user.id);
	res.render('officialSongs/new', { song: new Song() });
});

// create song - POST route
router.post('/', async (req, res) => {
	let song;
	// console.log('current user? ', res.locals.user.id);
	const user = await User.findById(req.body.userID);

	try {
		song = await new Song({});
		song.title = req.body.title;
		song.fromReleaseTitle = req.body.fromReleaseTitle;
		song.createdBy = req.body.userID;
		song.lyrics = req.body.lyrics;
		song.source = req.body.source;

		// user.songsCreated.push(await song.id);

		// await user.save();
		await song.save();
		res.redirect('officialSongs');
	} catch (err) {
		res.send('oh');
		console.log(err);
	}
});

router.get('/:id', async (req, res) => {
	// console.log(req.params.id, 'song id');
	const song = await Song.findById(req.params.id);
	try {
		// const song = await Song.findById(req.params.id);
		// console.log(song, 'song');

		res.render('officialSongs/show', {
			song: song,
		});
	} catch (error) {
		console.log(error);
		res.redirect('/');
	}
});

module.exports = router;
