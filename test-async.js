const Outscraper = require('./index');

// Replace with your actual API key
const outscraper = new Outscraper('YOUR_API_KEY');

async function testAsyncParameter() {
  try {
    console.log('Testing googleMapsReviews with asyncRequest=true');

    // Call googleMapsReviews with asyncRequest=true
    const result = await outscraper.googleMapsReviews(
      'Starbucks New York', // query
      5,                    // reviewsLimit
      1,                    // limit
      'most_relevant',      // sort
      0,                    // skip
      null,                 // start
      null,                 // cutoff
      null,                 // cutoffRating
      false,                // ignoreEmpty
      'en',                 // language
      null,                 // region
      null,                 // reviewsQuery
      null,                 // lastPaginationId
      true                  // asyncRequest - set to true
    );

    console.log('Result:', result);

    console.log('Response structure:', JSON.stringify(result, null, 2));

    // If asyncRequest=true works correctly, the result should contain a requestId
    // The requestId might be directly in the result object or in a nested property
    const requestId = result.requestId || (result.data && result.data.requestId);

    if (requestId) {
      console.log('Success! The asyncRequest parameter is working correctly.');
      console.log('Request ID:', requestId);
    } else {
      console.log('The asyncRequest parameter might not be working as expected.');
      console.log('Expected a requestId in the response, but got:', Object.keys(result));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testAsyncParameter();
