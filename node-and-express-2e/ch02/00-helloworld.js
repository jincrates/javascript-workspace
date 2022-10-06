const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000

function serveStaticFile(res, path, contentType, responseCode = 200) {
    
    /*
    fs.readFile()은 파일을 비동기적으로 읽는 메서드입니다. 
    fs.readFile 함수는 콜백이라 부르는 패턴을 사용합니다. 
    함수를 호출할 때 콜백 함수를 전달하면, 함수가 실행을 마쳤을 때 콜백 함수가 호출됩니다. 
    */
    /*
    __dirname은 현재 실행중인 스크립트가 존재하는 디렉터리입니다. 
    */
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, { 'Content-Type': contentType })
        res.end(data)
    })
}

const server = http.createServer((req, res) => {
    // 쿼리스트링, 옵션인 마지막 슬래시를 없애고 소문자로 바꿔서 url을 정규화합니다.
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLocaleLowerCase()
    switch(path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html')
            break
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html')
            break
        case '/img/log.png':
            serveStaticFile(res, '/public/img/logo.png', 'image/png')
            break
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404)
            break
    }
})

server.listen(port, () => console.log(`server started on port ${port}; ` + 
'press Ctrl-C to terminate...'))