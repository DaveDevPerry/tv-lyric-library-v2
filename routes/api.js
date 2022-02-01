const express = require('express');
const router = express.Router();
const Song = require('../models/officialSong');

// get all lyrics
// render as json

// router.get('/', async (req, res) => {
// 	const songs = await Song.find();

// 	try {
// 		// res.json({
// 		// 	songs: songs[1].title,
// 		// });
// 		res.json({
// 			data: songs,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// set default API response
router.get('/', function (req, res) {
	res.json({
		status: 'API Its Working',
		message: 'Welcome to RESTHub crafted with love!',
	});
});
// Import contact controller
let songsController = require('../controllers/songsController');
// Contact routes
router.route('/contacts').get(songsController.index);
// .post(songsController.new);
router.route('/contacts/:contact_id').get(songsController.view);
// .patch(songsController.update)
// .put(songsController.update)
// .delete(songsController.delete);
// Export API routes
module.exports = router;

// module.exports = router;
