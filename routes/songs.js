const express = require('express');
const router = express.Router();
const Song = require('../models/song');
const Lyric = require('../models/lyric');
const Line = require('../models/line');
const line = require('../models/line');
const SingleLine = require('../models/singleLine');

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
// router.post('/', async (req, res) => {
// 	const song = new Song({
// 		title: req.body.title,
// 		initialLyrics: req.body.initialLyrics,
// 	});
// 	// split initialLyrics string
// 	const splitLyrics = await song.initialLyrics.split(',');
// 	console.log('slit lyrics', splitLyrics);
// 	// create a lyric for each str
// 	// splitLyrics.forEach(async (individualLyric) => {
// 	// let saveLyric;
// 	// let saveLine;
// 	// const newSingleLine = await new SingleLine({
// 	// 	line: individualLyric,
// 	// });

// 	// console.log('new single line', newSingleLine);

// 	// try {
// 	// const saveLyric = await newLyric.save();
// 	// console.log('lyric saved', saveLyric);
// 	// push saveLyric to song.lyrics
// 	// song.lyrics = saveLyric;
// 	// song.lyrics.push(saveLyric);
// 	// create a line for each lyric
// 	// await song.save();
// 	// } catch {
// 	// res.send('error one');
// 	// }
// 	// // push saveLyric to song.lyrics
// 	// song.lyrics.push(saveLyric);
// 	// console.log('song.lyrics', song.lyrics);
// 	// const line = await new Line();

// 	// try {
// 	// 	line.line.push(saveLyric);
// 	// 	saveLine = await line.save();
// 	// 	song.lines.push(saveLine);
// 	// 	await song.save();
// 	// } catch {
// 	// 	res.send('error 2');
// 	// }
// 	// });
// 	// console.log('here', song);

// 	try {
// 		// const newSong = await song.save();
// 		console.log('redirect to songs');
// 		res.redirect('songs');
// 		// res.redirect(`songs/${newSong.id}`);
// 		// console.log('new song', newSong);
// 	} catch (err) {
// 		res.send(err);
// 	}
// });

router.post('/', async (req, res) => {
	let song;
	let newLyric;
	let lyric;
	const createLyric = async (lyric) => {
		console.log('lyric', lyric);
		const newLyric = await new Lyric({
			lyric: lyric,
			likeCount: 1,
			inSong: await song.id,
		});
		newLyric.createLine(newLyric);
		song.lyrics.push(await newLyric);
	};
	// const findSong = async (newLyric) => {
	// 	const foundSong = await Song.findOne({ id: newLyric.inSong });
	// 	console.log('foundSong', foundSong)
	// }
	try {
		song = await new Song({});
		song.title = req.body.title;
		song.initialLyrics = req.body.initialLyrics;
		// song.lyricsToSplit = req.body.initialLyrics.split(',');
		const lyricsToSplit = await song.initialLyrics.split(',');
		song.lineCount = await lyricsToSplit.length;
		console.log('lyrics to split', lyricsToSplit);
		lyricsToSplit.forEach(async (lyric) => {
			song.splitLyrics.push(await lyric);
			// working above
			// newLyric = await new Lyric({});
			// newLyric.lyric = await lyric;
			// newLyric.likeCount = 0;
			// newLyric.song = await song.id;
			// // await newLyric.save();
			createLyric(lyric);
			// song.lyrics.push(await newLyric.save());
		});

		song.lyrics.push();

		// new async library
		// let people = [ person1, person2, person3, person4, ... ];
		// async.eachSeries(people, function(person, asyncdone) {
		//   person.save(asyncdone);
		// }, function(err) {
		//   if (err) return console.log(err);
		//   done(); // or `done(err)` if you want the pass the error up
		// });
		// let ryu = {
		// 	title: 'Ryu',
		// 	allLyricsInLines: [
		// 		{
		// 			lyricInLine: 'Hadoken',
		// 			likes: 2,
		// 		},
		// 	],

		// allLyricsInLines: [{
		//   name: 'Hadoken',
		//   keys: '↓ ↘ → P'
		// }, {
		//   name: 'Shoryuken',
		//   keys: '→ ↓ ↘ → P'
		// }, {
		//   name: 'Tatsumaki Senpukyaku',
		//   keys: '↓ ↙ ← K'
		// }],
		// ultimate: {
		//   name: 'Shinku Hadoken',
		//   keys: '↓ ↘ → ↓ ↘ → P'
		// }
		// };
		// const lyricsArr = await song.splitLyrics;
		// lyricsArr.forEach(async (lyric) => {
		// 	const lyricObj = { lyricInLine: await lyric, likes: 0 };
		// 	ryu.allLyricsInLines.push(await lyricObj);
		// });
		// const song1 = new Song(ryu);
		// const doc = await song1.save();
		// console.log(doc);
		// const char = new Character(ryu)
		// const doc = await char.save()
		// console.log(doc)

		// // create lyric
		// lyricsToSplit.forEach(async (lyricToCreate) => {
		// 	lyric = await new Lyric({});
		// 	lyric.lyric = await lyricToCreate;
		// 	lyric.likeCount = 0;
		// 	lyric.song = await song.id;
		// 	// await lyric.save();
		// 	console.log('lyric saved', lyric);
		// });
		// // push to lyrics
		// console.log('push to lyrics');
		// save song
		await song.save();
		res.redirect('songs');
	} catch {
		res.send('oh');
	}
});
// router.post('/', async (req, res) => {
// 	const song = new Song({
// 		title: req.body.title,
// 		initialLyrics: req.body.initialLyrics,
// 	});
// 	console.log('song after create clicked', song);
// 	// split initialLyrics string
// 	const splitLyrics = await song.initialLyrics.split(',');
// 	console.log('split lyrics', splitLyrics);
// create a lyric for each str
// splitLyrics.forEach(async (individualLyric) => {
// 	const newLyric = await new Lyric({
// 		lyric: individualLyric,
// 		likeCount: 0,
// 		inSong: song._id,
// 	});

// var currUser = req.user;
// var currUserId = req.user.id;
// var currProfile = req.body.profile;

// Profile.create({
//    name: currProfile.name,
//    location: currProfile.location
// });

// curUser.profile.push(currProfile.id);

// 	console.log('new lyric', newLyric);
// 	const saveLyric = await newLyric.save();
// 	try {
// 		const saveLyric = await newLyric.save();
// 		console.log('lyric saved', saveLyric);
// 		// push saveLyric to song.lyrics
// 		// song.lyrics = saveLyric;
// 		song.lyrics.push(saveLyric);
// 		// create a line for each lyric

// 		// await song.save();
// 	} catch {
// 		res.send('error one');
// 	}
// 	// // push saveLyric to song.lyrics
// 	// song.lyrics.push(saveLyric);
// 	// console.log('song.lyrics', song.lyrics);
// 	// const line = await new Line();

// 	// try {
// 	// 	line.line.push(saveLyric);
// 	// 	saveLine = await line.save();
// 	// 	song.lines.push(saveLine);
// 	// 	await song.save();
// 	// } catch {
// 	// 	res.send('error 2');
// 	// }
// });
// console.log('here', song);

// 	try {
// 		console.log('song', song);
// 		const newSong = await song.save();
// 		console.log('new song', newSong);
// 		console.log('redirect to songs');
// 		// res.redirect('songs');
// 		// res.redirect(`songs/${newSong.id}`);
// 		// console.log('new song', newSong);
// 	} catch (err) {
// 		res.send(err.message);
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
