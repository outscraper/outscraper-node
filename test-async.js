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

    // Handle the case where result is undefined
    if (result === undefined) {
      console.log('Response structure: undefined');
      console.log('Received an undefined response. This could happen if the API request failed completely.');
      console.log('The SDK should be updated to handle this case and return a proper error object.');
    } else {
      console.log('Response structure:', JSON.stringify(result, null, 2));
      // If asyncRequest=true works correctly, the result should contain a requestId

      if (result && (result.error || result.errorMessage)) {
        console.log('Received an error response:', result);
        console.log('This is expected when using an invalid API key or when there are other API errors.');
        console.log('The SDK correctly handles error responses and returns them as-is.');
      } else if (result) {
        const requestId = result.requestId || result.id;

        if (requestId) {
          console.log('Success! The asyncRequest parameter is working correctly.');
          console.log('Request ID:', requestId);
        } else {
          console.log('The asyncRequest parameter might not be working as expected.');
          console.log('Expected a requestId in the response, but got:', Object.keys(result));
        }
      } else {
        console.log('Received a null or empty response.');
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testAsyncParameter();
