// const express = require('express');
// const router = express.Router();
// const Lyric = require('../models/lyric');
// const Line = require('../models/line');

// router.get('/', async (req, res) => {
// 	try {
// 		const lyrics = await Lyric.find({});
// 		const line = await Line.find({})
// 			.populate([
// 				{
// 					path: 'lyric',
// 					model: 'Lyric',
// 					select: '_id lyric',
// 				},
// 			])
// 			.exec();
// 		const lines = await Line.find({})
// 			.populate([
// 				{
// 					path: 'lyric',
// 					model: 'Lyric',
// 					select: '_id lyric',
// 				},
// 			])
// 			.exec();

// 		// console.log(lines);
// 		res.render('line/index', {
// 			lines: lines,
// 			line: line,
// 			lyrics: lyrics,
// 		});
// 	} catch {
// 		res.redirect('/');
// 	}
// });

// // new song route
// router.get('/new', (req, res) => {
// 	res.render('line/new', {
// 		line: new Line(),
// 	});
// });

// // create line - POST route
// router.post('/', async (req, res) => {
// 	const line = new Line({
// 		line: req.body.line,
// 	});
// 	try {
// 		const newLine = await line.save();
// 		res.redirect(`line/${newLine.id}`);
// 		console.log(newLine);
// 	} catch (error) {
// 		res.render('line/new', {
// 			line: line,
// 			error: 'error creating line',
// 		});
// 	}
// });

// router.get('/:id', async (req, res) => {
// 	try {
// 		const line = await Line.findById(req.params.id);
// 		res.render('line/show', {
// 			line: line,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res.redirect('/');
// 	}
// });

// router.get('/:id/edit', async (req, res) => {
// 	try {
// 		const line = await Line.findById(req.params.id);
// 		res.render('line/edit', { line: line });
// 	} catch {
// 		res.redirect('/line');
// 	}
// });

// router.put('/:id', async (req, res) => {
// 	let line;
// 	try {
// 		line = await Line.findById(req.params.id);
// 		line.line = req.body.line;
// 		await line.save();
// 		res.redirect(`/line/${line.id}`);
// 	} catch {
// 		if (line == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('line/edit', {
// 				line: line,
// 				errorMessage: 'Error updating line',
// 			});
// 		}
// 	}
// });

// router.delete('/:id', async (req, res) => {
// 	let line;
// 	try {
// 		line = await Line.findById(req.params.id);
// 		await line.remove();
// 		res.redirect(`/line`);
// 	} catch {
// 		if (line == null) {
// 			res.redirect('/');
// 		} else {
// 			res.redirect(`/line/${line.id}`);
// 		}
// 	}
// });

// module.exports = router;
