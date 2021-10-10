const mongoose = require('mongoose');

const aLineSchema = new mongoose.Schema({
	// user: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'User',
	// },
	songId: {
		type: String,
	},
	lineNumber: Number,
	lyric: String,
	likeCount: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

aLineSchema.methods.createLine = function (newLyric) {
	console.log('creating a line', newLyric);
	newLyric.save();
	console.log('lyric saved?');
};
module.exports = mongoose.model('ALine', aLineSchema);
