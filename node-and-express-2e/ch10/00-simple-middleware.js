const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log(`processing request for ${req.url}...`)
    next()
})

app.use((req, res, next) => {
    console.log('terminating request')
    res.send('thanks for playing!')
    // next()를 호출하지 않았으므로 요청은 여기서 종료됩니다. 
})

app.use((req, res, next) => {
    console.log(`whoops, i'll never get called!`)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Express started on http://localhost:${port}` + 
    ': press Ctrl-C to terminate.'))