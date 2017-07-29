var http = require('http');
var my_module = require('./my_module');
var my_module2 = require('./my_module2');

// anonymous functions
http.createServer(function(request, respone){
  response.writeHead(200, {'Content-Type':'text/plain'});
  response.write(my_module2.my_variable);
  my_module2.my_function();
  response.end();
}).listen(8080);
