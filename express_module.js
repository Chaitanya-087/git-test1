const express = require('express');
const http = require('http');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 8080;

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<html><body><p>This is express server</p></body></html>');
    res.end();
});



const server = http.createServer(app);

server.listen(port,hostname,()=>{
    console.log(`server is running at http://${hostname}:${port}`);
});