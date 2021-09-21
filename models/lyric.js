const mongoose = require('mongoose');

const lyricSchema = new mongoose.Schema({
	lyric: {
		type: String,
	},
	likeCount: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.model('Lyric', lyricSchema);
