const mongoose = require('mongoose');
const Movie = require('../models/movieModel');
function postMovie(req, res){
    return new Promise(function(resolve, reject){
            const movie = new Movie();
            movie._id = new mongoose.Types.ObjectId(),
            movie.name = req.body.name;
            movie.year = req.body.year;
            movie.director = req.body.director;
                movie.save()
                .then(result=>{
                    // console.log("Post Movie",result);
                    const message = {
                        status: 200,
                        message: 'Movie Posted Successfully',
                        post: {
                            _id: result._id,
                            name: result.name,
                            director:result.director
                            
                        }
                    }
                    resolve(message);
                })
                .catch(err=>{
                    console.log(err);
                    const error = {
                        status: 500,
                        message: 'Could not save Movie',
                        err: err.message
                    }
                    reject(error)
                })
    })
}
function getMovieByName(name){
    return new Promise(function(resolve, reject){
        Movie.find({name:name})
                .exec().then(result=>{
                    console.log("result",result);
                    const message = {
                        status: 200,
                        message: 'Got Movie',
                        Movie: result[0]
                    }
                    if(result && result.length>0)
                    {
                        resolve(message);
                    }
                    else{
                        const error = {
                            status: 500,
                            message: 'Could not get Movie',
                        }
                        reject(error);
                    }

                })
                .catch(err=>{
                    console.log(err);
                    const error = {
                        status: 500,
                        message: 'Could not get Movie',
                        err: err
                    }
                    reject(error)
                })
    })
}
function saveAllMovies(req,res){
    return new Promise(function(resolve, reject){
        let movieArray = req.body;
        let promiseArray =[];
        let promise;
        console.log("movie Array",movieArray);
        movieArray.forEach(element => {
            const movie = new Movie();
            movie._id = new mongoose.Types.ObjectId(),
            movie.name = element.name;
            movie.year = req.body.year;
            movie.director = element.director;
            promise = movie.save();
            promiseArray.push(promise);

        });
        Promise.all(promiseArray).then(result =>
        {
            const message = {
                status: 200,
                message: 'Movie Posted Successfully',
                success:result
            }
            resolve(message);
        }).catch(err =>{
            const error = {
                status: 500,
                message: 'Could not save all Movies',
                err: err.errmsg
            }
            reject(error)
        })
    })
}
module.exports ={
    postMovie : postMovie,
    getMovieByName: getMovieByName,
    saveAllMovies: saveAllMovies
}