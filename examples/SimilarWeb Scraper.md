# SimilarWeb Scraper With Server-side JavaScript

Returns website analytics data including traffic, rankings, audience insights, and competitive intelligence from SimilarWeb [Outscraper API](https://app.outscraper.cloud/api-docs#tag/Domain-Related/paths/~1similarweb/get).

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
// Get data from Similarweb businesses:
client.similarweb(['apple.com']).then(response => {
   console.log(response);
});;
```
