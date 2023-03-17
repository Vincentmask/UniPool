const axios = require('axios');
const { JSDOM } = require('jsdom');
let response;
let dombody;
let dom;

describe('About page test', () => {
  beforeAll(async () => {
    const url = 'https://vincentmask.github.io/UniPool/src/Campus%20Map.html';
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

  test('Title is loaded', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain('Campus Map');
  });

  test('Map is loaded', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain('/UniPool/images/map.png');
  });

  test('Linked to interactive map', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain(
      'https://map.pdx.edu/?center=45.507598639898326,-122.6846902817488'
    );
  });

  test('Part of the buildings', async () => {
    const body = dombody.innerHTML;
    expect(body).toContain('<p>SEC - Science &amp; Education Center</p>');
    expect(body).toContain(
      '<p>HGCDC - Helen Gordon Child Development Center</p>'
    );
    expect(body).toContain('<p>RLSB - Robertson Life Sciences Building</p>');
    expect(body).toContain(
      '<p>Viking Pavilia - Viking Pavilion at the Peter W. Stott Center</p>'
    );
    expect(body).toContain('<p>PS1 - Parking Structure 1</p>');
  });
});
