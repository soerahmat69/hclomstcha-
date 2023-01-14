const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const appRoute = require('./routes/index');
const session = require('client-sessions');
const  mysql2 = require('mysql2/promise');
const {login,logout,signup} = require("./controllers/auth");


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

//

app.listen(8080, ()=>{
    console.log('Server Berjalan di Port : http://localhost:8080/');
});