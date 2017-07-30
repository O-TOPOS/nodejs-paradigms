
var http = require('http');
var path = require('path');

//define routes in array object
var pages = [
  {route: '', output: 'Woohoo!'},
  {route:'about', output: 'A simple routing example'},
  //the function has access to its parent object through the 'this' variable
  {route:'anotherpage', output: function() { return 'Here\'s '  + this.route;}},
];

http.createServer(function(request,response){
  var lookup = path.basename(decodeURI(request.url));
  // you could have a switch function instead
  pages.forEach(function(page){
    if (page.route === lookup){
      response.writeHead(200, {'Content-Type':'text/html'});
      // use ternary operator ?: to conditionaly call page.output as a function
      // condition ? expr1 : expr2
      // If condition is true, the operator returns the value of expr1; otherwise, it returns the value of expr2.
      response.end(typeof page.output === 'function'
                  ? page.output() : page.output);
    }
  });
  if (!response.finished){
    response.writeHead(404);
    response.end('Page not found');
  }
}).listen(8080);
