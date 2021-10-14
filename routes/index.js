const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
// 	console.log('index router');
// 	res.redirect('/songs');
// 	// res.render('index');
// });
router.get('/', (req, res) => {
	res.render('index');
});

module.exports = router;
