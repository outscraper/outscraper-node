# Using Enrichments With Server-side JavaScript

Using enrichments with [Outscraper API](https://app.outscraper.com/api-docs).

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
# Enriching data from Google Maps with Emails & Contacts Scraper and validating emails:
client.googleMapsSearch(
  ["bars ny usa"],
  limit=10, // limit of palces per each query
  language='en',
  region='US',
  skip=0,
  dropDuplicates=false,
  enrichment=['domains_service', 'emails_validator_service']
).then(response => {
  response.forEach(queryPlaces => {
    queryPlaces.forEach(place => {
      console.log('name: ', place);
    });
  });
});
```
