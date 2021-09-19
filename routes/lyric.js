const express = require('express')
const router = express.Router();
const Lyric = require('../models/lyric')


// all lyrics route
// router.get('/', async(req,res)=>{
//   try{
//     const lyrics = await Lyric.find({})
//     res.render('lyrics/index', {
//       lyrics: lyrics,
//     })
//   } catch{
//     res.redirect('/')
//   }
// })
// router.get('/', async(req,res)=>{
//   try{
//     const lyrics = await Lyric.find({})
//     res.render('lyric/index', {
//       lyrics: lyrics,
//     })
//   } catch{
//     res.redirect('/')
//   }
// })

// // new song route
// router.get('/new', (req,res)=>{
//   res.render('lyric/new', { lyric: new Lyric()})
// })

router.get('/', async (req,res)=>{
  try{
    const lyrics = await Lyric.find({})
    res.render('lyric/index', {
      lyrics: lyrics,
    })
  } catch {
    res.redirect('/')
  }
  
})

// new song route
router.get('/new', (req,res)=>{
  res.render('lyric/new', { lyric: new Lyric()})
})


// create lyric - POST route
router.post('/', async (req,res)=>{
  const lyric = new Lyric({
    lyric: req.body.lyric,
  });
  try{
    const newLyric = await lyric.save();
    res.redirect(`lyric/${newLyric.id}`)
    console.log(newLyric)
  }catch (error) {
res.render('lyric/new', {
  lyric: lyric,
  error: 'error creating lyric'
})
  }
})


router.get('/:id', async (req,res)=>{
  try{
    const lyric = await Lyric.findById(req.params.id)
    res.render('lyric/show', {
      lyric: lyric,
    })
  }catch(error){
    console.log(error)
    res.redirect('/')
  }
})


router.get('/:id/edit', async (req, res) => {
	try {
		const lyric = await Lyric.findById(req.params.id);
		res.render('lyric/edit', { lyric: lyric });
	} catch {
		res.redirect('/lyric');
	}
});


router.put('/:id', async (req, res) => {
	let lyric;
	try {
		lyric = await Lyric.findById(req.params.id);
		lyric.lyric = req.body.lyric;
		await lyric.save();
		res.redirect(`/lyric/${lyric.id}`);
	} catch {
		if (lyric == null) {
			res.redirect('/');
		} else {
			res.render('lyric/edit', {
				lyric: lyric,
				errorMessage: 'Error updating lyric',
			});
		}
	}
});


router.delete('/:id', async (req, res) => {
	let lyric;
	try {
		lyric = await Lyric.findById(req.params.id);
		await lyric.remove();
		res.redirect(`/lyric`);
	} catch {
		if (lyric == null) {
			res.redirect('/');
		} else {
			res.redirect(`/lyric/${lyric.id}`);
		}
	}
});


module.exports = router;