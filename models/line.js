const mongoose = require('mongoose')



const lineSchema = new mongoose.Schema({
  lyric: {
    type: [ mongoose.Schema.Types.ObjectId ]
  }
})

module.exports = mongoose.model('Line',lineSchema)