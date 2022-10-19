const mysql = require('mysql')
const conn = {
    host: 'localhost',
    user: 'micro',
    password: 'service',
    database: 'monolithic'
}

/**
 * 상품 관리의 각 기능별 분기
 */
exports.onRequest = function (res, method, pathname, params, cb) {
    
    switch (method) {
        case "POST":
            return register(method, pathname, params, (response) => { process.nextTick(cb, res, response) })
        case "GET":
            return inquiry(method, pathname, params, (response) => { process.nextTick(cb, res, response) })
        case "DELETE":
            return unregister(method, pathname, params, (response) => { process.nextTick(cb, res, response) })
        default:
            return process.nextTick(cb, res, null)
    }
} 

function register(method, pathname, params, cb) {
    
}