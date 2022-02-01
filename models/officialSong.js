const mongoose = require('mongoose');

const officialSongSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		select: false,
	},
	title: {
		type: String,
		required: true,
		unique: true,
	},
	createdBy: {
		type: String,
		select: false,
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
	__v: {
		type: Number,
		select: false,
	},
	_id: {
		type: mongoose.Schema.ObjectId,
		select: false,
	},
});

module.exports = mongoose.model('OfficialSong', officialSongSchema);
