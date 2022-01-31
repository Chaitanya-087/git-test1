const path = require('path');
const fs = require('fs');
const http = require('http');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) =>{
    var fileUrl;
    if(req.url == '/') fileUrl = '/index.html'
    else fileUrl = req.url
    var filePath = path.resolve('./public' + fileUrl);
    var fileext = path.extname(filePath);
    if(fileext == '.html'){
        fs.exists(filePath,(exists)=>{
            if (!exists) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><body><h1>Error 404: ' + fileUrl + 
                            ' not found</h1></body></html>');
                return;
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/html');
              fs.createReadStream(filePath).pipe(res);
            });
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.write(`<html><body><h1>ERROR: 404 ${fileUrl} is not html file</h1></body></html>`);
        res.end();
    }

});

server.listen(port,hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`);
});