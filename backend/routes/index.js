const router = require('express').Router();
const { chara,login } = require('../controllers');

// GET localhost:8080/chara => Ambil data semua chara
router.get('/', chara.getChara);

// GET localhost:8080/chara/2 => Ambil data semua chara berdasarkan id = 2
router.get('/chara', chara.getCharaID);

// POST localhost:8080/chara/add => Tambah data chara ke database
router.post('/add', chara.addChara);

// POST localhost:8080/chara/2 => Edit data chara
router.put('/edit', chara.editChara);

router.post('/login', login.getUser);
// POST localhost:8080/chara/delete => Delete data chara
// router.delete('/chara/delete/', chara.deleteChara);

module.exports = router;