const axios = require('axios');
const { JSDOM } = require('jsdom');
let response;
let dombody;
let dom;

describe('On Campus page test', () => {
  beforeAll(async () => {
    const url =
      'https://vincentmask.github.io/UniPool/src/On-campus%20Jobs.html';
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

  test('H2 Title is loaded', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain('On-capmus Jobs');
  });

  test('First job is load', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain(
      'Front desk position: Portland State advising center'
    );
  });

  test('Last job is load', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain('Student Employee Kitchen Aide- work study');
  });

  test('Middle job is load', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain('Student Maintenance Worker');
  });
});
