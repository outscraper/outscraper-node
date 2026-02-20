# Businesses Search With Node.js

Retrieve business records from the `/businesses` endpoint using:

- **JSON filters** (structured request), and/or
- **plain text query** (AI-powered parsing on the server side)

When both are provided:

- `filters` and `fields` are merged
- for `limit`, `cursor`, and `include_total`: **plain text has priority** if specified there

[Outscraper API Docs](https://app.outscraper.cloud/api-docs)

---

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

const client = new Outscraper('SECRET_API_KEY');
```

[Link to the profile page to create the API key](https://app.outscraper.com/profile)

## Usage

### 1) Search using JSON filters (structured)

```js
client.businessesSearch(
  {
    country_code: 'US',
    states: ['NY'],
    cities: ['New York', 'Buffalo'],
    types: ['restaurant', 'cafe'],
    has_website: true,
    has_phone: true,
    business_statuses: ['operational'],
  },
  100, // limit
  false, // includeTotal
  null, // cursor
  ['name', 'phone', 'website', 'address', 'rating', 'reviews'], // fields
  false // asyncRequest
).then(response => {
  console.log(response);
});
```

### 2) AI-powered plain text search

> [!NOTE]
> `query` is the **last argument**, so pass defaults for optional params you don't use.

```js
client.businessesSearch(
  {}, // filters (optional)
  10, // limit (optional, may be overridden by plain text)
  false, // includeTotal
  null, // cursor
  null, // fields (optional, can be merged with AI result)
  false, // asyncRequest
  false, // ui
  null, // webhook
  'Find cafes in New York, NY. Limit 25. Return name, address, phone, website, rating and reviews.'
).then(response => {
  console.log(response);
});
```

### 3) Use both JSON + plain text (merged request)

```js
client.businessesSearch(
  {
    country_code: 'US',
    states: ['NY'],
    has_website: true,
  },
  10, // default limit (plain text can override)
  false,
  null,
  ['name', 'website'], // JSON fields (merged with AI fields)
  false,
  false,
  null,
  'In Buffalo, show 50 restaurants with phone and rating. Include reviews.'
).then(response => {
  console.log(response);
});
```

### 4) Iterate over all results (auto-pagination)

```js
(async () => {
  for await (const item of client.businessesIterSearch(
    { country_code: 'US', states: ['NY'], business_statuses: ['operational'] },
    100,
    ['name', 'phone', 'address', 'rating', 'reviews'],
    false
  )) {
    console.log(item.name, item.phone);
  }
})();
```

### 5) Get business details by ID

```js
client.businessesGet(
  'YOUR_BUSINESS_ID',
  ['name', 'phone', 'website', 'address', 'rating', 'reviews'],
  false
).then(response => {
  console.log(response);
});
```
