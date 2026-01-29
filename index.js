const { Buffer } = require('buffer');
const https = require('https');
const querystring = require('querystring');
const { toArray, removeEmpty, formatQueries } = require('./utils');

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

  postAPIRequest(path, parameters) {
    return new Promise((resolve, reject) => {
      const payload = JSON.stringify(removeEmpty(parameters || {}));

      const req = https.request({
        hostname: this.apiHostname,
        port: '443',
        path,
        method: 'POST',
        headers: {
          'X-API-KEY': this.apiKey,
          'client': 'Node SDK',
          'content-type': 'application/json',
          'content-length': Buffer.byteLength(payload),
        }
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

      req.on('error', (err) => reject(err));

      req.write(payload);
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

  async googleSearchNews(query, pagesPerQuery = 1, uule = '', tbs = '', language = 'en', region = null, asyncRequest = false) {
    const response = await this.getAPIRequest('/google-search-news', {
      query: toArray(query),
      pagesPerQuery,
      uule,
      tbs,
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

  async googleMapsSearchV3(query, limit = 20, language = 'en', region = null, skip = 0, dropDuplicates = false, enrichment = null, asyncRequest = true) {
    const response = await this.getAPIRequest('/maps/search-v3', {
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

  async googleMapsDirections(query, departureTime = null, finishTime = null, interval = null, travelMode = 'best', language = 'en', region = null, fields = null, asyncRequest = true) {
    const response = await this.getAPIRequest('/maps/directions', {
      query: query ? formatQueries(query) : null,
      departure_time: departureTime,
      finish_time: finishTime,
      interval: interval,
      travel_mode: travelMode,
      language: language,
      region: region,
      async: asyncRequest,
      fields: fields ? toArray(fields) : null,
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

  async getGoogleMapsPhotos(query, options = {}) {
    const response = await this.getAPIRequest('/maps/photos-v3', {
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
    });
    return this.handleAsyncResponse(response, options.async);
  }

  async googlePlayReviews(query, reviewsLimit = 100, sort = 'most_relevant', cutoff = null, rating = null, language = 'en', fields = null, asyncRequest = false) {
    const response = await this.getAPIRequest('/google-play/reviews', {
      query: toArray(query),
      limit: reviewsLimit,
      sort: sort,
      cutoff: cutoff,
      rating: rating,
      language: language,
      async: asyncRequest,
      fields: fields ? toArray(fields) : null,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async contactsAndLeads(
    query,
    fields = null,
    asyncRequest = true,
    preferredContacts = null,
    contactsPerCompany = 3,
    emailsPerContact = 1,
    skipContacts = 0,
    generalEmails = false,
    ui = false,
    webhook = null
  ) {
    const response = await this.getAPIRequest('/contacts-and-leads', {
      query: toArray(query),
      fields: fields ? toArray(fields) : null,
      async: asyncRequest,
      preferred_contacts: preferredContacts ? toArray(preferredContacts) : null,
      contacts_per_company: contactsPerCompany,
      emails_per_contact: emailsPerContact,
      skip_contacts: skipContacts,
      general_emails: generalEmails,
      ui,
      webhook,
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

  async amazonProducts(query, limit = 24, domain = 'amazon.com', postalCode = '11201', fields = null, asyncRequest = false) {
    const response = await this.getAPIRequest('/amazon/products-v2', {
      query: toArray(query),
      limit: limit,
      domain: domain,
      postal_code: postalCode,
      async: asyncRequest,
      fields: fields ? toArray(fields) : null,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async amazonReviews(query, limit = 10, sort = 'helpful', filterByReviewer = 'all_reviews', filterByStar = 'all_stars', domain = null, fields = null, asyncRequest = false) {
    const response = await this.getAPIRequest('/amazon/reviews', {
      query: toArray(query),
      limit: limit,
      sort: sort,
      filterByReviewer: filterByReviewer,
      filterByStar: filterByStar,
      domain: domain,
      async: asyncRequest,
      fields: fields ? toArray(fields) : null,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async yelpSearch(query, limit = 100, asyncRequest = false) {
    const response = await this.getAPIRequest('/yelp-search', {
      query: toArray(query),
      limit: limit,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async yelpReviews(query, limit = 100, cursor = '', sort = 'relevance_desc', cutoff = '', fields = '', asyncRequest = false) {
    const response = await this.getAPIRequest('/yelp/reviews', {
      query: toArray(query),
      limit,
      cursor,
      sort,
      cutoff,
      fields,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async tripadvisorReviews(query, limit = 100, asyncRequest = false) {
    const response = await this.getAPIRequest('/tripadvisor-reviews', {
      query: toArray(query),
      limit: limit,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async appStoreReviews(query, limit = 100, sort = 'mosthelpful', cutoff = null, fields = '', asyncRequest = false) {
    const response = await this.getAPIRequest('/appstore/reviews', {
      query: toArray(query),
      limit,
      sort,
      cutoff,
      fields,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async youtubeComments(query, perQuery = 100, language = 'en', region = '', fields = '', asyncRequest = false) {
    const response = await this.getAPIRequest('/youtube-comments', {
      query: toArray(query),
      perQuery,
      language,
      region,
      fields,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async g2Reviews(query, limit = 100, sort = '', cutoff = null, fields = null, asyncRequest = false) {
    const response = await this.getAPIRequest('/g2/reviews', {
      query: toArray(query),
      limit: limit,
      sort: sort,
      cutoff: cutoff,
      async: asyncRequest,
      fields: fields ? toArray(fields) : null,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async trustpilotReviews(query, limit = 100, languages = 'default', sort = '', cutoff = null, fields = '', asyncRequest = false) {
    const response = await this.getAPIRequest('/trustpilot/reviews', {
      query: toArray(query),
      limit,
      languages,
      sort,
      cutoff,
      fields,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async getGlassdoorReviews(query, limit = 100, sort = 'DATE', cutoff = null, asyncRequest = false) {
    const response = await this.getAPIRequest('/glassdoor/reviews', {
      query: toArray(query),
      limit: limit,
      sort: sort,
      cutoff: cutoff,
      async: asyncRequest
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async capterraReviews(query, limit = 100, sort = '', cutoff = null, language = 'en', region = null, fields = null, asyncRequest = false) {
    const response = await this.getAPIRequest('/capterra-reviews', {
      query: toArray(query),
      limit: limit,
      sort: sort,
      cutoff: cutoff,
      language: language,
      region: region,
      async: asyncRequest,
      fields: fields ? toArray(fields) : null,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async geocoding(query, asyncRequest = false) {
    const response = await this.getAPIRequest('/geocoding', {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async reverseGeocoding(query, asyncRequest = false) {
    const response = await this.getAPIRequest('/reverse-geocoding', {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async phoneIdentityFinder(query, asyncRequest = false) {
    const response = await this.getAPIRequest('/whitepages-phones', {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async addressScraper(query, asyncRequest = false) {
    const response = await this.getAPIRequest('/whitepages-addresses', {
      query: Array.isArray(query) ? query : [query],
      async: asyncRequest
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

  async trustpilot(query, enrichment = [], fields = '', asyncRequest = false) {
    const response = await this.getAPIRequest('/trustpilot', {
      query: toArray(query),
      enrichment: enrichment ? toArray(enrichment) : [],
      fields,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async trustpilotSearch(query, limit = 100, skip = 0, enrichment = [], fields = '', asyncRequest = false) {
    const response = await this.getAPIRequest('/trustpilot', {
      query: toArray(query),
      limit,
      skip,
      enrichment: enrichment.length ? enrichment : [],
      fields,
      async: asyncRequest,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async similarweb(query, fields = null, asyncRequest = false, ui = null, webhook = null) {
    const response = await this.getAPIRequest('/similarweb', {
      query: toArray(query),
      fields: fields ? toArray(fields) : null,
      async: asyncRequest,
      ui: ui,
      webhook: webhook,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async companyWebsitesFinder(query, fields = null, asyncRequest = false, ui = null, webhook = null) {
    const response = await this.getAPIRequest('/company-website-finder', {
      query: toArray(query),
      fields: fields ? toArray(fields) : null,
      async: asyncRequest,
      ui: ui,
      webhook: webhook,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async yellowpagesSearch(query, location = 'New York, NY', limit = 100, region = null, enrichment = null, fields = null, asyncRequest = true, ui = null, webhook = null) {
    const response = await this.getAPIRequest('/yellowpages-search', {
      query: toArray(query),
      location: location,
      limit: limit,
      region: region,
      enrichment: enrichment ? toArray(enrichment) : null,
      fields: fields ? toArray(fields) : null,
      async: asyncRequest,
      ui: ui,
      webhook: webhook,
    });
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async businessesSearch(
    filters = {},
    limit = 10,
    includeTotal = false,
    cursor = null,
    fields = null,
    asyncRequest = false,
    ui = false,
    webhook = null
  ) {
    const payload = {
      filters: filters || {},
      limit,
      include_total: includeTotal,
      cursor,
      fields: fields ? toArray(fields) : null,
      async: asyncRequest,
      ui,
      webhook,
    };
    const response = await this.postAPIRequest('/businesses', payload);
    return this.handleAsyncResponse(response, asyncRequest);
  }

  async *businessesIterSearch(filters = {}, limit = 10, fields = null, includeTotal = false) {
    let cursor = null;
    while (true) {
      const response = await this.businessesSearch(
          filters,
          limit,
          includeTotal,
          cursor,
          fields,
          false
      );
      const items = Array.isArray(response.items) ? response.items : [];
      for (const item of items) {
        yield item;
      }

      if (!response['has_more'] || !response['next_cursor'] || items.length === 0) {
        break;
      }
      cursor = response['next_cursor'];
    }
  }

  async businessesGet(
    businessId,
    fields = null,
    asyncRequest = false,
    ui = false,
    webhook = null
  ) {
    if (!businessId) {
      throw new Error('businessId is required');
    }
    const params = {
      fields: Array.isArray(fields) ? fields.join(',') : fields,
      async: asyncRequest,
      ui,
      webhook,
    };
  const response = await this.getAPIRequest(
    `/businesses/${encodeURIComponent(String(businessId))}`,
      params
    );
    return this.handleAsyncResponse(response, asyncRequest);
  }
}

module.exports = Outscraper;
