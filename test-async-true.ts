export { };

const Outscraper = require('./index');

const outscraper = new Outscraper('YOUR_API_KEY');

async function testAllServices() {
  try {
    console.log('\nTesting googleSearch...');
    console.log(await outscraper.googleSearch('OpenAI', 1, '', 'en', null, true));

    console.log('\nTesting googleMapsSearch...');
    console.log(await outscraper.googleMapsSearch('restaurants in New York', 1, 'en', null, 0, false, null, true));

    console.log('\nTesting googleMapsReviews...');
    console.log(await outscraper.googleMapsReviews('Googleplex', 5, null, 1, 'most_relevant', null, null, null, null, false, 'google', 'en', null, '', true));

    console.log('\nTesting emailsAndContacts...');
    console.log(await outscraper.emailsAndContacts('example.com', null, true));

    console.log('\nTesting phonesEnricher...');
    console.log(await outscraper.phonesEnricher('+14155552671', true));

    console.log('\nTesting companyInsights...');
    console.log(await outscraper.companyInsights('apple.com', '', true, 'domains_service'));

    console.log('\nTesting validateEmails...');
    console.log(await outscraper.validateEmails('test@example.com', true));

    console.log('\nTesting getGoogleMapsPhotos...');
    console.log(await outscraper.getGoogleMapsPhotos('Eiffel Tower', { async: true }));

    console.log('\nTesting trustpilot...');
    console.log(await outscraper.trustpilot('Google', [], '', true, false, ''));

    console.log('\nTesting trustpilotSearch...');
    console.log(await outscraper.trustpilotSearch('Google', 100, 0, [], '', true, false, ''));

    console.log('\nTesting trustpilotReviews...');
    console.log(await outscraper.trustpilotReviews('google.com', 10, 'en', '', null, '', true, false, ''));

    console.log('\nTesting youtubeComments...');
    console.log(await outscraper.youtubeComments('dQw4w9WgXcQ', 1, 'en', '', '', true, false, ''));

    console.log('\nTesting yelpReviews...');
    console.log(await outscraper.yelpReviews('Best pizza in NYC', 1, '', 'relevance_desc', 1622505600, '', true, false, ''));

    console.log('\nTesting phoneIdentityFinder...');
    console.log(await outscraper.phoneIdentityFinder('+14155552671', true));

    console.log('\nTesting addressScraper...');
    console.log(await outscraper.addressScraper('1600 Amphitheatre Parkway, Mountain View, CA', true));

    console.log('\nTesting reverseGeocoding...');
    console.log(await outscraper.reverseGeocoding('37.4224428,-122.0842467', true));

    console.log('\nTesting geocoding...');
    console.log(await outscraper.geocoding('1600 Amphitheatre Parkway, Mountain View, CA', true));

    console.log('\nTesting getGlassdoorReviews...');
    console.log(await outscraper.getGlassdoorReviews('https://www.glassdoor.com/Reviews/Google-Reviews-E9079.htm', 1, 'DATE', null, true));

    console.log('\nTesting appStoreReviews...');
    console.log(await outscraper.appStoreReviews('id686449807', 1, 'mosthelpful', null, '', true));

    console.log('\nAll tests completed!');
  } catch (error) {
    console.error('Error:', error);
  }
}

testAllServices();
