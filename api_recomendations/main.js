const http = require('http');
const controller = require('./controllers');
var url = require('url');

const PORT = process.env.PORT;
const HOST = '0.0.0.0';

const server = http.createServer();

server.on('request', async (req, res) => {
    const request = url.parse(req.url, true);

    if (request.pathname === '/api/products') {
        try {
            const response = await controller.getProducts(request);

            res.writeHead(200, {
                'Content-Type': 'text/json',
                'Access-Control-Allow-Origin': '*'
            });

            res.end(JSON.stringify(response));
        } catch (e) {
            res.writeHead(500, {
                'Content-Type': 'text/json',
                'Access-Control-Allow-Origin': '*'
            });

            res.end(JSON.stringify({ message: e }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({
            message: 'page not found.'
        }));
    }
});

server.listen(PORT);

console.log(`Running on http://${HOST}:${PORT}`);
