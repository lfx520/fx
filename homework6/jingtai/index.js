var PORT = 8888;
var http = require('http');
var url = require('url');


var staticHandle = require('./my_modules/jingtaiHandle');

var server = http.createServer(function (req, res) {

	var pathname = url.parse(req.url).pathname;
	if (pathname !== '/favicon.ico') {
		jingtaiHandle(pathname, res);
	}
	 res.end();
});

server.listen(PORT);
console.log('Sever running at http://127.0.0.1:8888');