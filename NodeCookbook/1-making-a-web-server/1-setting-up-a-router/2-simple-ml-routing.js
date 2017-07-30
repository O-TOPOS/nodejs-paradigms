
var http = require('http');
var url = require('url');

// access via http://localhost:8080/?id=1

var pages = [
  { id: '1', route: '/', output: 'Home page'},
  { id: '2', route: '/about/this', output: 'multilevel routing'},
  { id: '3', route: '/about/node', output: 'another route'},
  { id: '4', route: '/anotherpage', output: function(){ return 'Here\'s ' + this.route;}}
];


http.createServer(function (request, response){
  // parsing the query string
  var id = url.parse(decodeURI(request.url), true).query.id;
  console.log(id)
  if (id) {
    pages.forEach (function(page){
      if (page.id === id) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(typeof page.output === 'function' ? page.output() : page.output);
      }
    })
  }
  if (!response.finished) {
    response.writeHead(404);
    response.write('Page not found!');
  }
}).listen(8080);
