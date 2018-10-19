'use strict';

const express = require('express');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == "OPTIONS") res.send(200);
  else next();
});

const page1 = require('./routes/page1');
app.use('/page1', page1);

const page2 = require('./routes/page2');
app.use('/page2', page2);

const simpleExample = require('./routes/simpleExample');
app.use('/simpleExample', simpleExample);

const page3 = require('./routes/page3');
app.use('/page3', page3);

const page4 = require('./routes/page4');
app.use('/page4', page4);

const page5 = require('./routes/page5');
app.use('/page5', page5);

const page6 = require('./routes/page6');
app.use('/page6', page6);

const page7 = require('./routes/page7');
app.use('/page7', page7);

const page8 = require('./routes/page8');
app.use('/page8', page8);

const page9 = require('./routes/page9');
app.use('/page9', page9);

const page10 = require('./routes/page10');
app.use('/page10', page10);

const page11 = require('./routes/page11');
app.use('/page11', page11);

const page12 = require('./routes/page12');
app.use('/page12', page12);

const page13 = require('./routes/page13');
app.use('/page13', page13);

const page14 = require('./routes/page14');
app.use('/page14', page14);

const page15 = require('./routes/page15');
app.use('/page15', page15);

const page16 = require('./routes/page16');
app.use('/page16', page16);

const page17 = require('./routes/page17');
app.use('/page17', page17);

const page18 = require('./routes/page18');
app.use('/page18', page18);

const page19 = require('./routes/page19');
app.use('/page19', page19);

const page20 = require('./routes/page20');
app.use('/page20', page20);

//{pages}//

const { resultData } = require('./common/utils');

app.get('/', function(req, res) {
  res.redirect('/index');
});

app.get('/index', function(req, res) {
  res.type('html');
  res.render('index');
});

app.get('/checkUser', function(req, res) {
  res.type('html');
  res.sendFile('views/checkUser.html', { root: __dirname });
});

app.get('/common/getLoginInfo', function(req, res) {
  res.type('json');
  let ret = {};

  Object.assign(ret, resultData, {
    data: 'test_user'
  });

  res.send(ret);
});

app.post('/common/getCurrentUserInfo', function(req, res) {
  res.type('json');
  let ret = {};
  
  Object.assign(ret, resultData, {
    data: {
      "pin": "testUser",
      "name": "testUser",
    }
  });

  res.send(ret);
});

app.get('/common/logout', function(req, res) {
  res.redirect('http://localhost:8080/dist/web/home.html');
});

let server = app.listen(8089, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});