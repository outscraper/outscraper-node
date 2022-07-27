# Phone Numbers Enricher/Validator With Server-side JavaScript

Returns phones carrier data (name/type), validates phones, ensures messages deliverability via [Outscraper API](https://app.outscraper.com/api-docs#tag/Phones/paths/~1phones-enricher/get).

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
// Get information about the phone number:
client.phonesEnricher(['12812368208']).then(response => {
   console.log(response);
});;
```
