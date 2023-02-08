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
  getSumOrd: async (req, res, next) => {
    const results = await pool.promise().query(
      `
      SELECT COUNT(chara_id) AS jumlah,chara_id FROM character_order WHERE bukti_payment IS NOT NULL GROUP BY chara_id;
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
    if(!req.files){
     console.log("gagal file")
      return res.status(200).send({
        success: true,
        message: "gagal melakukan tambah data, pastikan gambar telah di upload!",
      });
    }else{
    let data = {
      chara_name: req.body.chara_name,
      chara_size: req.body.chara_size,
      price: req.body.price,
      chara_weight: req.body.chara_weight,
      chara_img: req.files.chara_img[0].filename,
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
  }
  },

  // Update data character
  editChara: async (req, res) => {
    if(!req.files){
      console.log("gagal file")
       return res.status(200).send({
         success: true,
         message: "gagal melakukan tambah data, pastikan gambar telah di upload!",
       });
     }else{
    let data = {
      chara_name: req.body.chara_name,
      chara_size: req.body.chara_size,
      price: req.body.price,
      chara_weight: req.body.chara_weight,
      chara_img: req.files.chara_img[0].filename, 
    };
    let id = req.params.id;

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
  }
  },

  // Delete data character
  deleteChara: async (req, res) => {
    let id = req.params.id;

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
  getAcesories: async (req, res, next) => {
    const results = await pool.promise().query(
      `
                SELECT * FROM acessories_anime 
                INNER JOIN character_anime ON character_anime.chara_id = acessories_anime.chara_id WHERE acessories_anime.chara_id = ?;
                `,[req.params.id]
    );

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },
  editAcessories: async (req, res) => {
    
    let data = {
      chara_id: req.body.chara_id,
      acessories_name: req.body.acessories_name,
      acessories_size: req.body.acessories_size,
    };
    let id = req.params.id;

    const results = await pool.promise().query(
      `
      UPDATE acessories_anime SET ? WHERE acessories_id = ?;
      `,
      [data, id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil edit data!",
      data: results[0],
    });
  
  },
  addAcessories: async (req, res) => {
   
    let data = {
      chara_id: req.body.chara_id,
      acessories_name: req.body.acessories_name,
      acessories_size: req.body.acessories_size,
    };
     if(data.acessories_name !== null || data.acessories_size !== null || data.chara_id !== null){
    const results = await pool.promise().query(
      `
      INSERT INTO acessories_anime SET ?;
      `,
      [data]
    );
    return res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
     
  }else{
      return res.status(500).send({
        success: true,
        message: "gagal ambil data!",
        data: results[0],
      });
    
     }
  },
  deleteAcessories: async (req, res) => {
    let id = req.params.id;
    const results = await pool.promise().query(
      `
      DELETE FROM acessories_anime WHERE acessories_id = ?;
      `,
      [id]
    );
    if(results)
    res.status(200).send({
      success: true,
      message: "Berhasil hapus data!",
      data: results[0],
    });
  },

};
