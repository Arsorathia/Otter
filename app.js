(function() {

var bodyParser = require('body-parser')
var express = require('express');
var twilio = require('twilio');
var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);

var client = new twilio.RestClient('ACead2f850ad09df7cd38e6f4a7e4b48e8', '678156fdc1c3db56ee9456fb08b28084');

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

  app.get('/api',function(req,res){
    client.sms.messages.create({
          to:'+16107393399',
          from:'+12677725802',
          body:'ahoy hoy! Testing Twilio and node.js'
          }, function(error, message) {
          // The HTTP request to Twilio will run asynchronously. This callback
          // function will be called when a response is received from Twilio
          // The "error" variable will contain error information, if any.
          // If the request was successful, this value will be "falsy"
          if (!error) {
              // The second argument to the callback will contain the information
              // sent back by Twilio for the request. In this case, it is the
              // information about the text messsage you just sent:
              console.log('Success! The SID for this SMS message is:');
              console.log(message.sid);

              console.log('Message sent on:');
              console.log(message.dateCreated);
          } else {
              console.log('Oops! There was an error.');
          }
          });
        res.json({ message: 'hooray! welcome to our api!' })
  });

  app.get('/call',function(req,res){
    var resp = new twilio.TwimlResponse();

  // The TwiML response object will have functions on it that correspond
  // to TwiML "verbs" and "nouns". This example uses the "Say" verb.
  // Passing in a string argument sets the content of the XML tag.
  // Passing in an object literal sets attributes on the XML tag.
  resp.say({voice:'woman'}, 'ahoy hoy! Testing Twilio and node.js supp');

  //Render the TwiML document using "toString"
  res.writeHead(200, {
      'Content-Type':'text/xml'
  });
  res.end(resp.toString());
  });

  app.post('/message',function(req,res){

    console.log(req.body)
    var resp = new twilio.TwimlResponse();

  // The TwiML response object will have functions on it that correspond
  // to TwiML "verbs" and "nouns". This example uses the "Say" verb.
  // Passing in a string argument sets the content of the XML tag.
  // Passing in an object literal sets attributes on the XML tag.
  resp.message('ahoy hoy!');

  //Render the TwiML document using "toString"
  res.writeHead(200, {
      'Content-Type':'text/xml'
  });
  res.end(resp.toString());
  });


}).call(this);
