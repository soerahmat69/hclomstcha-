const config = require("../config/database");
const mysql = require("mysql2");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  //get chara index
  getPersonal: async (req, res, next) => {
    let user_id = req.autis.user_id;
    const results = await pool.promise().query(
      `
                SELECT * FROM data_diri WHERE user_id = ?;
                `,
      [user_id]
    );
    if(results[0].length > 0) {
      return res.status(200).send({ 
        success: true,
        message: "data anda lengkap!",
      data: results[0]}).end();
       
    }else{
      return res.status(401).send({ 
        success: true,
        message: "data anda tidak lengkap!",}).end();
    }
    

  },
  // Simpan data characeter

  addPersonal: async (req, res) => {
    if(!req.files.img_ktp || !req.files.img_kk || !req.files.img_personal){ 
     return res.status(500).send({
      success: false,
      message: "gagal upload!, pastikan semua foto telah di upload",
    });}else{
    let data = {
      user_id : req.autis.user_id,
      akun_sos: req.body.akun_sos,
      no_wa: req.body.no_wa,
      no_sdr: req.body.no_sdr,
      address: req.body.address,
      img_ktp: req.files.img_ktp[0].filename,
      img_personal: req.files.img_personal[0].filename,
      img_kk: req.files.img_kk[0].filename,
    };
    const results = await pool.promise().query(
      `
        INSERT INTO data_diri SET ?;
        `,
      [data]
    );
    return res.status(200).send({
      success: true,
      message: "Berhasil tambah data diri!",
    });
  }
  },
  getProfil: async (req, res, next) => {
    let user_id = req.autis.user_id;

    const results = await pool.promise().query(
      `
                SELECT user_id,role,username,email FROM user WHERE user_id = ?;
                `,
      [user_id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil ambil data!",
      data: results[0],
    });
  },
  editProfil: async (req, res, next) => {
    let user_id = req.autis.user_id;
    let data = {
      username: req.body.username,
      email: req.body.email,
    };
    const results = await pool.promise().query(
      `
                UPDATE user SET ?  WHERE user_id = ?;
                `,
      [data,user_id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil ubah data profile!",
    });
  },
  editPassword: async (req, res, next) => {
    let user_id = req.autis.user_id;
    let data = {
      password: req.body.password,
    };
    const results = await pool.promise().query(
      `
                UPDATE user SET ?  WHERE user_id = ?;
                `,
      [data,user_id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil ubah katasandi!",
    });
  },
  getPersonalUser: async (req, res, next) => {
  
    const results = await pool.promise().query(
      `
                SELECT * FROM data_diri WHERE user_id = ?
                `,[req.params.id]
    );

    if(results.length < 0) {
      return res.status(500).send({
        success: true,
        message: "data tidak lengkap!",
        
      }).end();
    }else{
    return  res.status(200).send({ 
      success: true,
      message: "data anda lengkap!",
      data : results[0]});
    
    }

  },
  deletePersonalUser: async (req, res, next) => {

    const results = await pool.promise().query(
      `
                DELETE FROM data_diri WHERE user_id = ? ;
                `,[req.params.id]
    );

      res.status(200).send({ 
      success: true,
      message: "berhasil menghapus data diri",
      data : results[0]});
    
    

  },
  
  
  
};
