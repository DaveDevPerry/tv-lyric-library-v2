const mongoose = require('mongoose');
const Line = require('../models/line');
const Song = require('../models/song');

const lyricSchema = new mongoose.Schema({
	lyricRef: {
		type: String,
	},
	lyric: {
		type: String,
	},
	likeCount: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	song: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Song',
	},
	inSong: {
		type: String,
	},
});

lyricSchema.methods.createLine = function (newLyric) {
	console.log('creating a line', newLyric);
	newLyric.save();
	console.log('lyric saved?');
};

module.exports = mongoose.model('Lyric', lyricSchema);
