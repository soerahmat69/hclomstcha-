const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const app = express();
const appRoute = require('./routes/index');
// const session = require('express-session');
const session = require('client-sessions');
const  mysql2 = require('mysql2/promise');
// const MySQLStore = require('express-mysql-session')(session);
// const options = require("./config/database")
const {login,logout,VeryUser} = require("./controllers/auth")


app.use(bodyParser.urlencoded({ extended: false }))

// var connection = mysql2.createPool(options);
// var sessionStore = new MySQLStore({}, connection);

// app.use(session({
//     secret: 'keyboard ',
//     resave: true,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie : {
//       secure: false
//     }
//   }));
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

app.post('/login',login);

app.get('/logout',logout);
app.get('/z',(req, res, next) => {
  req.autis.reset()
   res.status(200).send({msg : "logout"}).end()
});


// app.get('/l',(req, res, next) => {
//   username = ""
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.status(200).send({msg: "anjay"}).end()

//     next()});
// app.post('/z',(req, res, next) => {
//   req.session.destroy((err)=>{
//     // sessions = "";
//     return res.send({
//       msg : "anda telah logout "
//     })
//   // res.status(200).send({msg: "anjay"}).end()

//   //   next()
//   })});

app.use('/', appRoute);

app.listen(8080, ()=>{
    console.log('Server Berjalan di Port : http://localhost:8080/');
});