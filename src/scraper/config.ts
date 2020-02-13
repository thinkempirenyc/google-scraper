/**
 * urlSearch takes in query, language, and result size
 * The return value is a string representing an URL.
 * @param {*} language
 * @param {*} results
 * @param {*} query
 */
export const urlSearch = options => {
  const { query, language, results } = options;
  const sites = ['facebook', 'linkedin', 'twitter', 'instagram'];
  let computedQuery = '';
  const queryArr = query.split(' ');

  return sites.map(site => {
    if (queryArr.length > 1) computedQuery = `${queryArr.join('+')}+${site}`;
    else computedQuery = `${queryArr.join()}+${site}`;

    return `https://www.google.com/search?num=${results}&hl=${language}&q=${computedQuery}&oq=${computedQuery}`;
  });
};

/**
 * This is the elements in order to be able to scrape google search results
 */
export const selectorSearch = `div#main > div > div > div`;
/**
 * This is an interface for search options to be passed in by the client
 */
export interface SearchOptions {
  query: string;
  language: string;
  results: number;
}

export interface SocialMediaData {
  url: string;
  type: SocialMediaTypes;
  image?: string;
}

export enum SocialMediaTypes {
  TWITTER,
  INSTAGRAM,
  FACEBOOK,
  LINKEDIN,
}
