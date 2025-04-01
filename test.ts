const Outscraper = require('./index');

const outscraper = new Outscraper('YOUR_API_KEY');

async function test() {
  try {
    const history = await outscraper.getRequestsHistory();
    console.log('History:', history);

    const searchResults = await outscraper.googleSearch('test query');
    console.log('Search Results:', searchResults);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
