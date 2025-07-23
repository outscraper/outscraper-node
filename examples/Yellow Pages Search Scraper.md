# Yellow Pages Search Scraper With Server-side JavaScript

Returns search results from Yellow Pages. [Outscraper API](https://app.outscraper.cloud/api-docs#tag/Businesses-and-POI/paths/~1yellowpages-search/get).

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
// Search results from Yellow Pages:
client.yellowpagesSearch(['restaurants']).then(response => {
   console.log(response);
});;
```
