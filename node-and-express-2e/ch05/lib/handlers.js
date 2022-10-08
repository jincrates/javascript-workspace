const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.about = (req, res) =>
  res.render('about', { fortune: fortune.getFortune() })

exports.notFound = (req, res) => res.render('404')

// 익스프레스는 매개변수가 네 개 있어야 오류 핸들러를 인식하므로
// next 매개변수는 사용하지 않더라도 그냥 둬야 합니다.
// 따라서 다음 행에 한해 ES린트의 no-unused-vars 규칙을 비활성화합니다.
/* eslint-disable-next-line no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-disable-next-line no-unused-vars */
