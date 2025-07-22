# Trustpilot Scraper With Server-side JavaScript

Returns data from Trustpilot businesses. [Outscraper API](https://app.outscraper.cloud/api-docs#tag/Businesses-and-POI/paths/~1trustpilot/get).

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
// Search data from Trustpilot businesses:
client.trustpilot(['outscraper.com']).then(response => {
   console.log(response);
});;
```
