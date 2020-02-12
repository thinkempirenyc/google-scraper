import GoogleScraper from '../src/index';

jest.mock('../src/index');

// it('getGoogleLinks function exists', async () => {
//   const options = {
//     keyword: 'kevin peck facebook',
//     language: 'en',
//     results: 100
//   };
//   const scraper = new GoogleScraper(options);
//   const mockGetLinks = jest.fn();
//   scraper.getGoogleLinks()
//   // console.log(mockGetLinks)
//   // mockGetLinks.mockReturnValue(Promise.resolve(expectedProduct));

//   // const result = await productManager.getProductToManage(1);

//   // expect(result.name).toBe('football'); // It passes!
// });

// it('getHtml function exists', async () => {
//   const options = {
//     keyword: 'kevin ellerton facebook',
//     language: 'en',
//     results: 100
//   };
//   const scraper = new GoogleScraper(options);
//   const mockGetLinks = jest.fn();
//   GoogleScraper.prototype.getHtml = mockGetLinks;
// });

it('extractLink function exists', async () => {
  const options = {
    keyword: 'kevin peck facebook',
    language: 'en',
    results: 100
  };
  const scraper = new GoogleScraper(options);
  const resolved = await scraper.getGoogleLinks()
  console.log(resolved.length)
});
