import GoogleScraper from './scraper/scrape';

const run = async () => {
  const options = {
    query: 'chris jang',
    language: 'en',
    results: 10
  };
  const scraper = new GoogleScraper(options);
  const data = await scraper.getSocialMediaResults();
  console.log(data)
};

run()

export { default as SocialMediaScraper } from './scraper/scrape';
