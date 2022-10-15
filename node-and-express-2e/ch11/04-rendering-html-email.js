const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const nodemailer = require('nodemailer')
const htmlToFormattedText = require('html-to-formatted-text')

const app = express()

const credentials = require('./credentials')

const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
    '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
    '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}))

const mailTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
        user: credentials.sendgrid.user,
        pass: credentials.sendgrid.password,
    },
})

app.post('/cart/checkout', (req, res, next) => {
    const cart = req.session.cart
    if(!cart) next(new Error('Cart does not exists.'))
    const name = req.body.name || '', email = req.body.email || ''
    
    // 입력 유효성 검사
    if(!email.match(VALID_EMAIL_REGEX))
        return res.next(new Error('Invalid email address.'))
    
    // 랜덤한 장바구니 ID를 할당합니다. 
    // 일반적으로 이런 곳에는 데이터베이스 ID를 사용합니다. 
    cart.number = Math.random().toString().reaplce(/^0].0*/, '')
    cart.billing = {
        name: name,
        email: email,
    }

    res.render('email/cart-thank-you', { layout: null, cart: cart },
    (err, html) => {
        console.log('rendered email: ', html)
        if(err) console.log('error in email template')
        mailTransport.sendMail({
            from: '"Meadowlark Travel": info@meadowlarktravel.com',
            to: cart.billing.email,
            subject: 'Thank You for Book your Trip with Meadowlark Travel',
            html: html,
            text: htmlToFormattedText(html),
        })
        .then(info => {
            console.log('sent! ', info)
            res.render('cart-thank-you', { cart: cart })
        })
        .catch(err => {
            console.error('Unable to send confirmation: ' + err.message)
        })
    })
})

app.get('*', (req, res) => {
    req.session.cart = {
        items: [
            { id: '82RgrqGCAHqCf6rA2vujbT', qty: 1, guests: 2 },
            { id: 'bqBtwqxpB4ohuxCBXRE9tq', qty: 1 },
        ]
    }
    res.render('04-home')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`))