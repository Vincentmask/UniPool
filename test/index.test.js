const axios = require('axios');
const { JSDOM } = require('jsdom');
const { screen } = require('@testing-library/dom');
require('@testing-library/jest-dom');
let response;

describe('index page test', () => {
  beforeAll(async () => {
    const url = 'https://vincentmask.github.io/UniPool/';
    response = await axios.get(url);
  });

  test('should contain "UniPool" in the title', async () => {
    const title = response.data.match(/<title>(.*?)<\/title>/)[1];
    expect(title).toContain('UniPool');
  });

  test('page has a favicon', async () => {
    const dom = new JSDOM(response.data);
    const faviconElement =
      dom.window.document.querySelector('link[rel="icon"]');
    expect(faviconElement.getAttribute('href')).toBe(
      '/UniPool/images/favicon.ico'
    );
  });

  test('header is loaded', async () => {
    const dom = new JSDOM(response.data);
    const header = dom.window.document.querySelector('header-component');
    expect(header).not.toBeNull();
  });

  test('page has a background image', async () => {
    const dom = new JSDOM(response.data);
    const bodyElement = dom.window.document.querySelector('body');
    const backgroundImageStyle = dom.window
      .getComputedStyle(bodyElement)
      .getPropertyValue('background-image');
    expect(backgroundImageStyle).not.toBe('none');
  });

  test('should contain Page content', async () => {
    const text = response.data.match(/<h2 class="fw-light">(.*?)<\/h2>/);
    expect(text).toContain('Page Content');
  });
});
