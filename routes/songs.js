const express = require('express');
const router = express.Router();
const Song = require('../models/song');
const User = require('../models/User');
const ALine = require('../models/aLine');

// all songs route
// router.get('/', async (req, res) => {
// 	try {
// 		const songs = await Song.find({});
// 		res.render('songs/index', {
// 			songs: songs,
// 		});
// 	} catch {
// 		res.redirect('/');
// 	}
// });

// All songs route
router.get('/', async (req, res) => {
	const songs = await Song.find({});
	// const users = await User.find({});
	let query = Song.find();
	if (req.query.title != null && req.query.title != '') {
		query = query.regex('title', new RegExp(req.query.title, 'i'));
	}

	try {
		const song = await query.exec();
		res.render('songs/index', {
			song: song,
			searchOptions: req.query,
			songs: songs,
			// users: users,
		});
	} catch {
		res.redirect('/');
	}
});

// new song route
router.get('/new', (req, res) => {
	console.log('current user? ', res.locals.user.id);
	res.render('songs/new', { song: new Song() });
});

// create song - POST route
router.post('/', async (req, res) => {
	let song;
	// console.log('current user? ', res.locals.user.id);
	const user = await User.findById(req.body.userID);
	// const userId = req.body;
	console.log('user id', user);
	const createLyric = async (lyric, index) => {
		// console.log('lyric', lyric);
		const newLyric = await new ALine({
			lyric: lyric,
			likeCount: 1,
			songId: await song.id,
			userId: await user.id,
			lyricRef: 'line' + ((await index) + 1),
			lineNumber: (await index) + 1,
		});
		newLyric.createLine(newLyric);
		song.lyricLines.push(await newLyric);
		user.linesCreated.push(await newLyric);
	};

	try {
		song = await new Song({});
		song.title = req.body.title;
		song.initialLyrics = req.body.initialLyrics;
		song.createdBy = req.body.userID;
		// splits initial lyrics string into each lyric line string
		const lyricsToSplit = await song.initialLyrics.split(',');
		song.lineCount = await lyricsToSplit.length;
		// console.log('lyrics to split', lyricsToSplit);
		lyricsToSplit.forEach(async (lyric, index) => {
			// console.log('index', await index);
			song.splitLyrics.push(await lyric);
			// creates a new Aline schema for each individual line
			createLyric(lyric, index);
		});
		user.songsCreated.push(await song.id);
		console.log('user with song id in songsCreated? ', user);
		await user.save();
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
		console.log('song id', await song.id);
		const lyricLines = await ALine.find({});
		const setLyrics = await ALine.find({ songId: req.params.id });
		// console.log(await lyricLines);
		const songLyrics = lyricLines.filter(function (line) {
			// console.log('songId', line.songId);
			// console.log('song Id', song.id);
			if (line.songId === song.id) {
				return line;
			}
		});
		// const allSongLyrics = await songLyrics;
		// const allSongLyrics = await lyricLines;
		const allSongLyrics = await setLyrics;
		const allByLineNumber = allSongLyrics.sort(function (a, b) {
			return a.lineNumber - b.lineNumber;
		});
		const byLineAndLikes = await allByLineNumber.sort(function (a, b) {
			return b.likeCount - a.likeCount;
		});

		const allByLikes = allSongLyrics.sort(function (a, b) {
			return b.likeCount - a.likeCount;
		});
		const byLikesAndLines = await allByLikes.sort(function (a, b) {
			return a.lineNumber - b.lineNumber;
		});

		// console.log(await songLyrics);
		// console.log('song', song);
		console.log('songLyrics', songLyrics);
		res.render('songs/edit', {
			song: song,
			// songLyrics: songLyrics.sort(
			// 	(a, b) => parseFloat(b.likeCount) - parseFloat(a.likeCount)
			// ),
			allSongLyrics: allSongLyrics,
			allByLineNumber: allByLineNumber,
			byLineAndLikes: byLineAndLikes,
			byLikesAndLines: byLikesAndLines,
			songLyrics: songLyrics.sort(function (a, b) {
				console.log('like count', a.likeCount);
				return a.likeCount - b.likeCount;
			}),
		});
		console.log('songLyrics post', songLyrics);
	} catch {
		res.redirect('/songs');
	}
});

// update song
router.put('/:id', async (req, res) => {
	let song;
	let updateLine;
	try {
		song = await Song.findById(req.params.id);
		// song = await Song.findOneAndUpdate({ id: req.params.id });
		console.log('song to update', await song);
		const selectedLyrics = req.body.lyric;
		console.log('lyric array', selectedLyrics);
		console.log('line count checker', selectedLyrics.length / 2);

		// const newAline = await new ALine({
		// 	songId: song.id,
		// 	lineNumber: 2,
		// 	likeCount: 0,
		// 	lyric: 'hard coded',
		// });
		// await newAline.save();
		// song.lyricLines.push(await newAline);
		// await song.save();

		const createNewLyric = async (lyric, lineNumber) => {
			// console.log('lyric', lyric);
			const newLyric = await new ALine({
				lyric: lyric,
				likeCount: 0,
				songId: await song.id,
				lyricRef: 'line' + lineNumber,
				lineNumber: lineNumber,
			});
			newLyric.createNewLine(newLyric);
			song.lyricLines.push(await newLyric);
		};

		const updateLineWithALike = async (lineId) => {
			// console.log('id to give like', lineId);
			// updateLine = await ALine.findOne({ id: lineId });
			// console.log('like count', await updateLine);
			// const updateLine = await ALine.findByIdAndUpdate(
			// 	{ _id: lineId },
			// 	{ likeCount: likeCount + 1 }
			// );
			// console.log('line to give a like', await updateLine);
			//
			const giveLike = await ALine.findOneAndUpdate(
				{ _id: lineId },
				{ $inc: { likeCount: 1 } }
			);
			console.log('give like', giveLike);
			giveLike.addLikeToLine(giveLike);

			// updateLine.addLikeToLine(updateLine);
			// console.log('id to give like', lineId);
			// updateLine = await ALine.findOneAndUpdate({ id: lineId });
			// console.log('line to give a like', await updateLine);

			// updateLine.addLikeToLine(updateLine);
		};

		for (let i = 1; i <= selectedLyrics.length; i += 2) {
			console.log('i', i);
			// check [i] if "", update [i-1] likeCount++
			if (selectedLyrics[i] === '') {
				console.log('add like to ', selectedLyrics[i - 1]);
				updateLineWithALike(selectedLyrics[i - 1]);
			}
			// check [i] if !"", get [i-1] lineCount, new Aline [i]
			if (selectedLyrics[i] !== '') {
				console.log('create new line');
				const lineNumber = await ALine.findById(selectedLyrics[i - 1]);
				console.log('line number', lineNumber.lineNumber);
				createNewLyric(selectedLyrics[i], lineNumber.lineNumber);
			}
			console.log('here', i);
		}

		await song.save();
		// res.redirect(`/songs/${song.id}`);
		res.redirect(`/songs`);
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
// 		const lyrics = await ALine.find({ songId: req.params.id });
// 		console.log('lyrics in song', lyrics);
// 		await lyrics.remove();
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
