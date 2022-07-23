const https = require('https');
const querystring = require('querystring');
const { toArray, removeEmpty } = require('./utils');

class Outscraper {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiHostname = 'api.app.outscraper.com';
  }

  getAPIRequest(path, parameters) {
    return new Promise((resolve, reject) => {
      const req = https.request({
        hostname: this.apiHostname,
        port: '443',
        path: path + '?' + querystring.stringify(removeEmpty(parameters)),
        headers : {'X-API-KEY': this.apiKey, 'client': 'Node SDK'}
      }, (res) => {
        res.setEncoding('utf8');
        let responseBody = '';

        res.on('data', (chunk) => {
          responseBody += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(responseBody));
        });
      });

      req.on('error', (err) => {
        reject(err);
        console.log('err', err);
      });

      req.end();
    });
  }

  async getRequestsHistory(type = 'running') {
    return await this.getAPIRequest('/requests', { type });
  }

  async getRequestArchive(requestId) {
    return await this.getAPIRequest(f`/requests/${requestId}`, { type });
  }

  async googleSearch(query, pagesPerQuery = 1, uule = '', language = 'en', region = null) {
    const response = await this.getAPIRequest('/google-search-v2', {
      query: toArray(query),
      pagesPerQuery,
      uule,
      language,
      region,
      async: false,
    });
    return response['data'];
  }

  async googleSearchV3(query, pagesPerQuery = 1, uule = '', language = 'en', region = null) {
    const response = await this.getAPIRequest('/google-search-v3', {
      query: toArray(query),
      pagesPerQuery,
      uule,
      language,
      region,
      async: false,
    });
    return response['data'];
  }

  async googleMapsSearchV2(query, limit = 20, language = 'en', region = null, skip = 0, dropDuplicates = false) {
    const response = await this.getAPIRequest('/maps/search-v2', {
      query: toArray(query),
      language,
      region,
      organizationsPerQueryLimit: limit,
      skipPlaces: skip,
      dropDuplicates,
      async: false,
    });
    return response['data'];
  }

  async googleMapsReviewsV3(query, reviewsLimit = 10, limit = 1, sort = 'most_relevant', skip = 0, start = null, cutoff = null, cutoffRating = null, ignoreEmpty = false, language = 'en', region = null, reviewsQuery = null) {
    const response = await this.getAPIRequest('/maps/reviews-v3', {
      query: toArray(query),
      reviewsLimit,
      limit,
      sort,
      skip,
      start,
      cutoff,
      reviewsQuery,
      cutoffRating,
      ignoreEmpty,
      language,
      region,
      async: false,
    });
    return response['data'];
  }

  async emailsAndContacts(query) {
    const response = await this.getAPIRequest('/emails-and-contacts', {
      query: toArray(query),
      async: false,
    });
    return response['data'];
  }

  async phonesEnricher(query,) {
    const response = await this.getAPIRequest('/phones-enricher', {
      query: toArray(query),
      async: false,
    });
    return response['data'];
  }
}

module.exports = Outscraper
