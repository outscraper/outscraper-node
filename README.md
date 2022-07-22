# Outscraper Node Library

The library provides convenient access to the [Outscraper API](https://app.outscraper.com/api-docs) from applications written in server-side JavaScript. Allows using [Outscraper's services](https://outscraper.com/services/) from your code.

## Installation

Install the package with:
```bash
npm install outscraper --save
# or
yarn add outscraper
```

[Link to the Ruby package page](https://rubygems.org/gems/outscraper)

## Initialization
```js
const Outscraper = require('./index.js');

let client = new Outscraper('SECRET_API_KEY');
```
[Link to the profile page to create the API key](https://app.outscraper.com/profile)

## Usage

```js
// Search for businesses in specific locations:
client.googleMapsSearchV2(['restaurants brooklyn usa'], limit=20, language='en', region='us').then(response => {
    console.log(response);
});

// Or using ES modules and async/await:
(async () => {
  const response = await client.googleMapsSearchV2(['restaurants brooklyn usa'], limit=20, language='en', region='us');
  console.log(response);
})();

// Get data of the specific place by id
client.googleMapsSearchV2(['rChIJrc9T9fpYwokRdvjYRHT8nI4'], language='en').then(response => {
    console.log(response);
});

// Get reviews of the specific place by id
client.googleMapsReviewsV3(['rChIJrc9T9fpYwokRdvjYRHT8nI4'], reviewsLimit=20, language='en').then(response => {
    console.log(response);
});

// Search contacts from website
client.emailsAndContacts(['outscraper.com']).then(response => {
    console.log(response);
});
```

[More examples](https://github.com/outscraper/outscraper-node/tree/master/examples)

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/outscraper/outscraper-node.
