import { SocialMediaScraper } from '../src/index';

it('Social Media Scraper for Facebook Works.', async () => {
  let facebook = [];
  const options = {
    query: 'chris lis',
    language: 'en',
    results: 10
  };
  const scraper = new SocialMediaScraper(options);
  const data = await scraper.getGoogleLinks();
  data.forEach(links => {
    if (links['title'].includes('facebook')) facebook.push(links['link']);
  });
  expect(facebook.length).toBeGreaterThan(0);
}),

it('Social Media Scraper for LinkedIn Works.', async () => {
  let linkedin = [];
  const options = {
    query: 'chris lis',
    language: 'en',
    results: 10
  };
  const scraper = new SocialMediaScraper(options);
  const data = await scraper.getGoogleLinks();
  data.forEach(links => {
    if (links['title'].includes('linkedin')) linkedin.push(links['link']);
  });
  expect(linkedin.length).toBeGreaterThan(0);
}),

it('Social Media Scraper for Twitter Works.', async () => {
  let twitter = [];
  const options = {
    query: 'chris lis',
    language: 'en',
    results: 10
  };
  const scraper = new SocialMediaScraper(options);
  const data = await scraper.getGoogleLinks();
  data.forEach(links => {
    if (links['title'].includes('twitter')) twitter.push(links['link']);
  });
  expect(twitter.length).toBeGreaterThan(0);
}),

it('Social Media Scraper for Instagram Works.', async () => {
  let instagram = [];
  const options = {
    query: 'chris lis',
    language: 'en',
    results: 10
  };
  const scraper = new SocialMediaScraper(options);
  const data = await scraper.getGoogleLinks();
  data.forEach(links => {
    if (links['title'].includes('instagram')) instagram.push(links['link']);
  });
  expect(instagram.length).toBeGreaterThan(0);
})
