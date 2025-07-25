export { };

const Outscraper = require('./index');

const outscraper = new Outscraper('YOUR_API_KEY');

async function testAllServices() {
  try {
    console.log('\nTesting googleSearch...');
    console.log(await outscraper.googleSearch('OpenAI', 1, '', 'en', null, false));

    console.log('\nTesting googleMapsSearch...');
    console.log(await outscraper.googleMapsSearch('restaurants in New York', 1, 'en', null, 0, false, null, false));

    console.log('\nTesting googleSearchNews...');
    console.log(await outscraper.googleSearchNews('OpenAI news', 1, '', '', 'en', null, false));

    console.log('\nTesting googleMapsSearchV3...');
    console.log(await outscraper.googleMapsSearchV3('coffee shops NYC', 1, 'en', null, 0, false, null, false));

    console.log('\nTesting googleMapsDirections...');
    console.log(await outscraper.googleMapsDirections('Чернігів, Україна', 'Bazys, Чернігів, Україна', null, null, null, 'car', 'en', null, null, false));

    console.log('\nTesting googleMapsReviews...');
    console.log(await outscraper.googleMapsReviews('Googleplex', 5, null, 1, 'most_relevant', null, null, null, null, false, 'google', 'en', null, '', false));

    console.log('\nTesting googlePlayReviews...');
    console.log(await outscraper.googlePlayReviews('com.google.android.apps.maps', 10, 'most_relevant', null, null, 'en', null, false));

    console.log('\nTesting amazonProducts...');
    console.log(await outscraper.amazonProducts('laptop', 5, 'amazon.com', '11201', null, false));

    console.log('\nTesting amazonReviews...');
    console.log(await outscraper.amazonReviews('B08N5WRWNW', 5, 'helpful', 'all_reviews', 'all_stars', null, null, false));

    console.log('\nTesting emailsAndContacts...');
    console.log(await outscraper.emailsAndContacts('example.com', null, false));

    console.log('\nTesting phonesEnricher...');
    console.log(await outscraper.phonesEnricher('+14155552671', false));

    console.log('\nTesting companyInsights...');
    console.log(await outscraper.companyInsights('apple.com', '', false, 'domains_service'));

    console.log('\nTesting validateEmails...');
    console.log(await outscraper.validateEmails('test@example.com', false));

    console.log('\nTesting getGoogleMapsPhotos...');
    console.log(await outscraper.getGoogleMapsPhotos('Eiffel Tower', { async: false }));

    console.log('\nTesting trustpilot...');
    console.log(await outscraper.trustpilot('Google', [], '', false, false, ''));

    console.log('\nTesting trustpilotSearch...');
    console.log(await outscraper.trustpilotSearch('Google', 100, 0, [], '', false, false, ''));

    console.log('\nTesting trustpilotReviews...');
    console.log(await outscraper.trustpilotReviews('google.com', 10, 'en', '', null, '', false, false, ''));

    console.log('\nTesting youtubeComments...');
    console.log(await outscraper.youtubeComments('dQw4w9WgXcQ', 1, 'en', '', '', false, false, ''));

    console.log('\nTesting yelpReviews...');
    console.log(await outscraper.yelpReviews('Best pizza in NYC', 1, '', 'relevance_desc', 1622505600, '', false, false, ''));

    console.log('\nTesting yelpSearch...');
    console.log(await outscraper.yelpSearch('https://www.yelp.com/search?find_desc=Restaurants&find_loc=San+Francisco%2C+CA', 5, false));

    console.log('\nTesting tripadvisorReviews...');
    console.log(await outscraper.tripadvisorReviews('https://www.tripadvisor.com/Restaurant_Review-g187147-d12947099-Reviews-Mayfair_Garden-Paris_Ile_de_France.html', 1, false));

    console.log('\nTesting g2Reviews...');
    console.log(await outscraper.g2Reviews('https://www.g2.com/products/outscraper', 5, '', null, null, false));

    console.log('\nTesting capterraReviews...');
    console.log(await outscraper.capterraReviews('https://www.capterra.com/p/228041/Google-Maps-scraper', 5, null, null, 'en', null, null, false));

    console.log('\nTesting phoneIdentityFinder...');
    console.log(await outscraper.phoneIdentityFinder('+14155552671', false));

    console.log('\nTesting addressScraper...');
    console.log(await outscraper.addressScraper('1600 Amphitheatre Parkway, Mountain View, CA', false));

    console.log('\nTesting reverseGeocoding...');
    console.log(await outscraper.reverseGeocoding('37.4224428,-122.0842467', false));

    console.log('\nTesting geocoding...');
    console.log(await outscraper.geocoding('1600 Amphitheatre Parkway, Mountain View, CA', false));

    console.log('\nTesting getGlassdoorReviews...');
    console.log(await outscraper.getGlassdoorReviews('https://www.glassdoor.com/Reviews/Google-Reviews-E9079.htm', 1, 'DATE', null, false));

    console.log('\nTesting appStoreReviews...');
    console.log(await outscraper.appStoreReviews('id686449807', 1, 'mosthelpful', null, '', false));

    console.log('\nTesting similarweb...');
    console.log(await outscraper.similarweb('apple.com', null, false, null, null));

    console.log('\nTesting companyWebsitesFinder...');
    console.log(await outscraper.companyWebsitesFinder('Apple Inc', null, false, null, null));

    console.log('\nAll tests completed!');
  } catch (error) {
    console.error('Error:', error);
  }
}

testAllServices();
