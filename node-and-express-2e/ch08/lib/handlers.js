// slightly modified version of the official W3C HTML5 email regex:
// https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
    '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
    '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')

// fake "newsletter signup" interface
class NewsletterSignup {
    constructor({ name, email }) {
        this.name = name
        this.email = email
    }
    async save() {
        // here's where we would do the work of saving to a database
        // since this method is async, it will return a promise, and
        // since we're not throwing any errors, the promise will
        // resolve successfully
    }
}

exports.api = {}

exports.home = (req, res) => res.render('home')

//
exports.newsletterSignup = (req, res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

/*
exports.newsletterSignupProcess = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}
*/
ex


exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you')
//

exports.vacationPhotoContest = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() })
}
exports.vacationPhotoContestAjax = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() })
}

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.redirect(303, '/contest/vacation-photo-thank-you')
}
exports.vacationPhotoContestProcessError = (req, res, fields, files) => {
    res.redirect(303, '/contest/vacation-photo-error')
}
exports.vacationPhotoContestProcessThankYou = (req, res) => {
    res.render('contest/vacation-photo-thank-you')
}
exports.api.vacationPhotoContest = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.send({ result: 'success' })
}
exports.api.vacationPhotoContestError = (req, res, message) => {
    res.send({ result: 'error', error: message })
}

exports.newsletter = (req, res) => {
    res.render('newsletter', { csrf: 'CSRF token goes here' })
}
exports.api.newsletterSignup = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.send({ result: 'success' })
}
//

exports.notFound = (req, res) => res.render('404')

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */