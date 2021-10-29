const mongoose = require('mongoose');

const officialSongSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	title: {
		type: String,
		required: true,
		unique: true,
	},
	createdBy: {
		type: String,
	},
	fromReleaseTitle: {
		type: String,
		required: true,
	},
	lyrics: {
		type: String,
		required: true,
	},
	source: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('OfficialSong', officialSongSchema);
