const express = require('express');
const router = express.Router();
const Song = require('../models/song');

// all songs route
router.get('/', async (req, res) => {
	try {
		const songs = await Song.find({});
		res.render('songs/index', {
			songs: songs,
		});
	} catch {
		res.redirect('/');
	}

	// console.log('songs route')
});

// new song route
router.get('/new', (req, res) => {
	res.render('songs/new', { song: new Song() });
});

// create song - POST route
router.post('/', async (req, res) => {
	const song = new Song({
		title: req.body.title,
		songLyrics: req.body.songLyrics,
	});
	try {
		const newSong = await song.save();
		res.redirect(`songs/${newSong.id}`);
		console.log(newSong);
	} catch (error) {
		res.render('songs/new', {
			song: song,
			error: 'error creating song',
		});
	}
});

router.get('/:id', async (req, res) => {
	try {
		const song = await Song.findById(req.params.id);
		res.render('songs/show', {
			song: song,
		});
	} catch (error) {
		console.log(error);
		res.redirect('/');
	}
});

router.get('/:id/edit', async (req, res) => {
	try {
		const song = await Song.findById(req.params.id);
		res.render('songs/edit', { song: song });
	} catch {
		res.redirect('/songs');
	}
});

router.put('/:id', async (req, res) => {
	let song;
	try {
		song = await Song.findById(req.params.id);
		song.title = req.body.title;
		(song.songLyrics = req.body.songLyrics), await song.save();
		res.redirect(`/songs/${song.id}`);
	} catch {
		if (song == null) {
			res.redirect('/');
		} else {
			res.render('songs/edit', {
				song: song,
				errorMessage: 'Error updating song',
			});
		}
	}
});
router.delete('/:id', async (req, res) => {
	let song;
	try {
		song = await Song.findById(req.params.id);
		await song.remove();
		res.redirect(`/songs`);
	} catch {
		if (song == null) {
			res.redirect('/');
		} else {
			res.redirect(`/songs/${song.id}`);
		}
	}
});

module.exports = router;
