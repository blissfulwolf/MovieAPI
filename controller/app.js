const express = require('express');
const path = require("path")
const morgan = require("morgan");
const movieDB = require("../model/movie");
const genreDB = require('../model/genre');
const userDB = require('../model/user');

const jwt = require('jsonwebtoken');
const secretKey = '12345';

var app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.resolve("./public")));


// JWT Middleware
// Token Bearer Authentication
// Check Authentication Header Exist
function verifyToken(req, res, next){
    var token = req.header("authorization");

    if(!token || !token.includes("Bearer ")){
        res.status(403).send({"message":"Authorization token not found"});
    } else {
        // extract the token
        token = token.split("Bearer ")[1];
        // decode the token
        jwt.verify(token, secretKey, (err,decoded)=>{
            if(err){
                res.status(500).send(err);
            } else {
                req.role = decoded;
                next();
            }
        })
    }
}


// User.js
//  A1 == Verify admin’s credentials using email and password
// JWT token
app.post("/admin", (req,res)=>{
    var {email, password, role } = req.body;    

    userDB.login(email, password, (err,result)=>{
        if(err){
            res.status(500).send(err);
        } else {
            console.log(result);
            if(result.length > 0){
                var tokenPayload = {role:result[0].role};
                var token = jwt.sign(tokenPayload, secretKey, {expiresIn:"1d"});
                res.status(200).send({"token => ":token});
            } else {
                res.status(403).send({"message":"Wrong Username/Password"});
            }
        }
    })
})






// =================================================== //



// A2 = Delete Movie
app.delete("/movies/:movieID", (req,res)=>{
    var movieID = req.params.movieID;
    // console.log("params " + movieID);

    movieDB.deleteMovie(movieID, (err, result)=>{
        if(err){
            res.status(500).send(err);
        } else {
            if(result.affectedRows > 0){
                res.status(200).send({message:"Movie " + movieID + " deleted." })
            } else {
                res.status(404).send({message:"Movie " + movieID + " not found." })
            }
        }
    })
})


// A2 ==  Update Movie
// A2 == Verifytoken
app.put("/movies/:movieID", verifyToken, (req,res)=>{
 
    if(req.login.role == "admin"){        
        var {name, description, release_date, image_url, genre_id, date_inserted} = req.body;
        var movieID = req.params.movieID;

        movieDB.updateMovie(movieID,name, description, release_date, image_url, genre_id, date_inserted, (err, result)=>{
            
            if(err){
                res.status(500).send(err);
            } else {
                if(result.affectedRows > 0){
                    res.status(200).send({message:"Movie " + movieID + " updated." })
                } else {
                    res.status(404).send({message:"Movie " + movieID + " not found." })
                }
            }
        })
    } else {
        res.status(403).send({"message":"Unauthorised access "})
    } 
})




// Movie.js
// A1 == Retrieve movies based on substring of movie name, sorted in ascending release date
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


// A1 == Retrieve all active screening movies
app.get("/movies", (req,res)=>{
    movieDB.getAllMovies((err,results)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    })
})

// A1 ==  Add new movie
app.post("/movies", (req,res)=>{
    var {name, description, release_date, image_url, genre_id, date_inserted} = req.body;
    
    console.log("Movie Added => " + req.body)

    movieDB.addMovie(name, description, release_date, image_url, genre_id, date_inserted, (err, result)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
})





// =================================================== // 
// Genre.js
//  A1 == Retrieve all genre
app.get("/genres", (req,res)=>{
    genreDB.getAllGenre((err,results)=>{
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(results)
        }
    })
})

//  A1 == Add new genre
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

// A2 == Delete Genre
app.delete("/genres", (req,res)=>{

})










module.exports = app;