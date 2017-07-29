
*Setup express with generator*

sudo npm install -g express-generator

go to folder with cd

express 4ExpressFirstApp

/bin/www is the server , change port

run npm to get all depedencies (node modules folder)

go to folder with cd
and run   npm install
installs everything specified in package.json

to run the server go to bin folder and run node /bin/www to start the server

start the server npm start (defined in package.json)


###WWW - SERVER FILE
* app file setups the express application
* port - initialise port method : it parses a string into a number , get port from environment variables
* creating the server and passing express app as the handler of all tasks

### APP.JS - EXPRESS APP
* default routes
* create app = express() and then configure
* setup access to public folder (static files)
* setup two routes (setup as variables) - determine who handles the request according to path
* catch 404 error
* next(err)

###JADE - TEMPLATING/ VIEW ENGINE
* setup which templating engine to use -> jade
* which views to use = indicate folder
* the jade files in this foldered will be compiled to html

* whitespaces handling the objects
