const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const RedisStore = require('connect-redis')(expressSession)

const handlers = require('./lib/handlers')
const weatherMiddleware = require('./lib/middleware/weather')

const credentials = require('./credentials')
const { PromiseProvider } = require('mongoose')

require('./db')

const app = express()

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if(!this.sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser(credentials.cookieParser))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
    store: new RedisStore({
        url: credentials.redis[app.get('env')].url,
    }),
}))

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddleware)

app.get('/', handlers.home)

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup-/thank-you', handlers.newsletterSignupThankYou)

app.get('/newsletter', handlers.newsletter)
app.get('/api/newsletter-signup', handlers.api.newsletterSignup)

app.get('/contest/vaction-photo', handlers.vacationPhotoContest)
app.get('/contest/vaction-photo-ajax', handlers.vacationPhotoContestAjax)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return handlers.vacationPhotoContestProcessError(req, res, err.message)
        console.log('got fields: ', fields)
        console.log('and files: ', files)
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return handlers.api.vacationPhotoContestProcessError(req, res, err.message)
        handlers.api.vacationPhotoContest(req, res, fields, files)    
    })
})

app.get('/vacations', handlers.listVacations)
app.get('/notify-me-when-in-season', handlers.notifyWhenInSeasonForm)
app.post('/notify-me-when-in-season', handlers.notifyWhenInSeasonProcess)

app.get('/set-currency/:currency', handlers.setCurrency)

app.use(handlers.notFound)
app.use(handlers.serverError)

if(require.main === module) {
    app.listen(port, () => {
        console.log(`Express started on http://localhost:${port}` + 
        '; press Ctrl-C to terminate.')
    })
} else {
    module.exports = app
}