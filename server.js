if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');

// reference to root location
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const songRouter = require('./routes/songs');
const officialSongRouter = require('./routes/officialSongs');
// const apiRouter = require('./routes/api');
// const apiRouter = require('./api-routes');
// const lineRouter = require('./routes/lines');

// view engine
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use(bodyParser.json());

// const measurement = require('./models/measurement');
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	// useCreateIndex: true,
});
// .then((result) => app.listen(3000))
// .catch((err) => console.log(err));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to mongoose'));

// routes
app.get('*', checkUser);
app.use('/', indexRouter);

app.use('/users', requireAuth, userRouter);
app.use('/songs', requireAuth, songRouter);
app.use('/officialSongs', requireAuth, officialSongRouter);
// app.use('/officialSongs', officialSongRouter);

// app.use('/api', apiRouter);
// app.use('/api', requireAuth, apiRouter);

// app.use('/lines', lineRouter);
// app.use('/', indexRouter);
// app.use('/users', requireAuth, userRouter);
// app.use('/songs', requireAuth, songRouter);
app.use(authRoutes);

app.listen(process.env.PORT || 3000);
