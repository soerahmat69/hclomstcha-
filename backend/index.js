const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const appRoute = require('./routes/index');
const session = require('client-sessions');
const {login,logout,signup} = require("./controllers/auth");
const RajaOngkir = require('node-rajaongkir/lib/rajaongkir').Starter("8e15bdab626fab1e79cb837fc5ba8d3a");


app.use(bodyParser.urlencoded({ extended: false }))
app.use('/etc/images', express.static('./etc/images'))

  app.use(session({
    cookieName: 'autis1',
    requestKey: 'autis',
    secret: 'first secret',
    duration: 2 * 60 * 60 * 1000, // set this to a long random string!
  }));
app.use(bodyParser.json())    


app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

//route
app.post('/login',login);
app.post('/logout',logout);
app.post('/signup',signup);
app.use('/', appRoute);

app.get('/provinsi', function (req, res) {
  RajaOngkir.getProvinces().then(function (result){
    res.send(result["rajaongkir"]["results"])
}).catch(function (error){
  res.send(error)
});
})

app.get('/kota', function (req, res) {

  RajaOngkir.getCities().then(function (result){
    res.send(result["rajaongkir"]["results"])
}).catch(function (error){
  res.send(error)
});
})

app.get('/cost/:kot', function (req, res) {
  var params = {
    origin: 151, // ID Kota atau Kabupaten Asal
    destination: req.params.kot, // ID Kota atau Kabupaten Tujuan
    weight: 1700, // Berat Barang dalam gram (gr)
    courier: 'jne' // Kurir
};
RajaOngkir.getCosts(params).then(function (result){
 
    res.send(result["rajaongkir"]["results"][0]["costs"])
}).catch(function (error){
 
    res.send(error)
});
})
//
app.get("/testing",(req,res)=>{
  res.status(200).send({
    msg: "hello world",
  })
})

app.listen(8080, ()=>{
    console.log('Server Berjalan di Port : http://localhost:8080/');
});