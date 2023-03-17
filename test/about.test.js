const axios = require('axios');
const { JSDOM } = require('jsdom');
let response;
let dombody;
let dom;

describe('About page test', () => {
  beforeAll(async () => {
    const url = 'https://vincentmask.github.io/UniPool/src/about.html';
    response = await axios.get(url);
    dom = new JSDOM(response.data);
    dombody = dom.window.document.querySelector('body');
  });

  test('should contain "UniPool" in the title', async () => {
    const title = response.data.match(/<title>(.*?)<\/title>/)[1];
    expect(title).toContain('UniPool');
  });

  test('page has a favicon', async () => {
    const faviconElement =
      dom.window.document.querySelector('link[rel="icon"]');
    expect(faviconElement.getAttribute('href')).toBe(
      '/UniPool/images/favicon.ico'
    );
  });

  test('header is loaded', async () => {
    const header = dom.window.document.querySelector('header-component');
    expect(header).not.toBeNull();
  });

  test('Greeting message is loaded', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain('Unipool is on a mission');
  });

  test('Email is included', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain('haosheng@pdx.edu');
  });

  test('both github links included', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain('https://github.com/imOnVacation');
    expect(body).toContain('https://github.com/Vincentmask');
  });

  test('both linkedin links included', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain('https://www.linkedin.com/in/leshi-chen-722768198/');
    expect(body).toContain(
      'https://www.linkedin.com/in/haosheng-liang-840461222/'
    );
  });

  test('page has a background image', async () => {
    const dom = new JSDOM(response.data);
    const bodyElement = dom.window.document.querySelector('body');
    const backgroundImageStyle = dom.window
      .getComputedStyle(bodyElement)
      .getPropertyValue('background-image');
    expect(backgroundImageStyle).not.toBe('none');
  });
});
