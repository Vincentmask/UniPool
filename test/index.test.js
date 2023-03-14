const axios = require('axios');

describe('Website title test', () => {
  it('should contain "UniPool" in the title', async () => {
    const url = 'https://vincentmask.github.io/UniPool/'; // replace with your website URL
    const response = await axios.get(url);
    const title = response.data.match(/<title>(.*?)<\/title>/)[1];
    expect(title).toContain('UniPool');
  });
});

describe('Website content test', () => {
  it('should contain "UniPool" in the title', async () => {
    const url = 'https://vincentmask.github.io/UniPool/'; // replace with your website URL
    const response = await axios.get(url);
    const title = response.data.match(/<title>(.*?)<\/title>/)[1];
    expect(title).toContain('UniPool');
  });
});
