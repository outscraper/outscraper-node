export { };

const Outscraper = require('./index');

// Replace with your actual API key
const outscraper = new Outscraper('YOUR_API_KEY');

async function testAsyncParameter() {
  try {
    console.log('Testing googleMapsReviews with asyncRequest=true');

    const result = await outscraper.googleMapsReviews(
      'Starbucks New York', 5, 1, 'most_relevant', 0, null, null, null, false, 'en', null, null, null, true
    );

    console.log('Result:', result);
    console.log('Response structure:', JSON.stringify(result, null, 2));

    if ('error' in result || 'errorMessage' in result) {
      console.log('Received an error response:', result);
    } else {
      const requestId = result.requestId || result.id;

      if (requestId) {
        console.log('Success! The asyncRequest parameter is working correctly.');
        console.log('Request ID:', requestId);
      } else {
        console.log('Unexpected response format. Keys:', Object.keys(result));
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testAsyncParameter();
