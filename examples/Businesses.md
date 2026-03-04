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

### 1.1) Search with enrichments

`enrichments` lets you request additional datasets (for example, Contacts & Leads or Company Insights) alongside business results.

#### Recommended (object format)

```js
client.businessesSearch(
  {
    country_code: 'US',
    states: ['NY'],
    types: ['restaurant', 'cafe'],
    business_statuses: ['operational'],
  },
  25, // limit
  false, // includeTotal
  null, // cursor
  ['name', 'website', 'phone'], // fields
  false, // asyncRequest
  false, // ui
  null, // webhook
  null, // query
  {
    contacts_n_leads: {
      contacts_per_company: 3,
      emails_per_contact: 1,
    },
    company_insights: {},
  } // enrichments
).then(response => {
  console.log(response);
});
```

#### Collect parameters in one JSON object

If you already have the request parameters in one JSON object (for example, loaded from a file), you can map them to the positional arguments:

```js
const params = {
  filters: {
    country_code: 'US',
    states: ['CA', 'NY'],
    types: ['restaurant', 'cafe'],
  },
  limit: 25,
  cursor: null,
  include_total: false,
  fields: ['name', 'types', 'address', 'country', 'website', 'phone', 'rating', 'reviews'],
  enrichments: {
    contacts_n_leads: { contacts_per_company: 4, emails_per_contact: 2 },
    company_insights: {},
  },
  query:
    'Find hotels in California and Illinois with rating 4.2+ and status operational. ' +
    'Return fields: name, address, rating and reviews. Limit results to 6. ' +
    'Enrich data with contacts_n_leads. Contact per company set to 8',
};

client.businessesSearch(
  params.filters,
  params.limit,
  params.include_total,
  params.cursor,
  params.fields,
  false, // asyncRequest
  false, // ui
  null,  // webhook
  params.query,
  params.enrichments
).then((response) => {
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
  const filters = { country_code: 'US', states: ['NY'], business_statuses: ['operational'] };

  // You can also pass `query` and/or `enrichments` here:
  const query = null;
  const enrichments = {
    contacts_n_leads: { contacts_per_company: 2, emails_per_contact: 1 },
  };

  for await (const item of client.businessesIterSearch(
    filters,
    100, // limit
    ['name', 'phone', 'address', 'rating', 'reviews'], // fields
    false, // includeTotal
    query,
    enrichments
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