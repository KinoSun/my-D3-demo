var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var multer = require('multer');
var cookieParser = require('cookie-parser');

app.use(express.static('public'));
app.use(urlEncodedParser);
app.use(multer({dest: '/tmp/'}).array('image'));
app.use(cookieParser());


app.get('/', function(req, res){
  res.send('Hello World');
  console.log("Cookie:", req.cookies);

});

app.get('/listFile.html', function(req, res){
  res.sendFile(__dirname+"/"+"listFile.html");
});

app.get('/process_get', function(req, res){
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };

  console.log(response);
  res.end("GET:" + JSON.stringify(response));
});

app.post('/process_post', function(req, res){
  response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name
  };

  console.log(response);
  res.end("POST:" + JSON.stringify(response));
});

app.post('/visu_file', function(req, res){

  var des_file = __dirname + "/data/" + req.body.file_name;
  console.log(req.body.file_name);
  res.sendFile(des_file);

});

app.post('/file_upload', function(req, res){

  console.log(req.files[0]);
  var des_file = __dirname + "/" + req.files[0].originalname;
  fs.readFile(req.files[0].path, function(err, data){
    fs.writeFile(des_file, data, function(err){
	  if(err){
	    console.log(err);
	  }else{
	    response = {
		  message: 'File uploaded success',
		  filename: req.files[0].originalname
		};
		console.log(response);
		res.end(JSON.stringify(response));
	  };
	});
  
  });



});


var server = app.listen(8081, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("���ص�ַΪ http://%s:%s", host, port);
});