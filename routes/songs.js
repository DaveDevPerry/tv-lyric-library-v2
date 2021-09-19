const express = require('express')
const router = express.Router();



router.get('/', (req,res)=>{
  res.render('songs')
  console.log('songs route')
})

module.exports = router