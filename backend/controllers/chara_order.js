const config = require("../config/database");
const mysql = require("mysql2");
const { json } = require("body-parser");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getOrder: async (req, res, next) => {
    const results = await pool.promise().query(
      `
                SELECT * FROM character_order;
                `
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
                SELECT * FROM character_order WHERE bukti_payment IS NOT NULL;
                `
    );

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },
  getOrderAcc: async (req, res, next) => {
    const results = await pool.promise().query(
      `
                SELECT * FROM character_order_acc INNER JOIN character_order ON character_order_acc.order_id = character_order.order_id;
                `
    );

    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },

  editOrderAcc: async (req, res) => {
    let data = {
      estimasi_barang: req.body.estimasi_barang,
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
      estimasi_barang: req.body.estimasi_barang,
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
};
