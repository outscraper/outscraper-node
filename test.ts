export { };

const Outscraper = require('./index');

const outscraper = new Outscraper('YOUR_API_KEY');

async function testNewServices() {
  try {

    console.log('\nTesting phoneIdentityFinder...');
    const phoneIdentityResult = await outscraper.phoneIdentityFinder(
      '+14155552671',
      true
    );
    console.log('Phone Identity Result:', phoneIdentityResult ? 'Response received' : 'No response');

    console.log('\nTesting addressScraper...');
    const addressScraperResult = await outscraper.addressScraper(
      '1600 Amphitheatre Parkway, Mountain View, CA'
    );
    console.log('Address Scraper Result:', addressScraperResult ? 'Response received' : 'No response');


    console.log('\nTesting reverseGeocoding...');
    const reverseGeocodingResult = await outscraper.reverseGeocoding(
      '37.4224428,-122.0842467'
    );
    console.log('Reverse Geocoding Result:', reverseGeocodingResult ? 'Response received' : 'No response');


    console.log('\nTesting geocoding...');
    const geocodingResult = await outscraper.geocoding(
      '1600 Amphitheatre Parkway, Mountain View, CA'
    );
    console.log('Geocoding Result:', geocodingResult ? 'Response received' : 'No response');

    // Test getGlassdoorReviews
    console.log('\nTesting getGlassdoorReviews...');
    const glassdoorReviewsResult = await outscraper.getGlassdoorReviews(
      'google',
      50, // limit
      'DATE', // sort
      null // cutoff
    );
    console.log('Glassdoor Reviews Result:', glassdoorReviewsResult ? 'Response received' : 'No response');

    console.log('\nTesting appStoreReviews...');
    const appStoreReviewsResult = await outscraper.appStoreReviews(
      'instagram',
      50, // perQuery
      50, // limit
      'mosthelpful' // sort
    );
    console.log('App Store Reviews Result:', appStoreReviewsResult ? 'Response received' : 'No response');

  } catch (error) {
    console.error('Error:', error);
  }
}

async function runAllTests() {
  await testNewServices();
  console.log('\nAll tests completed!');
}

runAllTests();
