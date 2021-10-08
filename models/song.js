const mongoose = require('mongoose');
const Lyric = require('../models/lyric');
const line = require('./line');

const songSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	allLyricsInLines: [],
	initialLyrics: {
		type: String,
		required: false,
	},
	singleLines: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Line',
		},
	],
	lineCount: {
		type: Number,
		default: 0,
	},
	// allLyrics: {
	// 	type: String,
	// 	required: false,
	// },
	splitLyrics: [],
	lyrics: [],
	// songLyrics: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Lyric',
	// },
	lines: [],
	line: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		ref: 'Line',
	},
	// songLines: [],
	// createdAt: {
	// 	type: Date,
	// 	required: true,
	// 	default: Date.now,
	// },
	postLyrics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lyric' }],

	// author: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	required: true,
	// 	ref: 'Author',
	// },
	// line: {
	//   type: [ mongoose.Schema.Types.ObjectId] // contains array of line
	// },
	// order: {
	//   type: [String],
	// }
});

songSchema.methods.createLine = function (str) {
	console.log('creating a line', str);
};

// fire a function after doc is saved to db - 'save' or 'remove' etc
// songSchema.post('save', function (doc, next) {
// 	console.log('new song was created & saved', doc);

// 	next();
// });

// songSchema.pre('save', function (next) {
// 	console.log('this', this);
// 	const lineArr = await this.splitLyrics;
// 	lineArr.forEach((line) => {
// 		const newLyric = await new Lyric(line);
// 		newLyric.createLine();
// 	})
// 	next();
// });
// fire a function before doc is saved to db - hash password in here with bcrypt
// songSchema.pre('save', function (next) {
// 	console.log('song about to be created & saved', this);

// 	// console.log('pre-song', newSong);
// 	// const splitLyrics = await this.initialLyrics.split(',');
// 	console.log('in pre this', this);
// 	// splitLyrics.forEach(async (individualLyric) => {
// 	// 	const newLyric = await new Lyric({
// 	// 		lyric: individualLyric,
// 	// 		likeCount: 0,
// 	// 		inSong: this._id,
// 	// 	});
// 	// 	await newLyric.save();
// 	// });
// 	// create lyric
// 	const lyricsToSplit = this.splitLyrics;
// 	console.log('lyrics to split', lyricsToSplit);
// 	// lyricsToSplit.forEach(async (lyricToCreate) => {
// 	// 	let lyric = await new Lyric({});
// 	// 	lyric.lyric = await lyricToCreate;
// 	// 	lyric.likeCount = 0;
// 	// 	lyric.song = await this.id;
// 	// 	await lyric.save();
// 	// 	console.log('lyric saved', lyric);
// 	// });
// 	// push to lyrics
// 	console.log('push to lyrics');

// 	// console.log('pere-post-song', newSong);
// 	console.log('here');
// 	next();
// });

module.exports = mongoose.model('Song', songSchema);
