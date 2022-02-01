// contactController.js
// Import contact model
Song = require('../models/officialSong');
// Handle index actions
exports.index = function (req, res) {
	Song.find(function (err, songs) {
		if (err) {
			res.json({
				status: 'error',
				message: err,
			});
		}
		res.json({
			status: 'success',
			message: 'Songs retrieved successfully',
			data: songs,
		});
	});
};

// User.findOne({username: 'joe'}).deselect(['password']).exec(function(err, doc) {
//     user = doc.toJSON();
//   });

// Handle create contact actions
// exports.new = function (req, res) {
//     let song = new Contact();
//     contact.name = req.body.name ? req.body.name : contact.name;
//     contact.gender = req.body.gender;
//     contact.email = req.body.email;
//     contact.phone = req.body.phone;
// // save the contact and check for errors
//     contact.save(function (err) {
//         // if (err)
//         //     res.json(err);
// res.json({
//             message: 'New contact created!',
//             data: contact
//         });
//     });
// };

// Handle view contact info
exports.view = function (req, res) {
	const allSongs = Song.find(function (err, song) {
		if (err) res.send(err);
		res.json({
			message: 'Song details loading..',
			data: songs,
		});
	});
	// Song.find(function (err, song) {
	// 	// Song.findById(req.params.song_id, function (err, song) {
	// 	if (err) res.send(err);
	// 	res.json({
	// 		message: 'Song details loading..',
	// 		data: song,
	// 	});
	// });
};
// Handle update contact info
// exports.update = function (req, res) {
// Contact.findById(req.params.contact_id, function (err, contact) {
//         if (err)
//             res.send(err);
// contact.name = req.body.name ? req.body.name : contact.name;
//         contact.gender = req.body.gender;
//         contact.email = req.body.email;
//         contact.phone = req.body.phone;
// // save the contact and check for errors
//         contact.save(function (err) {
//             if (err)
//                 res.json(err);
//             res.json({
//                 message: 'Contact Info updated',
//                 data: contact
//             });
//         });
//     });
// };
// // Handle delete contact
// exports.delete = function (req, res) {
//     Contact.remove({
//         _id: req.params.contact_id
//     }, function (err, contact) {
//         if (err)
//             res.send(err);
// res.json({
//             status: "success",
//             message: 'Contact deleted'
//         });
//     });
// };
