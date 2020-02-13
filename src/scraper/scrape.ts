import fetch from 'node-fetch';
import cheerio from 'cheerio';
import querystring from 'querystring';
import {
  urlSearch,
  selectorSearch,
  SearchOptions,
  SocialMediaData,
  SocialMediaTypes
} from './config';

export default class GoogleScraper {
  public options: SearchOptions;
  constructor(options: SearchOptions) {
    this.options = options;
  }

  async getSocialMediaResults(): Promise<Array<SocialMediaData>> {
    let facebook: Array<SocialMediaData> = [],
      linkedin: Array<SocialMediaData> = [],
      instagram: Array<SocialMediaData> = [],
      twitter: Array<SocialMediaData> = [];
    const data = await this.getGoogleLinks();

    data.forEach(async links => {
      // console.log(links)
      if (links['title'].includes('facebook')) {
        facebook.push({
          url: links['link'],
          type: SocialMediaTypes.FACEBOOK,
          image: await this.getMediaImages(
            links['link'],
            SocialMediaTypes.FACEBOOK
          )
        });
      }
      if (links['title'].includes('linkedin')) {
        linkedin.push({
          url: links['link'],
          type: SocialMediaTypes.LINKEDIN,
          image: await this.getMediaImages(
            links['link'],
            SocialMediaTypes.LINKEDIN
          )
        });
      }
      if (links['title'].includes('instagram')) {
        instagram.push({
          url: links['link'],
          type: SocialMediaTypes.INSTAGRAM,
          image: await this.getMediaImages(
            links['link'],
            SocialMediaTypes.INSTAGRAM
          )
        });
      }
      if (links['title'].includes('twitter')) {
        twitter.push({
          url: links['link'],
          type: SocialMediaTypes.TWITTER,
          image: await this.getMediaImages(
            links['link'],
            SocialMediaTypes.TWITTER
          )
        });
      }
    });

    return [...facebook, ...linkedin, ...instagram, ...twitter];
  }


  async getMediaImages(
    url: string,
    type: SocialMediaTypes
  ): Promise<string | undefined> {
    let lookupT: Record<SocialMediaTypes, string>;
    lookupT[SocialMediaTypes.TWITTER] = '.ProfileAvatar-image';
    lookupT[SocialMediaTypes.LINKEDIN] = '.pv-top-card-section__photo';
    lookupT[SocialMediaTypes.FACEBOOK] =
      '._3u1 _gli > .clearfix _ikh > ._4bl7 _3-90 > ._1glk _6phc > img';
    lookupT[SocialMediaTypes.INSTAGRAM] = '._6q-tv';
    const data = await fetch(url);
    const resp = await data.text();
    const $ = cheerio.load(resp);
    return $(lookupT[type]).attr('src');
  }
  /**
   * getGoogleLinks takes no arguments.
   * The return value is an Set of links.
   */
  getGoogleLinks(): Promise<Set<Object>> {
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
  extractLinks(htmlArray: []): Set<Object> {
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
    // console.log(arrayLinks)
    return arrayLinks;
  }
}
