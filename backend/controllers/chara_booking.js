const config = require("../config/database");
const mysql = require("mysql2");
const chara = require("./chara");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getBooking: async (req, res, next) => {
    let user_id = req.autis.user_id;

    const results = await pool.promise().query(
      `
        SELECT character_order.order_id,character_anime.chara_id, character_anime.chara_img, character_anime.chara_name,character_anime.chara_size,character_anime.price
        FROM character_order
        INNER JOIN character_anime ON character_order.chara_id=character_anime.chara_id WHERE user_id = ? AND bukti_payment IS NULL;
                `,
      [user_id]
    );

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },

  addBooking: async (req, res) => {
    let data = {
      chara_id: req.params.chara_id,
      user_id: req.autis.user_id,
    };
    const check = await pool.promise().query(
      `
      SELECT * FROM character_order WHERE chara_id = ? AND bukti_payment IS NULL
      `,
      [data.chara_id]
    );

    if(check[0].length > 0){ res.status(500).send({
      success: true,
      message: "bookingan sudah ada!",
      
    }).end();}
    else{
    const results = await pool.promise().query(
      `
      INSERT INTO character_order SET ?;
      `,
      [data]
    )
    res.status(200).send({
      success: true,
      message: "Berhasil tambah bookingan!",
    }).end();}
  },

  deleteBooking: async (req, res) => {
    let id = req.params.order_id;

    const results = await pool.promise().query(
      `
      DELETE FROM character_order WHERE order_id = ?;
      `,
      [id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil hapus bookingan!",
      data: results[0],
    });
  },
};
