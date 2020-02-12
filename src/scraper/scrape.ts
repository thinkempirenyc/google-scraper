import request from 'request';
import cheerio from 'cheerio';
import getUrls from 'get-urls';
import querystring from 'querystring';
import { urlSearch, selectorSearch, SearchOptions } from './config';

export default class GoogleScraper {
  public options: SearchOptions;

  constructor(options: SearchOptions) {
    this.options = options;
  }

  /**
   * getGoogleLinks takes no arguments.
   * The return value is an array of links.
   */
  getGoogleLinks(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getHtml()
        .then(body => {
          return resolve(this.extractLinks(body));
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /**
   * getHtml takes public property `options`
   * It makes a google search request available `options`
   * The return value is a promise of html returned from the google search request
   * @param {*} options
   */
  getHtml(): Promise<any> {
    console.log(this.options);
    const option = {
      url: urlSearch(this.options)
    };
    return new Promise((resolve, reject) => {
      request(option, (err, res, body) => {
        if (err) {
          return reject(err);
        } else if (res.statusCode !== 200) {
          const error = new Error(`Unexpected status code: ${res.statusCode}`);
          // error.message = res;
          return reject(error);
        }
        return resolve(body);
      });
    });
  }

  /**
   * extractLink takes html body returned in getHtml()
   * The return value is an array of links
   * @param {*} html
   */
  extractLinks(html: string): string[] {
    let arrayLinks = []
    const $ = cheerio.load(html);
    $(selectorSearch).each((i, elem) => {
      const linkElem = $(elem).find('a');
      const item = {
        title: $(linkElem)
          .first()
          .text(),
        link: null
      };
      const qsObj = querystring.parse($(linkElem).attr('href'));
      if (qsObj['/url?q']) {
        item.link = qsObj['/url?q'];
      }
      item.title !== '' && arrayLinks.push(item);
    });
    // console.log('coming from links', arrayLinks);
    return arrayLinks;
  }

  /**
   *NOT BEING USED AT THIS TIME!!
  */
  getUris(html: string): Set<string> {
    return getUrls(html);
  }
}
