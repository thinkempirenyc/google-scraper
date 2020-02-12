# google-scraper

#Steps to use this library-
  - ```npm i @thinkempire/google-scraper```
  
  - ```import { SocialMediaScraper } from 'google-scraper';```
  
    - ```const options = {query: 'josh rahmani', language: 'en', results: 10}```
    - ```const SocialMediaLinks = new SocialMediaScraper(options)```
  
  - ```const data = await SocialMediaLinks.getGoogleLinks().  //data is a Set()```
  
