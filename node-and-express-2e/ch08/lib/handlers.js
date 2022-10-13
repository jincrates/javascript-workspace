// W3C HTML5 이메일 정규식 표현을 조금 수정했습니다.
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
        // 이 함수 안에 데이터베이스에 저장하는 코드가 들어갑니다.
        // 이 메서드는 비동기이므로 프라미스를 반환할 텐데, 
        // 아무 오류도 일으키지 않았으므로
        // 프라미스는 성공적으로 완수(resolve)됩니다.
    }
}

exports.api = {}

exports.home = (req, res) => {
    res.cookie('monster', 'nom nom')
    res.cookie('signed_monster', 'nom nom', { signed: true })
    res.render('home')
}

// 기존 핸들러
exports.newsletterSignup = (req, res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

exports.newsletterSignupProcess = (req, res) => {
    const name = req.body.name || '', email = req.body.email || ''
    // 입력 유효성 검사
    if(!VALID_EMAIL_REGEX.test(email)) {
            req.session.flash = {
            type: 'danger',
            intro: 'Validation error!',
            message: 'The email address you entered was not valid.',
        }
        return res.redirect(303, '/newsletter-signup')
    }

    new NewsletterSignup({ name, email }).save()
    .then(() => {
        req.session.flash = {
            type: 'success',
            intro: 'Thank you!',
            message: 'You have now been signed up for the newsletter.',
        }
        return res.redirect(303, '/newsletter-archive')
    })
    .catch(err => {
        req.session.flash = {
            type: 'danger',
            intro: 'Database error!',
            message: 'There was a database error: please try again later.',
        }
        return res.redirect(303, '/newsletter-archive')
    })
}

/*
exports.newsletterSignupProcess = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}
*/
exports.newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you')
exports.newsletterArchive = (req, res) => res.render('newsletter-archive')

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