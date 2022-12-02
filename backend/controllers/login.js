const config = require('../config/database');
const mysql = require('mysql');
const database = require('../config/database');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={ 

    getUser(req,res){
        let username = req.body.username;
        let password = req.body.password;
        if (username == "" || password == ""){
            res.send({
                success: false,
                message: "username and password is blank"
            })
        }else{
        pool.getConnection(function(err,connection){
    if (err) throw err;
    
    connection.query(
        `
        SELECT * FROM user where username= ? and password = ?;
        `
    ,[username,password],function (error, results) {
       if(results.length > 0){
        res.status(200).send({             
            success: true, 
            message: 'berhasil',
            data : results,
        })
        
       }else {
        res.status(404).send({
            message : "username or password do not match"
        })
res.end()
       }
    });
    });
    }
    }
}