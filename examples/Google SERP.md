# Google Search Results Scraper With Server-side JavaScript

The library returns search results from Google based on a given search query via [Outscraper API](https://app.outscraper.com/api-docs#tag/Google-Search).

## Installation

Install the package with:
```bash
npm install outscraper --save
# Or
yarn add outscraper
```

[Link to the NPM package page](https://www.npmjs.com/package/outscraper)

## Initialization
```js
const Outscraper = require('outscraper');
// Or using ES modules:
import Outscraper from 'outscraper';

let client = new Outscraper('SECRET_API_KEY');

```
[Link to the profile page to create the API key](https://app.outscraper.com/profile)

## Usage

```js
// Search for SERP results:
client.googleSearch(['buy iphone 13 TX'], language='en', region='us').then(response => {
   console.log(response);
});
```
