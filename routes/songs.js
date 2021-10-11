const express = require('express');
const router = express.Router();
const Song = require('../models/song');
const Lyric = require('../models/lyric');
const ALine = require('../models/aLine');

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
	let song;

	const createLyric = async (lyric, index) => {
		console.log('lyric', lyric);
		const newLyric = await new ALine({
			lyric: lyric,
			likeCount: 1,
			songId: await song.id,
			lyricRef: 'line' + ((await index) + 1),
			lineNumber: (await index) + 1,
		});
		newLyric.createLine(newLyric);
		// create song.lyricsLine Object
		// const newInitialLine = await {
		// 	// user: req.body.user,
		// 	createdAt: Date.now,
		// 	lineNumber: newLyric.lyricRef,
		// 	hello: 'hello',
		// 	lyricsInLine: [],
		// };
		// await newInitialLine.lyricsInLine.push(await newLyric);

		// song.lyricLines.push(await newInitialLine);
		song.lyricLines.push(await newLyric);
	};

	try {
		song = await new Song({});
		song.title = req.body.title;
		song.initialLyrics = req.body.initialLyrics;
		// splits initial lyrics string into each lyric line string
		const lyricsToSplit = await song.initialLyrics.split(',');
		song.lineCount = await lyricsToSplit.length;
		console.log('lyrics to split', lyricsToSplit);
		lyricsToSplit.forEach(async (lyric, index) => {
			console.log('index', await index);
			song.splitLyrics.push(await lyric);
			// creates a new Aline schema for each individual line
			createLyric(lyric, index);
		});

		await song.save();
		res.redirect('songs');
	} catch (err) {
		res.send('oh');
		console.log(err);
	}
});
// // create song - POST route
// router.post('/', async (req, res) => {
// 	let song;

// 	const createLyric = async (lyric, index) => {
// 		console.log('lyric', lyric);
// 		const newLyric = await new Lyric({
// 			lyric: lyric,
// 			likeCount: 1,
// 			inSong: await song.id,
// 			lyricRef: 'line' + ((await index) + 1),
// 		});
// 		newLyric.createLine(newLyric);
// 		song.lyrics.push(await newLyric);
// 	};

// 	try {
// 		song = await new Song({});
// 		song.title = req.body.title;
// 		song.initialLyrics = req.body.initialLyrics;

// 		const lyricsToSplit = await song.initialLyrics.split(',');
// 		song.lineCount = await lyricsToSplit.length;
// 		console.log('lyrics to split', lyricsToSplit);
// 		lyricsToSplit.forEach(async (lyric, index) => {
// 			console.log('index', await index);
// 			song.splitLyrics.push(await lyric);

// 			createLyric(lyric, index);
// 		});

// 		await song.save();
// 		res.redirect('songs');
// 	} catch {
// 		res.send('oh');
// 	}
// });

router.get('/:id', async (req, res) => {
	try {
		const song = await Song.findById(req.params.id);
		// .populate([
		// 	{
		// 		path: 'lyricLines.lyricsInLine',
		// 		model: 'ALine',
		// 		select: '_id lineNumber lyric likeCount createdAt',
		// 	},
		// ])
		// .exec();
		// song.lyricLines

		// console.log(await song.id);
		const lyricLines = await ALine.find({});
		// console.log(await lyricLines);
		const songLyrics = lyricLines.filter(function (line) {
			// console.log('songId', line.songId);
			// console.log('song Id', song.id);
			if (line.songId === song.id) {
				return line;
			}
		});
		// console.log(await songLyrics);
		// await lyricLines
		// 	.populate([
		// 		{
		// 			path: 'lyricLines',
		// 			model: 'ALine',
		// 			select: '_id lineNumber lyric likeCount createdAt',
		// 		},
		// 	])
		// 	.exec();
		// const lyrics = await Lyric.find({});
		// const allLyrics = await song.allLyrics;
		// let str = await allLyrics[0];
		// const lyrics = await str.split(',');
		// console.log('lyrics to sort', songLyrics);
		// const lyrics = await song.allLyrics.split(',');
		res.render('songs/show', {
			song: song,
			lyricLines: lyricLines,
			// songLyrics: songLyrics,
			songLyrics: songLyrics.sort(function (a, b) {
				// console.log('a', a.likeCount);
				return b.likeCount - a.likeCount;
			}),
			// lyrics: lyrics,
		});
		// console.log('lyrics to sort', songLyrics);
	} catch (error) {
		console.log(error);
		res.redirect('/');
	}
});

router.get('/:id/edit', async (req, res) => {
	try {
		const song = await Song.findById(req.params.id);
		console.log(await song.id);
		const lyricLines = await ALine.find({});
		console.log(await lyricLines);
		const songLyrics = lyricLines.filter(function (line) {
			console.log('songId', line.songId);
			console.log('song Id', song.id);
			if (line.songId === song.id) {
				return line;
			}
		});
		console.log(await songLyrics);
		res.render('songs/edit', { song: song, songLyrics: songLyrics });
	} catch {
		res.redirect('/songs');
	}
});

router.put('/:id', async (req, res) => {
	let song;
	try {
		song = await Song.findOneAndUpdate({ id: req.params.id });
		console.log('song to update', await song);
		console.log('body', req.body);
		// console.log('all form item', req.body.allFormItems);
		console.log('name = lyric', req.body.lyric);
		// song.title = req.body.title;
		// song.allLyrics = req.body.allLyrics;
		// await song.save();

		const newAline = await new ALine({
			songId: song.id,
			lineNumber: 2,
			likeCount: 0,
			lyric: "to tell me that i'm wrong",
		});
		await newAline.save();

		song.lyricLines.push(await newAline);

		await song.save();
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
