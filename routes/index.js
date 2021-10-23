const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
// 	console.log('index router');
// 	res.redirect('/songs');
// 	// res.render('index');
// });
router.get('/', (req, res) => {
	if (res.locals.user) {
		res.redirect('songs');
	} else {
		res.render('index');
	}
});

module.exports = router;
