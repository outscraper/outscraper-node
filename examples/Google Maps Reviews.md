# Google Maps Reviews Scraper With Server-side JavaScript

The library provides real-time access to the reviews from Google Maps via [Outscraper API](https://app.outscraper.com/api-docs#tag/Google-Reviews).

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
// Get reviews of the specific place by id
client.googleMapsReviewsV3(['rChIJrc9T9fpYwokRdvjYRHT8nI4'], reviewsLimit=20, language='en').then(response => {
    console.log(response);
});

// Get reviews for places found by search query
client.googleMapsReviewsV3(['Memphis Seoul brooklyn usa'], reviewsLimit=20, limit=20, language='en').then(response => {
    console.log(response);
});

// Get only new reviews during last 24 hours
const yesterdayTimestamp = 1657980986
client.googleMapsReviewsV3(['ChIJrc9T9fpYwokRdvjYRHT8nI4'], sort='newest', cutoff=yesterdayTimestamp, reviewsLimit=100, language='en').then(response => {
    console.log(response);
});

// Scrap Places Reviews by Place Ids
client.googleMapsReviewsV3(
  ["ChIJN5X_gWdZwokRck9rk2guJ1M", "ChIJxWLy8DlawokR1jvfXUPSTUE"],
  reviewsLimit=20, // limit of reviews per each place
  limit=1 // limit of palces per each query
).then(response => {
  response.forEach(place => {
    console.log('--------------------');
    console.log('name: ', place.name);
    place.reviews_data.forEach(review => {
      console.log('review: ', review.review_text);
    });
  });
});

// Scrap Only New Reviews
client.googleMapsReviewsV3(
  ["ChIJN5X_gWdZwokRck9rk2guJ1M", "ChIJxWLy8DlawokR1jvfXUPSTUE"],
  reviewsLimit=100,
  limit=1,
  sort='newest',
  cutoff=1654596109, // the maximum timestamp value for reviews (oldest review you want to extract). Can be used to scrape only the new reviews since your latest update
).then(response => {
  response.forEach(place => {
    console.log('--------------------');
    console.log('name: ', place.name);
    console.log('new reviews: ', place.reviews_data.length);
  });
});
```
