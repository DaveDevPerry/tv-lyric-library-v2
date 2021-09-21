const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	// songLyrics: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Lyric',
	// },
	songLyrics: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Lyric',
	},

	// line: {
	//   type: [ mongoose.Schema.Types.ObjectId] // contains array of line
	// },
	// order: {
	//   type: [String],
	// }
});

module.exports = mongoose.model('Song', songSchema);
