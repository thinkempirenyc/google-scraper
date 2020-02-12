/**
 * urlSearch takes in query, language, and result size
 * The return value is a string representing an URL.
 * @param {*} language
 * @param {*} results
 * @param {*} query
 */
export const urlSearch = (options) => {
  const { query, type, language, results } = options

  let computedQuery = '';
  const queryArr = query.split(' ');

  if (queryArr.length > 1) computedQuery = `${queryArr.join('+')}+${type}`
  else computedQuery = `${queryArr.join()}+${type}`

  const url = `https://www.google.com/search?num=${results}&hl=${language}&q=${computedQuery}&oq=${computedQuery}`;

  return url;
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
  type: string;
  language: string;
  results: number;
}
