const config = require("../config/database");
const mysql = require("mysql2");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  login: async (req, res) => {
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
        SELECT username,password FROM user where username= ? and password = ?;
        `,
      [username, password]
    );
    req.autis.name = result[0][0];
    if (!req.autis.name)
      return res.status(400).send({ msg: "katasandi salah" }).end();
    req.autis.logedin = true;
    // sessions = req.session.username;
    res.status(200).send({
      success: true,
      message: "berhasil",
      data: req.autis.name,
    });
    console.log(req.autis.name);
  },
  logout: async (req, res, next) => {
    req.autis.reset();

    return res.status(200).send({ msg: "coba untuk login kembali" });
  },

  VeryUser: async (req, res, next) => {
    if (!req.autis.logedin) {
      return res.status(401).send({ msg: "lets try login" }).end();
    }
    next();
  },
};
