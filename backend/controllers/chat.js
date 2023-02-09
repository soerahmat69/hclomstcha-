const config = require("../config/database");
const mysql = require("mysql2");
const { json } = require("body-parser");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getChat: async (req, res, next) => {
    
    const results = await pool.promise().query(
      `
                SELECT * FROM chat 
                LEFT JOIN order_rejected ON order_rejected.order_id = chat.warn_chat
                LEFT JOIN character_anime ON order_rejected.chara_id = character_anime.chara_id
                WHERE chat.user_id IN (?);
                `,[req.autis.user_id]
    );

    res.status(200).send({
      success: true,
      message: "Berhasil menampilkan chat!",
      data: results[0],
    });
  },
  getChatId: async (req, res, next) => {
    
    const results = await pool.promise().query(
      `
      SELECT * FROM chat 
      LEFT JOIN order_rejected ON order_rejected.order_id = chat.warn_chat
      LEFT JOIN character_anime ON order_rejected.chara_id = character_anime.chara_id
      WHERE chat.user_id IN (?);
                `,[req.params.id]
    );

    res.status(200).send({
      success: true,
      message: "Berhasil menampilkan chat!",
      data: results[0],
    });
  },
  getChatList: async (req, res, next) => {
    
    const results = await pool.promise().query(
      `
      SELECT * FROM chat 
      INNER JOIN user ON user.user_id = chat.user_id WHERE id_chat IN(SELECT MAX(id_chat) FROM chat GROUP BY user_id)GROUP BY chat.user_id;
      `,[req.params.id,req.autis.user_id]
    );

    res.status(200).send({
      success: true,
      message: "Berhasil menampilkan chat!",
      data: results[0],
    });
  },
  addchat: async (req, res) => {
    let data = {
      user_id: req.autis.user_id,
      chat: req.body.chat,
      tag_user_id: req.body.tag_user_id,
      last_chat: "t"
    };
    const results = await pool.promise().query(
      `
      INSERT INTO chat SET ?+ NOW();
      `,
      [data]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil menambah chat!"
    });
  },  addchatTag: async (req, res) => {
    let data = {
      user_id: req.params.id,
      chat: req.body.chat,
      tag_user_id: req.autis.user_id,
      last_chat: "t"
    };
    const results = await pool.promise().query(
      `
      INSERT INTO chat SET ?+ NOW();
      `,
      [data]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil menambah chat!"
    });
  },

  // Delete data character
  deleteChat: async (req, res) => {
    let id = req.params.id;
    const results = await pool.promise().query(
      `
      DELETE FROM chat WHERE user_id = ?;
      `,
      [id]
    );
    res.status(200).send({
      success: true,
      message: "Berhasil hapus chat!"
    });
  },
};
