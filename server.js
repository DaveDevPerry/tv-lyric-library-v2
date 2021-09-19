if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')



const indexRouter = require('./routes/index')
const songRouter = require('./routes/songs')
const lyricRouter = require('./routes/lyric')
const lineRouter = require('./routes/line')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error)=> console.log(error))
db.once('open', () => console.log('connected to mongoose'))


app.use('/', indexRouter)
app.use('/songs', songRouter)
app.use('/lyric', lyricRouter)
app.use('/line', lineRouter)

app.listen(process.env.PORT || 3000)