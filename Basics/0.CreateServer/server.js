var http = require('http');

function onRequest(request, response){
  response.writeHead(200, {'Content-Type':'text/plain'});
  response.write('Hello World!');
  response.end();
}

// out-sourced function
http.createServer(onRequest).listen(8080);
