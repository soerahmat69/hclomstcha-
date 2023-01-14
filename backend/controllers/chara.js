const config = require("../config/database");
const mysql = require("mysql2");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  //get chara index
  getChara: async (req, res, next) => {
    const results = await pool.promise().query(
      `
                SELECT * FROM character_anime;
                `
    );

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },

  // Ambil data characeter berdasarkan ID
  getCharaID: async (req, res) => {
    let id = req.params.id;
    const results = await pool.promise().query(
      `
              SELECT * FROM character_anime where chara_id = ?;
              `,
      [id]
    );

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },

  // Simpan data characeter
  addChara: async (req, res) => {
    let data = {
      chara_name: req.body.nama,
      chara_size: req.body.ukuran,
      chara_img: req.body.img,
      accessories_id: req.body.accessories_id,
    };
    const results = await pool.promise().query(
      `
      INSERT INTO character_anime SET ?;
      `,
      [data]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },

  // Update data character
  editChara: async (req, res) => {
    let data = {
      chara_name: req.body.nama,
      chara_size: req.body.ukuran,
      chara_img: req.body.img,
      accessories_id: req.body.accessories_id,
    };
    let id = req.body.chara_id;

    const results = await pool.promise().query(
      `
      UPDATE character_anime SET ? WHERE chara_id = ?;
      `,
      [data, id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil edit data!",
      data: results[0],
    });
  },

  // Delete data character
  deleteChara: async (req, res) => {
    let id = req.body.id;

    const results = await pool.promise().query(
      `
      DELETE FROM character_anime WHERE chara_id = ?;
      `,
      [id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil hapus data!",
      data: results[0],
    });
  },
};
