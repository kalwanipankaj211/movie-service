const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel.js');
var movieService = require('../services/movieService.js');
router.post('/movie',(req, res)=>{
    var result = movieService.postMovie(req, res);
    result
    .then(event=>{
        res.send(event)
    })
    .catch(err=>{
        console.log("error is",err)
        res.send(err)
    })
})

router.get('/movies',(req,res)=>{
    const name = req.query.query.valueOf();
    var result = movieService.getMovieByName(name);
    result
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send(err)
    })
})
router.post('/movies',(req, res)=>{
    var result = movieService.saveAllMovies(req, res);
    result
    .then(event=>{
        res.send(event)
    })
    .catch(err=>{
        console.log("error is",err)
        res.send(err)
    })
})
module.exports = router;