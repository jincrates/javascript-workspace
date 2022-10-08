const express = require('express')
const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')
const fortune = require('./lib/fortune.js')

const app = express()

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)

app.get('/about', handlers.about)

// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)

// require.main이 전역 module과 일치하면 노드에서 자바스크립트 파일을 직접 실행하고, 그렇지 않다면 다른 스크립트로 임포트한다.
if(require.main === module) {
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port}; ` + 
        `press Ctrl-C to terminate.`))
} else {
    module.exports = app
}

