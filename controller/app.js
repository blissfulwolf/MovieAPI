const express = require('express');
const morgan = require("morgan");
const movieDB = require("../model/movie");
const genreDB = require('../model/genre');
const userDB = require('../model/user');

var app = express();

app.use(express.json());
app.use(morgan('dev'));

// Movie.js
// Retrieve movies based on substring of movie name, sorted in ascending release date
app.get("/movies/:search", (req,res)=>{
    var search = req.params.search;


    movieDB.searchMovies(search, (err, result)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
})

// Add new movie
app.post("/movies", (req,res)=>{
    var {name, description, release_date, image_url, genre_id, date_inserted} = req.body;

    movieDB.addMovie(name, description, release_date, image_url, genre_id, date_inserted, (err, result)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
})


// Retrieve all active screening movies
app.get("/movies", (req,res)=>{
    movieDB.getAllMovies((err,results)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    })
})

// Genre.js
// Retrieve all genre
app.get("/genres", (req,res)=>{
    genreDB.getAllGenre((err,results)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(results)
        }
    })
})

// Add new genre
app.post("/genres", (req,res)=>{
    var {genre_id, name} = req.body;

    genreDB.addGenre(genre_id, name, (err,result)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })


})


// User.js
// Verify admin’s credentials using email and password
app.post("/admin", (req,res)=>{
    var {email, password} = req.body;

    userDB.login(email, password, (err,result)=>{
        if(err){
            res.status(500).send(err);
        } else {
            console.log(result)
            console.log("login type " + typeof(result))
            if(result.length == 0){
                res.status(200).send({message:"Wrong Username/Password"});
            } else {
                res.status(200).send({message:"Login Successful. Welcome " + result[0].email})
            }
        }

    })
})








module.exports = app;