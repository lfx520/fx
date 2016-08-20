'use strict';
var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var testDB = require('./connect.js');
var crypto = require('crypto');
var session = require('session');

function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};


/*app.use(session({
    secret: 'hubwiz app', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));*/

/*app.get('/', function (req, res) {
    let username = req.session.username; 

    testDB.query('SELECT * FROM views', (err, rows) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {userName: username, publish: rows, count: rows.length});
        }
    });
});
*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./views'));
app.set('view engine', 'hbs');


app.post('/sign', function(req, res) {
    let name = req.body.username;
    let password = req.body.password;
  
    /*let secret = md5(password);*/
    testDB.query('INSERT INTO test SET ?', {id: null ,username: name, password: password }, function (err, rows) {
        if(err) {
            console.log(err);
        } else {
            console.log(rows);
            
            res.end('注册成功');
        }
    });


  

});
app.post('/login', function(req, res) {
    let name = req.body.username;
    let password = req.body.password;
    let secret = md5(password);

    testDB.query('SELECT username, password FROM test WHERE username = ?', [name], function(err, rows) {
        if(err) {
            console.log(err);
        } else {
            if(rows[0].password === secret) {
                req.session.username = username;
                res.end('登录成功');
            }
        }
    });
});

/*app.all('/', function(req, res) {
    res.end('all');
})
*/

app.post('/comment', function (req, res) {
    let words = req.body.publish;
    let username = req.session.username; 

    testData.query('INSERT INTO publish SET ?', {id: null, publish: words, username: username}, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            // console.log(rows);
            res.redirect('http://localhost:3000/');
        }
    });
});

let server = http.createServer(app);
server.listen(3000);
console.log('server run at http://127.0.0.1:3000;');
