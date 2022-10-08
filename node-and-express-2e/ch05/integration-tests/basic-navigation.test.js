const portfinder = require('portfinder')
const puppeteer = require('puppeteer')

const app = require('../meadowlark.js')

let server = null
let port = null

beforeEach(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

test('home page links to about page', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    //Promise.all을 통해 경쟁 상태(race condition)를 방지
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]'),
    ])
    expect(page.url()).toBe(`http://localhost:${port}/about`)
    await browser.close()
})