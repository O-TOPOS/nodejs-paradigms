var http = require('http');
var fs = require('fs');

//grab html first
// fetch it on our file system

function onRequest(request, response){
  response.writeHead(200, {'Content-Type':'text/html'});
  response.write('Hello World!');

  callback function
  fs.readfile('./index.html', null, function(error, data){
    if (error) {
      response.writeHead(404);
      response.write('File not found');
    } else{
      response.write(data);
    }
    response.end();
  });
}

// out-sourced function
http.createServer(onRequest).listen(8080);
