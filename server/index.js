// const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const data = require('./data/film-data.json');
const qs = require('querystring');
// const cors = require('cors');

// const app = express();

// app.use(cors());
//
// app.use(function(req, res, next){
//   console.log(`${req.method} request for ${req.url}`);
//   next();
// });
//
// app.get('/getjson', function(req, res){
//   res.json(data);
// });
//
// app.set('port', (process.env.PORT || 5000));
// app.listen(app.get('port'), function(){
//   console.log(`Server is running on port ${app.get('port')}`)
// });

var server = http.createServer(function(request, response){
    console.log(`${request.method} request for ${request.url}`);

    if(request.method === "GET"){
        if(request.url === "/"){
            fs.readFile('server_test.html', 'UTF-8', function(error, contents){
                if(error){
                    console.log("error, something went wrong");
                } else {
                    response.writeHead(200, {'Content-Type':'text/html'});
                    response.end(contents);
                }
            });
        }
    }

});
server.listen(3000);

console.log('Server is running on port 3000');
