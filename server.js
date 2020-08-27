const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5000;
const hostname = 'localhost'

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Serving Resources at http://${hostname}:${port}/`)
});