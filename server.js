var express = require('express')
var classify = require('./classify')
var app = express()
app.use("/", express.static(__dirname + "/App"));

app.get('/service/get/:value', function(req, res) {
	console.log(req.params.value);
	var cat = classify.find(req.params.value);
	var result = {};
	var action;
	try{
		action = require("./action/"+cat);	
	}catch(e){

	}
	if(action)result = action.response(req,req.params.value);
	res.send(result);
});

app.get('/service/learn/:value/:cat', function(req, res) {
	classify.naturalLearn(req.params.value,req.params.cat);
	res.send(response('learnt '+req.params.value+" for "+req.params.cat));
});

function response(text)
{
	return {
		text:text
	}
};

var server = app.listen(3000, function () {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)

});