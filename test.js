const Outscraper = require('./index');
// import Outscraper from 'outscraper';

let client = new Outscraper('YXV0aDB8NjAyMDFmODYwOTQ5M2UwMDZhOGM4YjZhfDg3ZmE1Mjc0ZTk');

// Scrap Places by Two Queries
// client.googleMapsSearch(['restaurants brooklyn usa'], limit=20, language='en', region='us'

// ).then(response => {
//   console.log(response);
// });

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
      console.log('--------------------');
      console.log('name: ', place.name);
      console.log('place_id: ', place.place_id);
      console.log('name: ', place);
    });
  });
});

// client.googleMapsReviewsV(
//   ["ChIJN5X_gWdZwokRck9rk2guJ1M", "ChIJxWLy8DlawokR1jvfXUPSTUE"],
//   reviewsLimit=100,
//   limit=1,
//   sort='newest',
//   cutoff=1654596109, // the maximum timestamp value for reviews (oldest review you want to extract). Can be used to scrape only the new reviews since your latest update
// ).then(response => {
//   response.forEach(place => {
//     console.log('--------------------');
//     console.log('name: ', place.name);
//     console.log('new reviews: ', place.reviews_data.length);
//   });
// });


// (async () => {
//     const response = await client.googleMapsSearch('bars ny usa');

//     console.log('response', response);
//   })();

// (async () => {
//     const response = await client.getRequestsHistory();
//     console.log('response', response);
//   })();