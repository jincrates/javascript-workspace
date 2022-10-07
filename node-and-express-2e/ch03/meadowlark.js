const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayoutL: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))

// about page에 포춘 쿠키를 표시해보자 (동적 콘텐츠)
const fortunes = [
    "언제나 현재에 집중할 수 있다면 행복할 것이다.",
    "절대 어제를 후회하지 마라. 인생은 오늘의 내 안에 있고 내일은 스스로 만드는 것이다.",
    "한 번의 실패와 영원한 실패를 혼동하지 마라.",
    "너무 소심하고 까다롭게 자신의 행동을 고민하지 말라. 모든 인생은 실험이다. 더 많이 실험할수록 더 나아진다.",
    "행복은 습관이다. 그것을 몸에 지녀라",
    "성공해서 만족하는 것은 아니다. 만족하고 있었기 때문에 성공한 것이다."
]

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', { fortune: randomFortune })
})

// custom 404 page
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` + 
    `press Ctrl-C to terminate.`))
