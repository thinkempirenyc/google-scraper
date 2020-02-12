import fetch from 'node-fetch';
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
   */
  getHtml(): Promise<any> {
    const urls = urlSearch(this.options);
    return Promise.all(
      urls.map(url => {
        return fetch(url)
          .then(res => res.text())
          .then(body => body);
      })
    );
  }

  /**
   * extractLink takes html body returned in getHtml()
   * The return value is an array of links
   * @param htmlArray
   */
  extractLinks(htmlArray: []): Set<any> {
    let arrayLinks = new Set();
    htmlArray.map(html => {
      const $ = cheerio.load(html);
      $(selectorSearch).each((i: number, elem: CheerioElement) => {
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
        item.link !== null && arrayLinks.add(item);
      });
    });
    return arrayLinks;
  }

  /**
   *NOT BEING USED AT THIS TIME!!
   */
  getUris(html: string): Set<string> {
    return getUrls(html);
  }
}
