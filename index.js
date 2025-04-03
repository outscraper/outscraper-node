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
        headers: { 'X-API-KEY': this.apiKey, 'client': 'Node SDK' }
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

  handleAsyncResponse(response, asyncRequest) {
    if (!response) {
      return { error: 'Empty response received', response };
    }

    if (response.error || response.errorMessage) {
      return response;
    }

    if (!asyncRequest) {
      return response.data ?? response;
    }

    if (response) {
      return {
        status: response.status ?? 'Pending',
        id: response.id,
        results_location: response.results_location
      };
    }

    return { error: 'Invalid async response structure', response };
  }

  async getRequestsHistory(type = 'running') {
    return await this.getAPIRequest('/requests', { type });
  }

  async getRequestArchive(requestId) {
    return await this.getAPIRequest(`/requests/${requestId}`, {});
  }

  async googleSearch(query, pagesPerQuery = 1, uule = '', language = 'en', region = null, asyncRequest = false) {
    const response = await this.getAPIRequest('/google-search-v3', {
      query: toArray(query),
      pagesPerQuery,
      uule,
      language,
      region,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async googleMapsSearch(query, limit = 20, language = 'en', region = null, skip = 0, dropDuplicates = false, enrichment = null, asyncRequest = true) {
    const response = await this.getAPIRequest('/maps/search-v2', {
      query: toArray(query),
      language,
      region,
      organizationsPerQueryLimit: limit,
      skipPlaces: skip,
      dropDuplicates,
      enrichment: enrichment ? toArray(enrichment) : null,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async googleMapsReviews(query, reviewsLimit = 100, reviewsQuery = null, limit = 1, sort = 'most_relevant', lastPaginationId = null, start = null, cutoff = null, cutoffRating = null, ignoreEmpty = false, source = 'google', language = 'en', region = null, fields = '', asyncRequest = false) {
    const response = await this.getAPIRequest('/maps/reviews-v3', {
      query: toArray(query),
      reviewsLimit,
      reviewsQuery,
      limit,
      sort,
      lastPaginationId,
      start,
      cutoff,
      cutoffRating,
      ignoreEmpty,
      source,
      language,
      region,
      fields: fields,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async emailsAndContacts(query, preferredContacts = null, asyncRequest = false) {
    const response = await this.getAPIRequest('/emails-and-contacts', {
      query: toArray(query),
      preferredContacts: preferredContacts ? toArray(preferredContacts) : null,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async phonesEnricher(query, asyncRequest = false) {
    const response = await this.getAPIRequest('/phones-enricher', {
      query: toArray(query),
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async companyInsights(query, fields = '', asyncRequest = false, enrichments = []) {
    const response = await this.getAPIRequest('/company-insights', {
      query: toArray(query),
      fields,
      enrichments: toArray(enrichments),
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async validateEmails(query, asyncRequest = false) {
    const response = await this.getAPIRequest('/email-validator', {
      query: toArray(query),
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async getGoogleMapsPhotos(query, options = {}) {
    const params = {
      query: toArray(query),
      photosLimit: options.photosLimit || 100,
      limit: options.limit || 1,
      tag: options.tag || 'all',
      language: options.language || 'en',
      region: options.region || undefined,
      fields: options.fields || undefined,
      async: options.async !== undefined ? options.async : true,
      ui: options.ui || false,
      webhook: options.webhook || undefined,
    };

    const response = await this.getAPIRequest('/maps/photos-v3', params);
    return this.handleAsyncResponse(response, options.async);
  }

  async trustpilot(query, enrichment = [], fields = '', asyncRequest = false, ui = false, webhook = '') {
    const response = await this.getAPIRequest('/trustpilot', {
      query: toArray(query),
      enrichment: enrichment ? toArray(enrichment) : [],
      fields,
      async: asyncRequest,
      ui,
      webhook,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async trustpilotSearch(query, limit = 100, skip = 0, enrichment = [], fields = '', asyncRequest = false, ui = false, webhook = '') {

    const parameters = {
      query: toArray(query),
      limit,
      skip,
      enrichment: enrichment.length ? enrichment : [],
      fields,
      async: asyncRequest,
      ui,
      webhook,
    };

    const response = await this.getAPIRequest('/trustpilot', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async trustpilotReviews(query, limit = 100, languages = 'default', sort = '', cutoff = null, fields = '', asyncRequest = false, ui = false, webhook = '') {

    const parameters = {
      query: toArray(query),
      limit,
      languages,
      sort,
      cutoff,
      fields,
      async: asyncRequest,
      ui,
      webhook,
    };

    const response = await this.getAPIRequest('/trustpilot/reviews', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async youtubeComments(query, perQuery = 100, language = 'en', region = '', fields = '', asyncRequest = false, ui = false, webhook = '') {
    const parameters = {
      query: toArray(query),
      perQuery,
      language,
      region,
      fields,
      async: asyncRequest,
      ui,
      webhook,
    };

    const response = await this.getAPIRequest('/youtube-comments', parameters);

    return this.handleAsyncResponse(response, asyncRequest);
  }

  async yelpReviews(query, limit = 100, cursor = '', sort = 'relevance_desc', cutoff = '', fields = '', asyncRequest = false, ui = false, webhook = '') {
    const parameters = {
      query: toArray(query),
      limit,
      cursor,
      sort,
      cutoff,
      fields,
      async: asyncRequest,
      ui,
      webhook,
    };

    const response = await this.getAPIRequest('/yelp/reviews', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async phoneIdentityFinder(query, asyncRequest = false) {
    const parameters = {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    };
    const response = await this.getAPIRequest('/whitepages-phones', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async addressScraper(query, asyncRequest = false) {
    const parameters = {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    };
    const response = await this.getAPIRequest('/whitepages-addresses', parameters);
    return this.handleAsyncResponse(response, asyncRequest);

  }

  async reverseGeocoding(query, asyncRequest = false) {
    const parameters = {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    };
    const response = await this.getAPIRequest('/reverse-geocoding', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async geocoding(query, asyncRequest = false) {
    const parameters = {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    };
    const response = await this.getAPIRequest('/geocoding', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async getGlassdoorReviews(query, limit = 100, sort = 'DATE', cutoff = null, asyncRequest = false) {
    const parameters = {
      query: toArray(query),
      limit: limit,
      sort: sort,
      cutoff: cutoff,
      async: asyncRequest
    };
    const response = await this.getAPIRequest('/glassdoor/reviews', parameters)
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async appStoreReviews(query, limit = 100, sort = 'mosthelpful', cutoff = null, fields = '', asyncRequest = false) {
    const parameters = {
      query: toArray(query),
      limit,
      sort,
      cutoff,
      fields,
      async: asyncRequest,
    };
    const response = await this.getAPIRequest('/appstore/reviews', parameters)
    return this.handleAsyncResponse(response, asyncRequest);
  }
}

module.exports = Outscraper;
