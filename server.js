const http = require('http');
const users = require('./data/users.json');
const { createUser, searchUser } = require('./controller/userController')

const server = http.createServer((req, res) => {
    if(req.url === '/api/users' && req.method === 'GET') {
        res.writeHeader(200, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify(users));
    } else if (req.url.match(/\/api\/users\/([a-z]+)/) && req.method === 'GET') {
        const name = req.url.split('/')[3]
        searchUser(req,res,name);
    } else if (req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res);
    } else {
        res.writeHeader(404, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }    
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log('server listening'))