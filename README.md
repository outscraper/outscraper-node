# Outscraper Node Library

The library provides convenient access to the [Outscraper API](https://app.outscraper.com/api-docs) from applications written in server-side JavaScript. Allows using [Outscraper's services](https://outscraper.com/services/) from your code.

![screencast](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWVjMGIxNjlmZGMwYjAwMzc5M2QxZjI5ZmIzNzc0ZWQxYWQ2M2Q2ZiZjdD1n/2Z85rUMT0D9e8qslj8/giphy.gif)

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
// Search for businesses in specific locations:
client.googleMapsSearch(['restaurants brooklyn usa'], limit=20, language='en', region='us').then(response => {
    console.log(response);
});

// Or using ES modules and async/await:
(async () => {
  const response = await client.googleMapsSearch(['restaurants brooklyn usa'], limit=20, language='en', region='us');
  console.log(response);
})();

// Get data of the specific place by id
client.googleMapsSearch(['rChIJrc9T9fpYwokRdvjYRHT8nI4'], language='en').then(response => {
    console.log(response);
});

// Get reviews of the specific place by id
client.googleMapsReviews(['rChIJrc9T9fpYwokRdvjYRHT8nI4'], reviewsLimit=20, language='en').then(response => {
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
