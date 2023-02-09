const router = require('express').Router();
const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path')
const fs = require('fs')

const {getChara,getUser, getCharaID} = require("../controllers/chara")
const {VeryAdmin,VeryLogging,VeryUser} = require("../controllers/auth");
const chara = require('../controllers/chara');
const chara_order = require('../controllers/chara_order')
const chara_booking = require('../controllers/chara_booking')
const personal_data = require('../controllers/personal_data')
const user = require('../controllers/user')
const chat = require('../controllers/chat')
//uploadfiles


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(req.files){
      cb(null, './etc/images')
      }
    },
    filename: function (req, file, cb) {
      const uniqe = Date.now() + path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqe)
    }
  })


  
  const upload = multer({ storage: storage })
  
  function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files.filex[0].filename);
    res.json({ message: "Successfully uploaded files" });
  }
  

router.delete("/delete/:images",(req, res) => {
  const fileName = req.params.images;
  const directoryPath = "./etc/images/";
  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }
    res.status(200).send({
      message: "File is deleted.",
    });
  });
});


// admin 

router.get('/admin/products/accessories/:id',VeryLogging,VeryAdmin,chara.getAcesories);
router.post('/admin/products/accessories/add',VeryLogging,VeryAdmin,chara.addAcessories);
router.put('/admin/products/accessories/edit/:id',VeryLogging,VeryAdmin,chara.editAcessories);
router.post('/admin/products/accessories/delete/:id',VeryLogging,VeryAdmin,chara.deleteAcessories);
router.get('/admin/products',VeryLogging,VeryAdmin,getChara);
router.get('/admin/products/:id',VeryLogging,VeryAdmin, chara.getCharaID);
router.post('/admin/products/add',VeryLogging,VeryAdmin,upload.fields([{name: "chara_img"}]), chara.addChara);
router.put('/admin/products/edit/:id',VeryLogging,VeryAdmin,upload.fields([{name: "chara_img"}]), chara.editChara);
router.post('/admin/products/delete/:id',VeryLogging,VeryAdmin, chara.deleteChara);
router.get('/admin/user',VeryLogging,VeryAdmin,user.getUser);
router.post('/admin/user/add',VeryLogging,VeryAdmin,user.addUser);
router.put('/admin/user/edit/:user_id',VeryLogging,VeryAdmin,user.editUser);
router.post('/admin/user/delete/:user_id',VeryLogging,VeryAdmin,user.deleteUser);
router.get('/admin/profile',VeryLogging,VeryAdmin,personal_data.getProfil)
router.put('/admin/profile/edit',VeryLogging,VeryAdmin,personal_data.editProfil)
router.put('/admin/profile/password/edit',VeryLogging,VeryAdmin,personal_data.editPassword)
router.get('/admin/order/req',VeryLogging,VeryAdmin,chara_order.getReqOrderAcc)
router.post('/admin/order/req/delete/:order_id',VeryLogging,VeryAdmin,chara_order.deleteOrderReq)
router.get('/admin/order/acc',VeryLogging,VeryAdmin,chara_order.getAccOrderReq)
router.get('/admin/order/acc/detail/list',VeryLogging,VeryAdmin,chara_order.getOrderAccList)
router.get('/admin/order/acc/detail/:id',VeryLogging,VeryAdmin,chara_order.getOrderAccId)
router.post('/admin/order/acc/add/:order_id',VeryLogging,VeryAdmin,chara_order.addOrderAcc)
router.put('/admin/order/acc/edit/:order_id',VeryLogging,VeryAdmin,chara_order.editOrderAcc)
router.post('/admin/order/acc/delete/:order_id',VeryLogging,VeryAdmin,chara_order.deleteOrderAcc)
router.get('/admin/personal/:id',VeryLogging,VeryAdmin,personal_data.getPersonalUser)
router.post('/admin/personal/delete/:id',VeryLogging,VeryAdmin,personal_data.deletePersonalUser)
router.get('/admin/user/chat',VeryLogging,VeryAdmin,chat.getChatList)
router.get('/admin/user/chat/:id',VeryLogging,VeryAdmin,chat.getChatId)
router.post('/admin/user/chat/add/:id',VeryLogging,VeryAdmin,chat.addchatTag)
router.delete('/admin/user/chat/delete/:id',VeryLogging,VeryAdmin,chat.deleteChat)
router.get('/admin/order/reject',VeryLogging,VeryAdmin,chara_order.getOrderRejected)
router.post('/admin/reject/delete/:id',VeryLogging,VeryAdmin,chara_order.deleteOrderRejected)


router.get('/products',VeryLogging,VeryUser,getChara)
router.get('/n/products',chara.getCharaHome)
router.get('/n/product/summary',chara.getSumOrd)
router.get('/booking',VeryLogging,VeryUser,chara_booking.getBooking)
router.post('/booking/add/:chara_id',VeryLogging,VeryUser,chara_booking.addBooking)
router.get('/products/:id',VeryLogging,VeryUser,getCharaID)
router.get('/acessories/:id',VeryLogging,VeryUser,chara.getAcessoriesID)
router.post('/booking/order',VeryLogging,VeryUser,upload.fields([{name: "bukti_payment"}]),chara_order.addOrder)
router.get('/datapersonal',VeryLogging,personal_data.getPersonal)
router.post('/datapersonal/add',VeryLogging,VeryUser,upload.fields([{name: "img_ktp"},{name: "img_kk"},{name: "img_personal"}]),personal_data.addPersonal)
router.get('/profile',VeryLogging,VeryUser,personal_data.getProfil)
router.put('/profile/edit',VeryLogging,VeryUser,personal_data.editProfil)
router.put('/profile/password/edit',VeryLogging,VeryUser,personal_data.editPassword)
router.get('/chat',VeryLogging,VeryUser,chat.getChat)
router.get('/product/summary',VeryLogging,VeryUser,chara.getSumOrd)
router.post('/chat/add',VeryLogging,VeryUser,chat.addchat)
router.post('/chat/add',VeryLogging,VeryUser,chat.deleteChat)
router.get('/order/acc',VeryLogging,VeryUser,chara_order.getOrderAcc)
router.post('/pengembalian/:order_id',VeryLogging,VeryUser,chara_order.addPengembalian)




module.exports = router;