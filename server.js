if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// reference to root location
const authRoutes = require('./routes/authRoutes');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const songRouter = require('./routes/songs');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const mongoose = require('mongoose');
// const measurement = require('./models/measurement');
mongoose.connect(process.env.DATABASE_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to mongoose'));

// routes
app.get('*', checkUser);
app.use('/', indexRouter);
app.use('/users', requireAuth, userRouter);
app.use('/songs', requireAuth, songRouter);
app.use(authRoutes);

app.listen(process.env.PORT || 3000);
