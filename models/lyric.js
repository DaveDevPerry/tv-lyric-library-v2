const mongoose = require('mongoose');
const Line = require('../models/line');
const Song = require('../models/song');

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
	inSong: {
		type: String,
	},
});

lyricSchema.methods.createLine = function (newLyric) {
	console.log('creating a line', newLyric);
	newLyric.save();
	console.log('lyric saved?');
	// push to song / lyrics
	// const findSong = Song.find({ id: newLyric.inSong });
	// console.log('found song', findSong);
};

// after lyric saved
// lyricSchema.post('save', function (doc, next) {
// 	console.log('lyric post doc', doc);

// 	// find song by id and push lyric to arr
// 	// const song = await Song.findById(doc.song);
// 	// console.log('song by id', song);
// 	next();
// });

// before save
// lyricSchema.pre('save', function (next) {
// 	console.log('this', this);
// 	next();
// });
// fire a function after doc is saved to db - 'save' or 'remove' etc
// lyricSchema.post('save', function (doc, next) {
// 	console.log('new lyric was created & saved', doc);
// 	console.log('doc and this', doc, this);
// 	// next();
// });

// // fire a function before doc is saved to db - hash password in here with bcrypt
// lyricSchema.pre('save', function (next) {
// 	console.log('lyric about to be created & saved', this);

// 	// const line = await new Line({
// 	// 	singleLine: this.id,
// 	// 	// singleLines: this,
// 	// });
// 	// console.log('line in pre save', line);
// 	// await line.save();
// 	next();
// });

module.exports = mongoose.model('Lyric', lyricSchema);
