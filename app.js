const express = require('express'),
    fileUplode = require('express-fileupload'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    path = require('path'),
    app = express(),
    fileUpload = require('express-fileupload'),
    fs = require("fs"),
    port = 5050;
app.use(fileUplode());


app.set('port', process.env.port || port);
app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: false
})); // url 
app.use(bodyParser.json()); // parse data from client as json
app.use(express.static(path.join(__dirname,'public')));
app.use('/public', express.static('public'));


// Configuer Routes For Products App 

const {mainPage} = require('./routes/index');
const {addProductPage,addProduct,editProductPage,editProduct,deleteProduct} = require('./routes/products');
app.get('/',mainPage);
app.get('/add',addProductPage);
app.post('/add',addProduct);
app.get('/edit/:id', editProductPage);
app.post('/edit/:id', editProduct);
app.get('/delete/:id', deleteProduct);
//Create Connection to mysql database 
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'product'
});
db.connect((err)=>{
    if(err)
      throw err;
      console.log('connection happy');
});
// able to use to any file 
global.db = db;
app.listen(port,()=>{console.log(`server running ${port}`)});