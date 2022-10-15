// 메일 기능 캡슐화
const nodemailer = require('nodemailer')
const credentials = require('../credentials')
const htmlToFormattedText = require('html-to-formatted-text')

module.exports = credentials => {
    const mailTransport = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        auth: {
            user: credentials.sendgrid.user,
            pass: credentials.sendgrid.password,
        }
    })

    const from = '"Meadowlark Travel" <info@meadowlarktravel.com>'
	const errorRecipient = 'youremail@gmail.com'

    return {
        send: (to, subject, html) => 
            mailTransport.sendMail({
                from,
                to,
                subject,
                html,
                text: htmlToFormattedText(html),
            }),
    }
}