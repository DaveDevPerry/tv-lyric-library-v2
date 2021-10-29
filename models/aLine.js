const mongoose = require('mongoose');

const aLineSchema = new mongoose.Schema({
	// user: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'User',
	// },
	songId: {
		type: String,
	},
	userId: {
		type: String,
	},
	lineNumber: Number,
	lyric: String,
	likeCount: {
		type: Number,
		default: 1,
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

aLineSchema.methods.addLikeToLine = function (updateLine) {
	console.log('add like to existing line', updateLine);
	updateLine.save();
	console.log('line updated with like?');
};

aLineSchema.methods.createNewLine = function (newLyric) {
	console.log('add new lyric', newLyric);
	newLyric.save();
	console.log('new lyric saved?');
};

// aLineSchema.methods.deleteLine = function(deleteLyric){
// 	console.log('deleting a line', deleteLyric)

// }

module.exports = mongoose.model('ALine', aLineSchema);
