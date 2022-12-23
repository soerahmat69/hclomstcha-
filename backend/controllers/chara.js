const config = require("../config/database");
const mysql = require("mysql2");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
 
     getChara: async(req, res,next)=>{

      const results = await pool.promise().query(
        `
                SELECT * FROM character_anime;
                `
                ,
      );

    res.status(200).send({
          success: true,
          message: "Berhasil ambil data!",
          data: results[0],
        });
}
  // Ambil data characeter berdasarkan ID

 , getCharaID:  (req, res)=>{
    let id = req.query.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                SELECT * FROM character_anime WHERE chara_id = ?;
                `,
        [id],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil ambil data id!",
            data: results,
          });
        }
      );
      connection.release();
    });
  }
  // Simpan data characeter
 ,addChara: async(req, res)=>{
    let data = {
      chara_name: req.body.nama,
      chara_size: req.body.ukuran,
      chara_img: req.body.img,
      accessories_id: req.body.accessories_id,
      include_id: req.body.include_id,
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                INSERT INTO character_anime SET ?;
                `,
        [data],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil tambah data!",
          });
        }
      );
      connection.release();
    });
  }
  // Update data karyawan

  ,editChara : async(req, res)=>{
    let dataEdit = {
      chara_name: req.body.nama,
      chara_size: req.body.ukuran,
      chara_img: req.body.img,
      accessories_id: req.body.accessories_id,
      include_id: req.body.include_id,
    };
    let id = req.body.chara_id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                UPDATE character_anime SET ? WHERE chara_id = ?;
                `,
        [dataEdit, id],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil edit data!",
          });
        }
      );
      connection.release();
    });
  }
  // Delete data karyawan
  , deleteDataKaryawan: async(req, res)=>{
    let id = req.body.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                DELETE FROM character_anime WHERE chara_id = ?;
                `,
        [id],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil hapus data!",
          });
        }
      );
      connection.release();
    });
  }

  ,

};
