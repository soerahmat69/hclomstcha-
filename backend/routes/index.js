const router = require('express').Router();
const express = require('express');
const app = express();
// const { chara,login } = require('../controllers/index');
const {getChara,getUser} = require("../controllers/chara")
const {login,logout,VeryUser} = require("../controllers/auth")

router.get('/products',VeryUser,getChara);

// router.get('/product/chara', chara.getCharaID);

// router.post('/product/chara/add', chara.addChara);

// router.put('/product/chara/edit', getUser);

// router.post('/login', login);

// router.post('/logout', logout);

module.exports = router;