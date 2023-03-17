const axios = require('axios');
const { JSDOM } = require('jsdom');
const { screen } = require('@testing-library/dom');
require('@testing-library/jest-dom');
const { getEvents } = require('../components/event');
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

  // test('event one is loaded', async () => {
  //   const dom = new JSDOM(response.data);
  //   const body = dom.window.document.querySelector('body');
  //   axios
  //     .get('https://vincentmask.github.io/UniPool/src/Events.html')
  //     .then((response) => {
  //       // Create a virtual DOM environment and parse the HTML content into a document object
  //       const dom = new JSDOM(response.data);
  //       const document = dom.window.document;

  //       dom.window.reload();

  //       // Assert that the website's HTML output matches the expected result
  //       const actualHtml = document.querySelector('div').innerHTML;
  //       expect(actualHtml).toContain('bla');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // });

  // test('Test inserting HTML code', () => {
  //   const dom = new JSDOM('<html><body><div id="Out"></div></body></html>');
  //   const document = dom.window.document;
  //   getEvents();
  //   //getEventsTest(document);
  //   // document.getEvents();

  //   // Verify that the HTML code was inserted correctly
  //   console.log(document.body.innerHTML);
  // });

  // test('event one is loaded', async () => {
  //   const dom = new JSDOM(response.data);
  //   dom.window.location.href = dom.window.location.href;
  //   const body = dom.window.document.querySelector('body');
  //   expect(body).toContain('Inclusion & Access Craft & Cozy');
  // });
});
