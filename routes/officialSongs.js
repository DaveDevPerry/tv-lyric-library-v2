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
	console.log(req.params.id, 'song id');
	const song = await Song.findById(req.params.id);
	try {
		// const song = await Song.findById(req.params.id);
		console.log(song, 'song');

		res.render('officialSongs/show', {
			song: song,
		});
	} catch (error) {
		console.log(error);
		res.redirect('/');
	}
});

// router.get('/:id/edit', async (req, res) => {
// 	try {
// 		const song = await Song.findById(req.params.id);
// 		console.log('song id', await song.id);
// 		const lyricLines = await ALine.find({});
// 		const setLyrics = await ALine.find({ songId: req.params.id });
// 		// console.log(await lyricLines);
// 		const songLyrics = lyricLines.filter(function (line) {
// 			// console.log('songId', line.songId);
// 			// console.log('song Id', song.id);
// 			if (line.songId === song.id) {
// 				return line;
// 			}
// 		});
// 		// const allSongLyrics = await songLyrics;
// 		// const allSongLyrics = await lyricLines;
// 		const allSongLyrics = await setLyrics;
// 		const allByLineNumber = allSongLyrics.sort(function (a, b) {
// 			return a.lineNumber - b.lineNumber;
// 		});
// 		const byLineAndLikes = await allByLineNumber.sort(function (a, b) {
// 			return b.likeCount - a.likeCount;
// 		});

// 		const allByLikes = allSongLyrics.sort(function (a, b) {
// 			return b.likeCount - a.likeCount;
// 		});
// 		const byLikesAndLines = await allByLikes.sort(function (a, b) {
// 			return a.lineNumber - b.lineNumber;
// 		});

// console.log(await songLyrics);
// console.log('song', song);
// 		console.log('songLyrics', songLyrics);
// 		res.render('officialSongs/edit', {
// 			song: song,
// 			// songLyrics: songLyrics.sort(
// 			// 	(a, b) => parseFloat(b.likeCount) - parseFloat(a.likeCount)
// 			// ),
// 			allSongLyrics: allSongLyrics,
// 			allByLineNumber: allByLineNumber,
// 			byLineAndLikes: byLineAndLikes,
// 			byLikesAndLines: byLikesAndLines,
// 			songLyrics: songLyrics.sort(function (a, b) {
// 				console.log('like count', a.likeCount);
// 				return a.likeCount - b.likeCount;
// 			}),
// 		});
// 		console.log('songLyrics post', songLyrics);
// 	} catch {
// 		res.redirect('/officialSongs');
// 	}
// });

// update song
// router.put('/:id', async (req, res) => {
// 	// console.log('start');
// 	// const allIds = req.body.lyricId;
// 	// console.log('all ids', allIds);

// 	let song;
// 	let updateLine;
// 	try {
// 		song = await Song.findById(req.params.id);
// 		// song = await Song.findOneAndUpdate({ id: req.params.id });
// 		// console.log('song to update', await song);
// 		const selectedLyrics = req.body.lyric;
// 		// console.log('lyric array', selectedLyrics);
// 		// console.log('line count checker', selectedLyrics.length / 2);

// 		const createNewLyric = async (lyric, lineNumber) => {
// 			// console.log('lyric', lyric);
// 			const newLyric = await new ALine({
// 				lyric: lyric,
// 				likeCount: 0,
// 				songId: await song.id,
// 				lyricRef: 'line' + lineNumber,
// 				lineNumber: lineNumber,
// 			});
// 			newLyric.createNewLine(newLyric);
// 			song.lyricLines.push(await newLyric);
// 		};

// 		const updateLineWithALike = async (lineId) => {
// 			const giveLike = await ALine.findOneAndUpdate(
// 				{ _id: lineId },
// 				{ $inc: { likeCount: 1 } }
// 			);
// 			console.log('give like', giveLike);
// 			giveLike.addLikeToLine(giveLike);
// 		};

// 		for (let i = 1; i <= selectedLyrics.length; i += 2) {
// 			console.log('i', i);
// 			// check [i] if "", update [i-1] likeCount++
// 			if (selectedLyrics[i] === '') {
// 				console.log('add like to ', selectedLyrics[i - 1]);
// 				updateLineWithALike(selectedLyrics[i - 1]);
// 			}
// 			// check [i] if !"", get [i-1] lineCount, new Aline [i]
// 			if (selectedLyrics[i] !== '') {
// 				console.log('create new line');
// 				const lineNumber = await ALine.findById(selectedLyrics[i - 1]);
// 				console.log('line number', lineNumber.lineNumber);
// 				createNewLyric(selectedLyrics[i], lineNumber.lineNumber);
// 			}
// 			console.log('here', i);
// 		}
// 		song.reviewCount = song.reviewCount + 1;
// 		await song.save();
// 		// res.redirect(`/songs/${song.id}`);
// 		res.redirect(`/officialSongs`);
// 	} catch {
// 		if (song == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('officialSongs/edit', {
// 				song: song,
// 				errorMessage: 'Error updating song',
// 			});
// 		}
// 	}
// });

// router.delete('/:id', async (req, res) => {
// 	console.log('delete');
// 	let song;
// 	let user;
// 	try {
// 		song = await Song.findById(req.params.id);
// 		user = await User.findById(song.createdBy);

// 		const userLyrics = user.linesCreated;
// 		const lyrics = await ALine.find({ songId: req.params.id });
// 		// console.log('lyrics in song', lyrics);
// 		// await lyrics.remove();
// 		// await song.remove();
// 		// res.redirect(`/songs`);
// 		console.log('user id', user.id);
// 		console.log('user lyric arr', user.linesCreated);
// 		console.log('deleted song id', song.id);
// 		console.log('deleted aline', lyrics);
// 		lyrics.forEach((lyric) => {
// 			console.log('lyric id', lyric.id);

// 		});
// 	} catch {
// 		if (song == null) {
// 			res.redirect('/');
// 		} else {
// 			res.redirect(`/songs/${song.id}`);
// 		}
// 	}
// });

// working update song - before agree lines btn submit
// router.put('/:id', async (req, res) => {
// 	const allIds = req.body.lyricId;
// 	console.log('all ids', allIds);
// 	console.log('now');
// 	let song;
// 	let updateLine;
// 	try {
// 		song = await Song.findById(req.params.id);
// 		// song = await Song.findOneAndUpdate({ id: req.params.id });
// 		console.log('song to update', await song);
// 		const selectedLyrics = req.body.lyric;
// 		console.log('lyric array', selectedLyrics);
// 		console.log('line count checker', selectedLyrics.length / 2);

// 		const createNewLyric = async (lyric, lineNumber) => {
// 			// console.log('lyric', lyric);
// 			const newLyric = await new ALine({
// 				lyric: lyric,
// 				likeCount: 0,
// 				songId: await song.id,
// 				lyricRef: 'line' + lineNumber,
// 				lineNumber: lineNumber,
// 			});
// 			newLyric.createNewLine(newLyric);
// 			song.lyricLines.push(await newLyric);
// 		};

// 		const updateLineWithALike = async (lineId) => {

// 			const giveLike = await ALine.findOneAndUpdate(
// 				{ _id: lineId },
// 				{ $inc: { likeCount: 1 } }
// 			);
// 			console.log('give like', giveLike);
// 			giveLike.addLikeToLine(giveLike);
// 		};

// 		for (let i = 1; i <= selectedLyrics.length; i += 2) {
// 			console.log('i', i);
// 			// check [i] if "", update [i-1] likeCount++
// 			if (selectedLyrics[i] === '') {
// 				console.log('add like to ', selectedLyrics[i - 1]);
// 				updateLineWithALike(selectedLyrics[i - 1]);
// 			}
// 			// check [i] if !"", get [i-1] lineCount, new Aline [i]
// 			if (selectedLyrics[i] !== '') {
// 				console.log('create new line');
// 				const lineNumber = await ALine.findById(selectedLyrics[i - 1]);
// 				console.log('line number', lineNumber.lineNumber);
// 				createNewLyric(selectedLyrics[i], lineNumber.lineNumber);
// 			}
// 			console.log('here', i);
// 		}
// 		song.reviewCount = song.reviewCount + 1;
// 		await song.save();
// 		// res.redirect(`/songs/${song.id}`);
// 		res.redirect(`/songs`);
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

module.exports = router;

// .update(
//   {_id: req.user._id},
//   { $pull: {posts: req.body.post_id } }
// )
// .then( err => {
//   ...
// });
