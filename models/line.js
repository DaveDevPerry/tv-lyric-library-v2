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
	lineRef: {
		type: String,
	},
	lyric: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		ref: 'Lyric',
	},
	singleLine: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Line',
		},
	],
	singleLines: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Lyric',
		},
	],
});

// lineSchema.methods.createOriginalLine = function (newLyric) {
// 	console.log('creating a line', newLyric);
// 	newLyric.save();
// 	console.log('lyric saved?');
// };

module.exports = mongoose.model('Line', lineSchema);
