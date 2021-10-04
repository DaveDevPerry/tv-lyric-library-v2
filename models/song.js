const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	initialLyrics: {
		type: String,
		required: false,
	},
	// allLyrics: {
	// 	type: String,
	// 	required: false,
	// },
	lyrics: [],
	// songLyrics: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Lyric',
	// },
	lines: [],
	// songLines: [],
	// createdAt: {
	// 	type: Date,
	// 	required: true,
	// 	default: Date.now,
	// },

	// line: {
	//   type: [ mongoose.Schema.Types.ObjectId] // contains array of line
	// },
	// order: {
	//   type: [String],
	// }
});

module.exports = mongoose.model('Song', songSchema);
