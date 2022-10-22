const http = require('http');

var server = http.createServer((req, res) => {
   res.end("hello world");
});

server.listen(8000, () => console.log(
    `Express started on http://localhost:8000; ` +
    `press Ctrl-C to terminate.`));

