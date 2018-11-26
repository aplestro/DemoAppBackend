const listenAplestro = require('./src/listenAplestro')
const configs = require('./src/configs')
const requestHandlers = require('./src/requestHandlers')

var express = require('express');
var app = express();
app.use(express.static('web'));
var http = require('http').Server(app);
var port = process.env.PORT || configs.PORT;
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ extended: false, limit: '5mb' })
var urlencodedParser = bodyParser.urlencoded({ extended: false, limit: '5mb' })

app.get('/', function(req, res) {
	res.render(__dirname + '/web/index.html', {}, function(err, html) {
	  res.send(html);
	});	
});

app.get('/channel/*', function(req, res) {
	res.render(__dirname + '/web/index.html', {}, function(err, html) {
	  res.send(html);
	});	
});

app.post('/listen', urlencodedParser, function(req, res) {
	listenAplestro(req, res)	
});

app.post('/newChannel', jsonParser, function(req, res){
	requestHandlers.createNewChannel(req,res)
})

app.post('/editChannel', jsonParser, function(req, res){
	requestHandlers.editChannel(req,res)
})

app.post('/createNewMessage', jsonParser, function(req, res){
	requestHandlers.createNewMessage(req,res)
})

app.post('/requestUserInfo', jsonParser, function(req, res){
	requestHandlers.requestUserInfo(req,res)
})

app.post('/requestServerUserInfo', jsonParser, function(req, res){
	requestHandlers.requestServerUserInfo(req,res)
})

app.post('/createNewResource', jsonParser, function(req, res){
	requestHandlers.createNewResource(req,res)
})

http.listen(port, function() {
    console.log('listening on *: ' + port);
});