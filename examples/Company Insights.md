# Company Insights With Server-side JavaScript

Finds company details such as revenue, size, founding year, public status, etc. [Outscraper API](https://app.outscraper.cloud/api-docs#tag/Other-Services/paths/~1company-insights/get).

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
// Get information about the companies:
client.companyInsights(['outscraper.com']).then(response => {
   console.log(response);
});;
```
