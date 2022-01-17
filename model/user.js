const db = require('./dbconfig')

var userDB = {};

// Verify admin’s credentials using email and password

userDB.login = (email, password,callback)=>{
    var conn = db.getConnection();

    var sqlStmt = "SELECT user_id, email, password FROM user WHERE email =? AND password = ?";

    conn.query(sqlStmt, [email, password], (err,result)=>{
        if(err){
            return callback(err,null);
        } else {
            return callback(null,result);
        }
    })
}



module.exports = userDB;