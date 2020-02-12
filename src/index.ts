// module.exports = require('./scrape');
import GoogleScraper from './scraper/scrape';

let allLinks = new Set()
const run = () => {
  ['facebook', 'linkedin', 'twitter', 'instagram'].forEach(ele => {
    const options = {
      query: 'chris lis',
      type: ele,
      language: 'en',
      results: 10
    };
    const scraper = new GoogleScraper(options);
    scraper.getGoogleLinks().then(val => [...allLinks[val]]);
  });
  console.log(allLinks)
};

run();

export { default as SocialMediaScraper } from './scraper/scrape'
