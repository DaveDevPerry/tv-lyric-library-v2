const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	// firstName: {
	// 	type: String,
	// 	required: false,
	// },
	// lastName: {
	// 	type: String,
	// 	required: false,
	// },
	// dateOfBirth: {
	// 	type: Date,
	// 	required: false,
	// },
	username: String,
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [6, 'Minimum password length is 6 characters'],
	},
	// phoneNbr: {
	// 	type: Number,
	// 	required: false,
	// },
	coverImage: {
		type: Buffer,
		required: false,
	},
	coverImageType: {
		type: String,
		required: false,
	},

	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	songsCreated: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Song',
		},
	],
	linesCreated: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ALine',
		},
	],
});

// fire a function after doc is saved to db - 'save' or 'remove' etc
userSchema.post('save', function (doc, next) {
	console.log('new user was created & saved', doc);
	next();
});

// userSchema.pre('save', async function (next) {
// 	console.log('user about to be created & saved', this);
// 	const salt = await bcrypt.genSalt();
// 	// now hash password
// 	this.password = await bcrypt.hash(this.password, salt);

// 	next();
// });

userSchema.pre('save', async function (next) {
	console.log('user about to be created & saved', this);
	console.log(this.password);
	console.log(this.password[0]);
	if (this.password[0] === '$') {
		next();
	} else {
		const salt = await bcrypt.genSalt();
		// now hash password
		this.password = await bcrypt.hash(this.password, salt);

		next();
	}
});

// static method to login user
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	// check for user
	if (user) {
		// compare hashed passwords using bcrypt
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error('incorrect password');
	}
	throw Error('incorrect email');
};

userSchema.virtual('coverImagePath').get(function () {
	// if (this.coverImage) {
	// 	console.log('here');
	// 	return;
	// }
	// console.log('cover image', coverImage);
	if (this.coverImage != null && this.coverImageType != null) {
		// console.log('cover Image type', coverImageType);
		return `data:${
			this.coverImageType
		};charset=utf-8;base64,${this.coverImage.toString('base64')}`;
	}
});

const User = mongoose.model('user', userSchema);
module.exports = User;
