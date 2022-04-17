// // Initialize express router
// let router = require('express').Router();
// // Set default API response
// router.get('/', function (req, res) {
// 	res.json({
// 		status: 'API Its Working',
// 		message: 'Welcome to RESTHub crafted with love!',
// 	});
// });
// // Import contact controller
// let songsController = require('./controllers/songsController');
// // Contact routes
// router.route('/officialSong').get(songsController.index);
// // .post(songsController.new);
// router.route('/officialSong/:officialSong_id').get(songsController.view);
// //     .patch(songsController.update)
// //     .put(songsController.update)
// //     .delete(songsController.delete);
// // Export API routes
// module.exports = router;
