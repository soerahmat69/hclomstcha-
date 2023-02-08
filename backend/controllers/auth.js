const config = require("../config/database");
const mysql = require("mysql2");
const { password } = require("../config/database");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  login: async (req, res,next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username == "" || password == "") {
      return res.status(400).send({
        success: false,
        message: "username and password is blank",
      });
    }
    const result = await pool.promise().query(
      `
        SELECT user_id,username,role FROM user where username= ? and password = ?;
        `,
      [username, password]
    );
    if(result[0].length > 0){
      req.autis.logedin = true;
      req.autis.name = result[0][0].username;
      req.autis.role = result[0][0].role;
      req.autis.user_id = result[0][0].user_id;
      return res.status(200).send({
        success: true,
        message: "berhasil melakukan login!",
        data: result[0]
      });
      }else{
       return res.status(500).send({
          message: "katasandi salah ",
        }).end();
        
      }
      
  },
  signup: async (req, res, next) => {
    let data = {
      username: req.body.username,
      email: req.body.email,
      role: "user",
      password: req.body.password,
    };
    if(data.username !== "" || data.email !== "" || data.password !== ""){
    const result = await pool.promise().query(
      `
      SELECT email FROM user WHERE email = ?;
                `,
      [data.email]
    );
    if(result[0].length > 0){
       res.status(401).send({
        success: true,
        message: "gagal membuat akun!",
      });
      }else{
      const results = await pool.promise().query(
        `
        INSERT INTO user SET ?;
                  `,
        [data],
      );
    res.status(200).send({
      success: true,
      message: "Berhasil membuat akun!",
      data : results[0]
    });
    }
  }else{
    res.status(500).send({
      success: true,
      message: "Gagal membuat akun kosong data!",
    });
  }
  },
  logout: async (req, res, next) => {
    req.autis.reset();
    return res.status(200).send({ msg: "anda telah melakukan logout" });
    
  },

  VeryLogging: async (req, res, next) => {
    if (!req.autis.logedin) {
      return res.status(401).send({ msg: "coba login kembali" }).end();
    }
    next();
  },
  VeryAdmin: async (req, res, next) => {
    if (req.autis.role !== "admin") {
      return res.status(401).send({ msg: "ngapain hayoo!!" }).end();
    }
    next();
  },
  VeryUser: async (req, res, next) => {
    if (req.autis.role !== "user") {
      return res.status(401).send({ msg: "ngapain hayoo!!" }).end();
    }
    next();
  },
 
};
