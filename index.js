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
    if (!asyncRequest) {
      return response.data;
    }

    if (response.error || response.errorMessage) {
      return response;
    }

    return { ...response, id: response.id || response.data?.id };
  }

  async getRequestsHistory(type = 'running') {
    return await this.getAPIRequest('/requests', { type });
  }

  async getRequestArchive(requestId) {
    return await this.getAPIRequest(`/requests/${requestId}`, {});
  }

  async googleSearch(query, pagesPerQuery = 1, uule = '', language = 'en', region = null, asyncRequest = true) {
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

  async googleMapsReviews(query, reviewsLimit = 10, limit = 1, sort = 'most_relevant', skip = 0, start = null, cutoff = null, cutoffRating = null, ignoreEmpty = false, language = 'en', region = null, reviewsQuery = null, lastPaginationId = null, asyncRequest = true) {
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
      lastPaginationId,
      language,
      region,
      async: asyncRequest,
    });
    if (asyncRequest) {
      if (response.error || response.errorMessage) {
        return response;
      } else if (response.id) {
        return response;
      } else if (response.data && response.data.id) {
        return { ...response, id: response.data.id };
      } else {
        return response;
      }
    } else {
      return response['data'];
    }
  }

  async emailsAndContacts(query, preferredContacts = null, asyncRequest = true) {
    const response = await this.getAPIRequest('/emails-and-contacts', {
      query: toArray(query),
      preferredContacts: preferredContacts ? toArray(preferredContacts) : null,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async phonesEnricher(query, asyncRequest = true) {
    const response = await this.getAPIRequest('/phones-enricher', {
      query: toArray(query),
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async companyInsights(query, enrichments = ['company_insights_service'], fields = '', asyncRequest = true) {
    const response = await this.getAPIRequest('/companies', {
      query: toArray(query),
      enrichment: toArray(enrichments),
      fields,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async validateEmails(query, asyncRequest = true) {
    const response = await this.getAPIRequest('/emails-validator', {
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

    const response = await this.getAPIRequest('/google-maps-photos', params);
    if (options.async) {
      if (response.error || response.errorMessage) {
        return response;
      } else if (response.id) {
        return response;
      } else if (response.data && response.data.id) {
        return { ...response, id: response.data.id };
      } else {
        return response;
      }
    } else {
      return response['data'];
    }
  }

  async trustpilot(query, enrichment = [], fields = '', asyncRequest = true, ui = false, webhook = '') {
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

  async trustpilotSearch(query, limit = 100, skip = 0, enrichment = [], fields = '', asyncRequest = true, ui = false, webhook = '') {
    const queryArray = Array.isArray(query) ? query : [query];

    const parameters = {
      query: queryArray,
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

  async trustpilotReviews(query, limit = 100, languages = 'default', sort = '', cutoff = null, fields = '', asyncRequest = true, ui = false, webhook = '') {
    const queryArray = Array.isArray(query) ? query : [query];

    const parameters = {
      query: queryArray,
      limit,
      languages,
      sort,
      cutoff,
      fields,
      async: asyncRequest,
      ui,
      webhook,
    };

    const response = await this.getAPIRequest('/trustpilot-reviews', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async youtubeComments(query, perQuery = 100, language = 'en', region = '', fields = '', asyncRequest = true, ui = false, webhook = '') {
    const queryArray = Array.isArray(query) ? query : [query];

    const parameters = {
      query: queryArray,
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

  async yelpReviews(query, limit = 100, cursor = '', sort = 'relevance_desc', cutoff = '', fields = '', asyncRequest = true, ui = false, webhook = '') {
    const queryArray = Array.isArray(query) ? query : [query];

    const parameters = {
      query: queryArray,
      limit,
      cursor,
      sort,
      cutoff,
      fields,
      async: asyncRequest,
      ui,
      webhook,
    };

    const response = await this.getAPIRequest('/yelp-reviews', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async phoneIdentityFinder(query, asyncRequest = true) {
    const parameters = {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    };
    const response = await this.getAPIRequest('/phone-identity-finder', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async addressScraper(query, asyncRequest = true) {
    const parameters = {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    };
    const response = await this.getAPIRequest('/address-identity', parameters);
    return this.handleAsyncResponse(response, asyncRequest);

  }

  async reverseGeocoding(query, asyncRequest = true) {
    const parameters = {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    };
    const response = await this.getAPIRequest('/reverse/geocode', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async geocoding(query, asyncRequest = true) {
    const parameters = {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    };
    const response = await this.getAPIRequest('/geocode', parameters);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async getGlassdoorReviews(query, limit = 100, sort = 'DATE', cutoff = null, asyncRequest = true) {
    const queryArray = Array.isArray(query) ? query : [query];

    const parameters = {
      query: queryArray,
      limit: limit,
      sort: sort,
      cutoff: cutoff,
      async: asyncRequest
    };
    const response = await this.getAPIRequest('/glassdoor/reviews', parameters)
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async appStoreReviews(query, perQuery = 100, limit = 100, sort = 'mosthelpful', asyncRequest = true) {
    const parameters = {
      query: toArray(query),
      perQuery,
      limit,
      sort,
      async: asyncRequest,
    };
    const response = await this.getAPIRequest('/appstore/reviews', parameters)
    return this.handleAsyncResponse(response, asyncRequest);
  }
}

module.exports = Outscraper;
