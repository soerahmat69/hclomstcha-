const config = require("../config/database");
const mysql = require("mysql2");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getOrder: async (req, res, next) => {
    const results = await pool.promise().query(
      `
                SELECT * FROM character_order WHERE user_id = ? ;
                `,[req.autis.user_id]
    );

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },
  addOrder: async (req, res) => {
    console.log()
    let user_id = req.autis.user_id;
    const check = await pool.promise().query(
      `
                SELECT * FROM data_diri WHERE user_id = ?;
                `,
      [user_id]
    );
    if(check[0].length > 0) {
   
      if(!req.files){
     
        return res.status(200).send({
          success: true,
          message: "gagal melakukan order, pastikan bukti pembayaran telah di upload!",
        });
      }else{
      let data = {
        tgl_rental: req.body.tgl_rental,
        biaya_ongkir: req.body.biaya_ongkir,
        bukti_payment: req.files.bukti_payment[0].filename,
      };
      let xarray = req.body.order_id
      let order_id = JSON.parse("["+xarray+"]")
     
      for (const letter of order_id) {
        const results = await pool.promise().query(
          `
        UPDATE character_order SET ? WHERE order_id IN (?);
            `,
          [data, letter]
        );
      }
     
      console.log("berhasil file")
     return  res.status(200).send({
        success: true,
        message: "Berhasil melakukan order!",
      });
    }

   
    }else{
      console.log("gagal ga lengkap")
      return  res.status(500).send({ 
        success: false,
        message: "data anda tidak lengkap, harap mengisikan data diri!",}).end();
}
  },

  deleteBooking: async (req, res) => {
    let id = req.body.order_id;

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
  getReqOrderAcc: async (req, res, next) => {
    const results = await pool.promise().query(
      `
      SELECT  character_order.order_id,user.username,character_anime.chara_name,character_order.tgl_rental FROM character_order 
      INNER JOIN character_anime ON character_order.chara_id = character_anime.chara_id 
      INNER JOIN user ON character_order.user_id = user.user_id
      LEFT JOIN character_order_acc ON character_order.order_id = character_order_acc.order_id
      WHERE bukti_payment IS NOT NULL AND character_order_acc.order_id IS NULL;
                `
    );  

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },
  deleteOrderReq: async (req, res) => {
    let id = req.params.order_id;

    const results = await pool.promise().query(
      `
      DELETE FROM character_order WHERE order_id = ?;
      `,
      [id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil menolak orderan!",
      data: results[0],
    });
  },
  getAccOrderReq: async (req, res, next) => {
    const results = await pool.promise().query(
      `
      SELECT  character_order.order_id,user.username,character_anime.chara_name,user.user_id,character_order.tgl_rental FROM character_order 
      INNER JOIN character_anime ON character_order.chara_id = character_anime.chara_id 
      INNER JOIN user ON character_order.user_id = user.user_id
      LEFT JOIN character_order_acc ON character_order.order_id = character_order_acc.order_id
      WHERE bukti_payment IS NOT NULL AND character_order_acc.order_id IS NOT NULL;
                `
    );  

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },
  getOrderAcc: async (req, res, next) => {
    let user_id = req.autis.user_id
    const results = await pool.promise().query(
      `
                SELECT DATE_FORMAT(character_order.tgl_rental,"%d %M %Y") AS tgl_rental,character_anime.chara_name,character_order.order_id,status_order,DATE_FORMAT(character_order_acc.pengembalian,"%d %M %Y") AS pengembalian,character_order_acc.no_resi FROM character_order_acc
                INNER JOIN character_order ON character_order_acc.order_id= character_order.order_id 
                INNER JOIN character_anime ON character_anime.chara_id= character_order.chara_id WHERE character_order.user_id = ?;
                `,[user_id]
    );

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },
  getOrderAccList: async (req, res, next) => {

    const results = await pool.promise().query(
      `
                SELECT DATE_FORMAT(character_order.tgl_rental,"%d %M %Y") AS tgl_rental,user.username,character_anime.chara_name,character_order.order_id,status_order,DATE_FORMAT(character_order_acc.pengembalian,"%d %M %Y") AS pengembalian,character_order_acc.no_resi FROM character_order_acc
                INNER JOIN character_order ON character_order_acc.order_id= character_order.order_id 
                INNER JOIN user ON user.user_id = character_order.user_id 
                INNER JOIN character_anime ON character_anime.chara_id= character_order.chara_id
                `,
    );

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },
  getOrderAccId: async (req, res, next) => {

    const results = await pool.promise().query(
      `
                SELECT DATE_FORMAT(character_order.tgl_rental,"%d %M %Y") AS tgl_rental,user.username,character_anime.chara_name,character_order.order_id,status_order,DATE_FORMAT(character_order_acc.pengembalian,"%d %M %Y") AS pengembalian,character_order_acc.no_resi FROM character_order_acc
                INNER JOIN character_order ON character_order_acc.order_id= character_order.order_id 
                INNER JOIN user ON user.user_id = character_order.user_id 
                INNER JOIN character_anime ON character_anime.chara_id= character_order.chara_id WHERE character_order.order_id = ?
                `,[req.params.id]
    );

    
    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },
  editOrderAcc: async (req, res) => {
    let data = {
      order_id: req.params.order_id,
      no_resi: req.body.no_resi,
      pengembalian: req.body.pengembalian,
      status_order: req.body.status_order
    };
    let id = req.params.order_id;

    const results = await pool.promise().query(
      `
      UPDATE character_order_acc SET ? WHERE order_id = ?;
      `,
      [data, id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil perubahan penerimaan orderan!",
    });
  },
  addOrderAcc: async (req, res) => {
    let data = {
      order_id: req.params.order_id,
      no_resi: req.body.no_resi,
      pengembalian: req.body.pengembalian,
      status_order: req.body.status_order
    };
    const results = await pool.promise().query(
      `
      INSERT INTO character_order_acc SET ?;
      `,
      [data]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil melakukan menerima orderan!"
    });
  },
  deleteOrderAcc: async (req, res) => {
    let id = req.params.order_id;

    const results = await pool.promise().query(
      `
      DELETE FROM character_order_acc WHERE order_id = ?;
      `,
      [id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil menghapus orderan yang di terima!",
      data: results[0],
    });
  },
  addPengembalian: async (req, res) => {
    let data = {
      order_id: req.params.order_id,
      no_resi: req.body.no_resi,
      pengiriman: req.body.pengiriman,
    };
    const results = await pool.promise().query(
      `
      INSERT INTO pengembalian_barang SET ?;
      `,
      [data]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil melakukan pengembalian orderan!"

    });
  },
  getOrderRejected: async (req, res, next) => {

    const results = await pool.promise().query(
      `
                SELECT * FROM order_rejected
                INNER JOIN character_anime as w ON w.chara_id = order_rejected.chara_id 
                INNER JOIN user ON user.user_id = order_rejected.user_id
                `,[]
    );

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },
  deleteOrderRejected: async (req, res) => {
    
    const results = await pool.promise().query(
      `
      DELETE FROM order_rejected WHERE order_id = ?;
      `,
      [req.params.id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil menghapus orderan yang di terima!",
      data: results[0],
    });
  },
};
