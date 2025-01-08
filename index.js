const app = require('./app');
const http = require ('http');

const server = http.createServer(app);

server.listen (5005, () => {
    console.log('servidor corriendo');
})

