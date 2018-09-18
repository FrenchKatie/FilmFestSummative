// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const data = require('./data/film-data.json');
// const qs = require('querystring');
// const cors = require('cors');
//
// var server = http.createServer(function(request, response){
//   console.log(`${request.method} request for ${request.url}`);
//
//   if(request.method === 'GET'){
//     // var page;
//   if(request.url === '/films' || request.url === '/films.html'){
//
//       // return html file
//       fs.readFile('films.html', 'UTF-8', function(error, contents){
//         if (error){
//           console.log(error);
//         } else{
//           response.writeHead(200, {'content-Type':'text/html'});
//           response.end(contents);
//         }
//       });
//
//     } else if(request.url === '/filmData'){
//
//       // return data
//       response.writeHead(200, {'Content-Type': 'text/json'});
//       response.end(JSON.stringify(data));
//
//     } else if(request.url.match(/.js$/)){
//         var jsPath = path.join(__dirname, '../app/src/js', request.url);
//         var fileStream = fs.createReadStream(jsPath, 'UTF-8');
//         response.writeHead(200, {'Content-Type': 'text/javascript'});
//         fileStream.pipe(response);
//     }
//
//   }
//
// });
// server.listen(5000);
//
// console.log('Server is running on port 5000');

// react-node project

const express = require('express');
const filmData = require('./data/film-data.json');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/films', function(req,res){
    res.json(filmData);
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function(){
    console.log('Server is running on port '+app.get('port'));
  });
