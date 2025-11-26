# Google Directions With Server-side JavaScript

Returns directions between two points from Google Maps. [Outscraper API](https://app.outscraper.cloud/api-docs#tag/Google/paths/~1maps~1directions/get).

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
// Returns directions:
client.googleMapsDirections([
    ['29.696596, 76.994928', '30.715966244353, 76.8053887016268'],
    ['29.696596, 76.994928', '30.723065, 76.770169']
]).then(response => {
   console.log(response);
});;
```