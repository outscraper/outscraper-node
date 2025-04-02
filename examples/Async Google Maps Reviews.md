# Async Google Maps Reviews

The library provides a way to use the async mode for Google Maps Reviews, which allows you to make requests that will be processed asynchronously by the Outscraper API.

## Usage

```js
const Outscraper = require('outscraper');

const client = new Outscraper('YOUR_API_KEY');

// Example 1: Get reviews of a specific place by ID using async mode
async function getReviewsAsync() {
  try {
    // Make the request with asyncRequest=true
    const response = await client.googleMapsReviews(
      ['rChIJrc9T9fpYwokRdvjYRHT8nI4'], // Place ID
      20,                               // reviewsLimit
      1,                                // limit
      'most_relevant',                  // sort
      0,                                // skip
      null,                             // start
      null,                             // cutoff
      null,                             // cutoffRating
      false,                            // ignoreEmpty
      'en',                             // language
      null,                             // region
      null,                             // reviewsQuery
      null,                             // lastPaginationId
      true                              // asyncRequest - set to true to enable async mode
    );

    // When asyncRequest=true, the response will contain a requestId
    console.log('Request ID:', response.requestId);

    // You can use the requestId to check the status of the request later
    const requestStatus = await client.getRequestArchive(response.requestId);
    console.log('Request Status:', requestStatus);

    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 2: Using Promise syntax
client.googleMapsReviews(
  ['rChIJrc9T9fpYwokRdvjYRHT8nI4'],
  20,                // reviewsLimit
  1,                 // limit
  'most_relevant',   // sort
  0,                 // skip
  null,              // start
  null,              // cutoff
  null,              // cutoffRating
  false,             // ignoreEmpty
  'en',              // language
  null,              // region
  null,              // reviewsQuery
  null,              // lastPaginationId
  true               // asyncRequest - set to true
).then(response => {
  console.log('Request ID:', response.requestId);
  return client.getRequestArchive(response.requestId);
}).then(status => {
  console.log('Request Status:', status);
}).catch(error => {
  console.error('Error:', error);
});
```

## Benefits of Async Mode

Using async mode (`asyncRequest=true`) has several benefits:

1. **Handle large requests**: When you need to scrape a large number of reviews, async mode allows the API to process the request in the background without keeping the connection open.

2. **Avoid timeouts**: For requests that might take a long time to complete, async mode prevents timeouts that might occur with synchronous requests.

3. **Better resource management**: Async mode allows the API to better manage resources and prioritize requests.

## How to Check Request Status

After making an async request, you'll receive a `requestId` that you can use to check the status of the request:

```js
// Check the status of an async request
client.getRequestArchive('your-request-id').then(status => {
  console.log('Request Status:', status);

  // If the request is complete, the status will contain the data
  if (status.status === 'Completed') {
    console.log('Data:', status.data);
  }
});
```

The status object will contain information about the request, including its current status (e.g., "Running", "Completed", "Failed") and, if completed, the requested data.
