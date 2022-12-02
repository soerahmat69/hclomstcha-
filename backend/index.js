const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const appRoute = require('./routes/index');
app.use('/', appRoute);

app.listen(8080, ()=>{
    console.log('Server Berjalan di Port : http://localhost:8080/');
});