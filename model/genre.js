const db = require('./dbconfig')

var genreDB = {};


// Retrieve all genre
genreDB.getAllGenre = (callback)=>{
    var conn = db.getConnection();

    var sqlStmt = 'SELECT * FROM genre';

    conn.query(sqlStmt, [], (err, result)=>{
        conn.end();

        if(err){
            return callback(err,null);
        } else {
            return callback(null,result);
        }
    })
}



// Add new genre
genreDB.addGenre = (genre_id, name, callback)=>{

    var conn = db.getConnection();

    var sqlStmt = "INSERT INTO `movieapi`.`genre` (`genre_id` , `name`) VALUES (?, ?)";
    // INSERT INTO `movieapi`.`genre` (`genre_id`, `name`) VALUES ('1', 'Sci-Fi');

    conn.query(sqlStmt, [genre_id, name], (err, result)=>{
        conn.end();

        if(err){
            return callback(err,null);
        } else {
            return callback(null, result)
        }
    })
}

// A2 = Delete genre
genreDB.deleteGenre = (genre_id, callback)=>{

        var conn = db.getConnection();

        var sqlStmt = "DELETE FROM `movieapi`.`genre` WHERE (`genre_id` = ?)"

        conn.query(sqlStmt, [genre_id], (err, result)=>{
            conn.end;

            if(err){
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        })
}


module.exports = genreDB;
