const db = require('./dbconfig');

var movieDB = {};


// A1 = Retrieve all active screening movies
movieDB.getAllMovies = (callback)=>{
    var conn = db.getConnection();

    var sqlStmt = 'SELECT * FROM movie';

    conn.query(sqlStmt, [], (err, result)=>{
        conn.end();

        if(err){
            return callback(err,null);
        } else {
            return callback(null,result);
        }
    })
}

// A1 = Retrieve movies based on substring of movie name, sorted in ascending release date
movieDB.searchMovies = (searchtitle, callback)=>{
    var conn = db.getConnection();
    console.log("moviejs_search => " + searchtitle);

    var sqlStmt = "SELECT * FROM movie WHERE name LIKE '%" + searchtitle + "%' ORDER BY release_date";

    // "SELECT * FROM movie WHERE name LIKE ? ORDER BY release_date"
    // var sqlStmt = "SELECT * from movie WHERE movie_id = ?"
    // var sqlStmt = "SELECT * FROM movie WHERE name LIKE '%searchtitle%'";
    // "SELECT * FROM movie WHERE name LIKE ? ORDER BY name ASC"
  
    conn.query(sqlStmt, [searchtitle], (err, result)=>{
        conn.end();
        
        if(err){
            return callback(err,null);
        } else {
            return callback(null, result);
        }
    })
}


// A1 = Add new movie
movieDB.addMovie = (name, description, release_date, image_url, genre_id, date_inserted, callback)=>{
        var conn = db.getConnection();

        var sqlStmt = "INSERT INTO `movieapi`.`movie` (`name`, `description`, `release_date`, `image_url`, `genre_id`, `date_inserted`) VALUES (? , ? , ? , ? , ? , ?)";

        conn.query(sqlStmt, [name, description, release_date, image_url, genre_id, date_inserted], (err, result)=>{
            conn.end();

            if(err){
                return callback(err, null);
            } else {
                return callback(null,result);
            }

        })
    }

// A2 = Update movie
movieDB.updateMovie = (movieID, name, description, release_date, image_url, genre_id, date_inserted, callback)=>{
        var conn = db.getConnection();

        var sqlStmt = "UPDATE `movieapi`.`movie` SET `name` = ? , `description` = ?, `release_date` = ? , `image_url` = ? , `genre_id` = ? , `date_inserted` = ?  WHERE (`movie_id` = ? )";
    

        conn.query(sqlStmt, [name, description, release_date, image_url, genre_id, date_inserted, movieID], (err,result)=>{
            conn.end();

            if(err){
                return callback(err,null);
            } else {
                return callback(null, result);
            }
        })
}

// A2 = Delete movie
movieDB.deleteMovie = (movieId, callback)=>{
    
    var conn = db.getConnection();
    console.log("deleteMovie " + movieId)
    
    var sqlStmt = "DELETE FROM movie WHERE movie_id = ?";
    // DELETE FROM `movieapi`.`movie` WHERE (`movie_id` = '8');

    // var sqlStmt = "DELETE FROM `movieapi`.`movie` WHERE (`movie_id` = '8')";

    conn.query(sqlStmt, [movieId], (err, result)=>{
        conn.end;

        if(err){
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    })
}


module.exports = movieDB;