const axios = require('axios');
const { JSDOM } = require('jsdom');
const { screen } = require('@testing-library/dom');
require('@testing-library/jest-dom');
let response;

describe('event page test', () => {
  beforeAll(async () => {
    const url = 'https://vincentmask.github.io/UniPool/src/Events.html';
    response = await axios.get(url);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    jest.resetModules();
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

  test('event one is loaded', async () => {
    const dom = new JSDOM(response.data);
    const body = dom.window.document.querySelector('body');
    expect(body).toContain('Inclusion & Access Craft & Cozy');
  });
});
