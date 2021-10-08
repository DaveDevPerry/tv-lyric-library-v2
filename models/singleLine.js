const mongoose = require('mongoose');

const singleLineSchema = new mongoose.Schema({
	line: [
		{
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
		},
	],
});

module.exports = mongoose.model('SingleLine', singleLineSchema);
