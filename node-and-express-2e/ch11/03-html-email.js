const nodemiler = require('nodemailer')

const credentials = require('./credentials')

const mailTransport = nodemiler.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
        user: credentials.sengrid.user,
        pass: credentials.sengrid.password,
    },
})

async function go() {
    try {
        const result = await mailTransport.sendMail({
            from: '"Meadowlark Travel" <info@meadowlarktravel.com>',
            to: 'user1@email.com',
            subject: 'Your Meadowlark Travel Tour',
            html: '<h1>Meadowlark Travel</h1>\n<p>Thanks for book your trip with ' +
              'Meadowlark Travel.  <b>We look forward to your visit!</b>',
            // text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
            //     'We look forward to your visit!',
        })
        console.log('mail sent successfully: ', result)
    } catch(err) {
        console.log('could not send mail: ' + err.message)
    }
}

go()