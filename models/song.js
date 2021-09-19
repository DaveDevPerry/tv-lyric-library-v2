const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // line: {
  //   type: [ mongoose.Schema.Types.ObjectId] // contains array of line
  // },
  // order: {
  //   type: [String],
  // }
})

module.exports = mongoose.model('Song', songSchema)