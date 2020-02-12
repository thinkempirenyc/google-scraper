// module.exports = require('./scrape');
import GoogleScraper from './scraper/scrape';

// let allLinks = new Set()
const run = () => {
  const options = {
    query: 'chris lis',
    language: 'en',
    results: 10
  };
  const scraper = new GoogleScraper(options);
  scraper.getGoogleLinks().then(val => console.log(typeof val));
};

run();

export { default as SocialMediaScraper } from './scraper/scrape'
