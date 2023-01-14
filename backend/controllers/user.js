const config = require("../config/database");
const mysql = require("mysql2");
const { json } = require("body-parser");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getUser: async (req, res, next) => {
    const results = await pool.promise().query(
      `
                SELECT * FROM user WHERE role NOT IN ("admin");
                `
    );

    res.status(200).send({
      success: true,
      message: "Berhasil menampilkan user!",
      data: results[0],
    });
  },
  addUser: async (req, res) => {
    let data = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: "user",
    };
    const results = await pool.promise().query(
      `
      INSERT INTO user SET ?;
      `,
      [data]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil menambah user!"
    });
  },

  // Update data character
  editUser: async (req, res) => {
    let data = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: "user",
    };
    let id = req.params.user_id;

    const results = await pool.promise().query(
      `
      UPDATE user SET ? WHERE user_id = ?;
      `,
      [data, id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil edit User!"
    });
  },

  // Delete data character
  deleteUser: async (req, res) => {
    let id = req.params.user_id;

    const results = await pool.promise().query(
      `
      DELETE FROM user WHERE user_id = ?;
      `,
      [id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil hapus user!"
    });
  },
};
