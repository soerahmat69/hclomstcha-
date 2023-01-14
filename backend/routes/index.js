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

//uploadfiles


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './etc/images')
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

router.get('/admin/products',VeryLogging,VeryAdmin,getChara);
router.get('/admin/products/:id',VeryLogging,VeryAdmin, chara.getCharaID);
router.post('/admin/products/chara/add',VeryLogging,VeryAdmin, chara.addChara);
router.put('/admin/products/chara/edit',VeryLogging,VeryAdmin, chara.editChara);
router.post('/admin/products/chara/delete',VeryLogging,VeryAdmin, chara.deleteChara);
router.get('/admin/user',VeryLogging,VeryAdmin,user.getUser);
router.post('/admin/user/add',VeryLogging,VeryAdmin,user.addUser);
router.put('/admin/user/edit/:user_id',VeryLogging,VeryAdmin,user.editUser);
router.post('/admin/user/delete/:user_id',VeryLogging,VeryAdmin,user.deleteUser);
router.get('/admin/profile',VeryLogging,VeryAdmin,personal_data.getProfil)
router.put('/admin/profile/edit',VeryLogging,VeryAdmin,personal_data.editProfil)
router.put('/admin/profile/password/edit',VeryLogging,VeryAdmin,personal_data.editPassword)
router.get('/admin/order/req',VeryLogging,VeryAdmin,chara_order.getReqOrderAcc)
router.get('/admin/order/acc/',VeryLogging,VeryAdmin,chara_order.getOrderAcc)
router.post('/admin/order/acc/add/:order_id',VeryLogging,VeryAdmin,chara_order.addOrderAcc)
router.put('/admin/order/acc/edit/:order_id',VeryLogging,VeryAdmin,chara_order.editOrderAcc)
router.post('/admin/order/acc/delete/:order_id',VeryLogging,VeryAdmin,chara_order.deleteOrderAcc)
router.get('/admin/personal',VeryLogging,VeryAdmin,personal_data.getPersonalUser)
router.put('/admin/personal/edit/:user_id',VeryLogging,VeryAdmin,personal_data.getPersonalUser)


// user

router.get('/products',VeryLogging,VeryUser,getChara)
router.get('/booking',VeryLogging,VeryUser,chara_booking.getBooking)
router.post('/booking/add/:chara_id',VeryLogging,VeryUser,chara_booking.addBooking)
router.get('/products/:id',VeryLogging,VeryUser,getCharaID)
// router.post('/booking/order',upload.fields([{name:"files"}]),chara_order.addOrder)
router.post('/booking/order',VeryLogging,VeryUser,upload.fields([{name: "bukti_payment"}]),chara_order.addOrder)
router.get('/datapersonal',VeryLogging,personal_data.getPersonal)
router.post('/datapersonal/add',VeryLogging,VeryUser,upload.fields([{name: "img_ktp"}, {name: "img_kk"},{name: "img_personal"}]),personal_data.addPersonal)
router.put('/datapersonal/edit',VeryLogging,personal_data.editPersonal)
router.get('/profile',VeryLogging,VeryUser,personal_data.getProfil)
router.put('/profile/edit',VeryLogging,VeryUser,personal_data.editProfil)
router.put('/profile/password/edit',VeryLogging,VeryUser,personal_data.editProfil)




module.exports = router;