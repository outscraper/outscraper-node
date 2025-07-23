# Trustpilot Reviews Scraper With Server-side JavaScript

Returns reviews from Trustpilot businesses. In case no reviews were found by your search criteria, your search request will consume the usage of one review.[Outscraper API](https://app.outscraper.cloud/api-docs#tag/Reviews-and-Comments/paths/~1trustpilot~1reviews/get).

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
// Get information about the reviews from Trustpilot:
client.trustpilotReviews(['https://www.trustpilot.com/review/outscraper.com']).then(response => {
   console.log(response);
});;
```
