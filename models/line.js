const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
	// lyric: {
	// 	type: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: 'Lyric',
	// 	},
	// },

	// line: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: 'Lyric',
	// 	},
	// ],
	// lyricsInLine: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: 'Lyric',
	// 	},
	// ],
	singleLine: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Line',
		},
	],
	singleLines: [],
});

module.exports = mongoose.model('Line', lineSchema);
