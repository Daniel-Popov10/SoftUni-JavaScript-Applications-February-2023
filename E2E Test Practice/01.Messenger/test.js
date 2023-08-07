const { chromium, selectors } = require('playwright-chromium');
const { request } = require('playwright-chromium');
const { expect } = require('chai');

const options = { headless: false, slowMo: 500 };
let messengerApp = `http://127.0.0.1:5500/index.html`;


describe('Buttons test', function () {
    let browser, page;

    before(async () => browser = await chromium.launch(options));
    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());
    after(async () => await browser.close());

    it('API call for messages on refresh button', async function () {
        await page.goto(messengerApp);
        await page.click('#refresh');
        const messagePage = await page.textContent('#messages');
        expect(messagePage).to.equal('');

    });
});



