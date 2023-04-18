# Google Maps Scraper With Server-side JavaScript

The library provides real-time access to the places from Google Maps via [Outscraper API](https://app.outscraper.com/api-docs#tag/Google-Maps).
It allows easy scraping of [businesses information](https://outscraper.com/google-maps-scraper/#dictionary) from Google Maps.

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

// Get data of the specific place by id
client.googleMapsSearch(['ChIJrc9T9fpYwokRdvjYRHT8nI4'], language='en').then(response => {
  console.log(response);
});

// Scrap Places by Two Queries
client.googleMapsSearch(
  ['restaurants brooklyn usa', 'bars brooklyn usa'],
  limit=50, // limit of palces per each query
  language='en',
  region='US',
).then(response => {
  response.forEach(queryPlaces => {
    queryPlaces.forEach(place => {
      console.log('--------------------');
      console.log('query: ', place.query);
      console.log('name: ', place.name);
      console.log('phone: ', place.phone);
      console.log('site: ', place.site);
    });
  });
});


// Scrap Places by Place Ids
client.googleMapsSearch(
  ["ChIJ8ccnM7dbwokRy-pTMsdgvS4", "ChIJN5X_gWdZwokRck9rk2guJ1M", "ChIJxWLy8DlawokR1jvfXUPSTUE"],
  limit=1, // limit of palces per each query
).then(response => {
  response.forEach(queryPlaces => {
    queryPlaces.forEach(place => {
      console.log('--------------------');
      console.log('name: ', place.name);
      console.log('place_id: ', place.place_id);
    });
  });
});
```
