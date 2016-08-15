
var fs = require('fs');
var url = require('url');
var path = require('path');
var types = require('./types').types;

function jingtaiHandle (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filename = path.resolve(__dirname, '../' + './public' + pathname);
    console.log(filename);
    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('This request URL ' + filename + ' was not found');
            response.end();
        } else {
            fs.readFile(filename, 'binary', function (err, file) {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'text/plain'  });
                    response.end('' +err);
                } else {
                    response.writeHead(200, { 'Content-Type': types[path.extname(pathname)] });
                    response.end(file, 'binary');
                }
            })
        }
    });
}
module.exports = jingtaiHandle ;