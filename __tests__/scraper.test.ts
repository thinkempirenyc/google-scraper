import { SocialMediaScraper } from '../src/index';

jest.mock('../src/index');

it('Social Media Scraper Works.', async () => {
  const options = {
    query: 'Chris Lis is a Pussy',
    language: 'en',
    results: 10
  };
  const scraper = new SocialMediaScraper(options);
  const data = await scraper.getGoogleLinks()
  expect(data.size).toBeGreaterThan(0)
});

