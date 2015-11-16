(function() {

var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.all('*', function(req, res, next) {
  	res.set('Access-Control-Allow-Origin', '*');
  	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  	if ('OPTIONS' == req.method) return res.send(200);
  	next();
});


  app.use(express["static"](__dirname));

  console.log('Server started at http://localhost:8080');

  app.get('/csv',function(req,res){
        res.json({name:"Arif"}});
  });


}).call(this);
