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
		required: true,
		default: Date.now,
	},
	song: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Song',
	},
});

module.exports = mongoose.model('Lyric', lyricSchema);
