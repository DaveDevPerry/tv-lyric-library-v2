const express = require('express');
const router = express.Router();
const Song = require('../models/song');
const Lyric = require('../models/lyric');
const Line = require('../models/line');
const line = require('../models/line');

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
});

// new song route
router.get('/new', (req, res) => {
	res.render('songs/new', { song: new Song() });
});

// create song - POST route
router.post('/', async (req, res) => {
	const song = new Song({
		title: req.body.title,
		initialLyrics: req.body.initialLyrics,
	});
	// split initialLyrics string
	const splitLyrics = await song.initialLyrics.split(',');
	console.log('slit lyrics', splitLyrics);
	// create a lyric for each str
	splitLyrics.forEach(async (individualLyric) => {
		// let saveLyric;
		// let saveLine;
		const newLyric = await new Lyric({
			lyric: individualLyric,
			likeCount: 0,
		});

		console.log('new lyric', newLyric);

		try {
			const saveLyric = await newLyric.save();
			console.log('lyric saved', saveLyric);
			// push saveLyric to song.lyrics
			// song.lyrics = saveLyric;
			song.lyrics.push(saveLyric);
			// create a line for each lyric

			await song.save();
		} catch {
			res.send('error one');
		}
		// // push saveLyric to song.lyrics
		// song.lyrics.push(saveLyric);
		console.log('song.lyrics', song.lyrics);
		// const line = await new Line();

		// try {
		// 	line.line.push(saveLyric);
		// 	saveLine = await line.save();
		// 	song.lines.push(saveLine);
		// 	await song.save();
		// } catch {
		// 	res.send('error 2');
		// }
	});

	try {
		const newSong = await song.save();
		res.redirect('songs');
		// res.redirect(`songs/${newSong.id}`);
		console.log('new song', newSong);
	} catch (err) {
		res.send(err);
	}
});

// router.get('/:id', async (req, res) => {
// 	try {
// 		const song = await Song.findById(req.params.id);
// 		const allLyrics = await song.allLyrics;
// 		let str = await allLyrics[0];
// 		const lyrics = await str.split(',');

// 		// const lyrics = await song.allLyrics.split(',');
// 		res.render('songs/show', {
// 			song: song,
// 			lyrics: lyrics,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.redirect('/');
// 	}
// });

// router.get('/:id/edit', async (req, res) => {
// 	try {
// 		const song = await Song.findById(req.params.id);
// 		res.render('songs/edit', { song: song });
// 	} catch {
// 		res.redirect('/songs');
// 	}
// });

// router.put('/:id', async (req, res) => {
// 	let song;
// 	try {
// 		song = await Song.findById(req.params.id);
// 		song.title = req.body.title;
// 		song.allLyrics = req.body.allLyrics;
// 		await song.save();
// 		res.redirect(`/songs/${song.id}`);
// 	} catch {
// 		if (song == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('songs/edit', {
// 				song: song,
// 				errorMessage: 'Error updating song',
// 			});
// 		}
// 	}
// });
// router.delete('/:id', async (req, res) => {
// 	let song;
// 	try {
// 		song = await Song.findById(req.params.id);
// 		await song.remove();
// 		res.redirect(`/songs`);
// 	} catch {
// 		if (song == null) {
// 			res.redirect('/');
// 		} else {
// 			res.redirect(`/songs/${song.id}`);
// 		}
// 	}
// });

// router.get('/', async (req, res) => {
// 	try {
// 		const songs = await Song.find({});
// 		res.render('songs/index', {
// 			songs: songs,
// 		});
// 	} catch {
// 		res.redirect('/');
// 	}

// 	// console.log('songs route')
// });

// // new song route
// router.get('/new', (req, res) => {
// 	res.render('songs/new', { song: new Song() });
// });

// // create song - POST route
// router.post('/', async (req, res) => {
// 	const song = await new Song({
// 		title: req.body.title,
// 		allLyrics: req.body.allLyrics,
// 	});
// 	const songLyrics = await song.allLyrics.split(',');
// 	songLyrics.forEach(async (line) => {
// 		let newLyric = await new Lyric({
// 			lyric: line,
// 			likeCount: 0,
// 		});
// 		await newLyric.save();
// 		console.log('new lyric', newLyric);
// 		let newLine = await new Line({ lyricsInLine: newLyric });
// 		await newLine.save();
// 		song.songLines.push(newLine);
// 	});
// 	await song.save();
// 	try {
// 		console.log('new song', song);
// 		const newSong = await song.save();
// 		// res.redirect(`songs/${newSong.id}`);
// 		console.log(newSong);
// 	} catch (err) {
// 		res.send(err);
// 	}
// });

// router.get('/:id', async (req, res) => {
// 	try {
// 		const song = await Song.findById(req.params.id);
// 		const allLyrics = await song.allLyrics;
// 		let str = await allLyrics[0];
// 		const lyrics = await str.split(',');

// 		// const lyrics = await song.allLyrics.split(',');
// 		res.render('songs/show', {
// 			song: song,
// 			lyrics: lyrics,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.redirect('/');
// 	}
// });

// router.get('/:id/edit', async (req, res) => {
// 	try {
// 		const song = await Song.findById(req.params.id);
// 		res.render('songs/edit', { song: song });
// 	} catch {
// 		res.redirect('/songs');
// 	}
// });

// router.put('/:id', async (req, res) => {
// 	let song;
// 	try {
// 		song = await Song.findById(req.params.id);
// 		song.title = req.body.title;
// 		song.allLyrics = req.body.allLyrics;
// 		await song.save();
// 		res.redirect(`/songs/${song.id}`);
// 	} catch {
// 		if (song == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('songs/edit', {
// 				song: song,
// 				errorMessage: 'Error updating song',
// 			});
// 		}
// 	}
// });
// router.delete('/:id', async (req, res) => {
// 	let song;
// 	try {
// 		song = await Song.findById(req.params.id);
// 		await song.remove();
// 		res.redirect(`/songs`);
// 	} catch {
// 		if (song == null) {
// 			res.redirect('/');
// 		} else {
// 			res.redirect(`/songs/${song.id}`);
// 		}
// 	}
// });

module.exports = router;
