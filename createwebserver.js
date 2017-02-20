// examples are taken from Clements D. M., 2012, Node Cookbook, PACKT publishing

// http module required
var http = require('http');
//path module required when you want to configure different paths
var path = require('path');

// define routes of server
//pages array
var pages = [
  {route:'', output:'Woohoo!'},
  {route:'about', output:'A simple routing with Node example'},
  {route:'another page', output: function() {return 'Here\'s ' + this.route;}},
];


// version 1: simple
/*
http.createServer(function (request, response) {
  response.writeHead (200, {'Content-Type': 'text/html'});
  response.end('Woohoo!');
};
).listen(8080);
*/

http.createServer(function(request, response) {
  var lookup = path.basename(decodeURI(request.url));
  pages.forEach(function(page){
    if (page.route === lookup) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(typeof page.output === 'function'
                    ? page.output() : page.output);
    }
  });
  // 404 handling implementation
  if (!response.finished){2
    response.writeHead(404);
    response.end('Page Not Found!');
  }
}).listen(8080);


// to run type in cosnole node createwebserver.js
