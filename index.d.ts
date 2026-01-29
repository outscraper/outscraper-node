declare module 'outscraper' {
  export interface RequestParams {
    [key: string]: any;
  }

  export interface OutscraperResponse<T> {
    data: T;
  }

  export interface AsyncResponse {
    status?: string;
    id?: string;
    results_location?: string;
    error?: string;
    errorMessage?: string;
    data?: any;
    [key: string]: any;
  }

  export interface GoogleMapsPhotosOptions {
    photosLimit?: number;
    limit?: number;
    tag?: string;
    language?: string;
    region?: string;
    fields?: string;
    async?: boolean;
    ui?: boolean;
    webhook?: string;
  }

  export class Outscraper {
    constructor(apiKey: string);
    getAPIRequest(path: string, parameters: RequestParams): Promise<any>;
    postAPIRequest(path: string, parameters: RequestParams): Promise<any>;
    handleAsyncResponse(response: any, asyncRequest: boolean): any | AsyncResponse;

    getRequestsHistory(type?: string): Promise<any>;
    getRequestArchive(requestId: string): Promise<any>;

    googleSearch(
      query: string | string[],
      pagesPerQuery?: number,
      uule?: string,
      language?: string,
      region?: string | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    googleSearchNews(
      query: string | string[],
      pagesPerQuery?: number,
      uule?: string,
      tbs?: string,
      language?: string,
      region?: string | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    googleMapsSearch(
      query: string | string[],
      limit?: number,
      language?: string,
      region?: string | null,
      skip?: number,
      dropDuplicates?: boolean,
      enrichment?: string | string[] | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    googleMapsSearchV3(
      query: string | string[],
      limit?: number,
      language?: string,
      region?: string | null,
      skip?: number,
      dropDuplicates?: boolean,
      enrichment?: string | string[] | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    googleMapsDirections(
      origin: string | string[],
      destination: string | string[],
      departure_time?: string | null,
      finish_time?: string | null,
      interval?: number,
      travel_mode?: string,
      language?: string,
      region?: string | null,
      fields?: string | string[] | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    googleMapsReviews(
      query: string | string[],
      reviewsLimit?: number,
      reviewsQuery?: string | null,
      limit?: number,
      sort?: string,
      lastPaginationId?: string | null,
      start?: string | null,
      cutoff?: string | null,
      cutoffRating?: number | null,
      ignoreEmpty?: boolean,
      source?: string,
      language?: string,
      region?: string | null,
      fields?: string,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    getGoogleMapsPhotos(
      query: string | string[],
      options?: GoogleMapsPhotosOptions
    ): Promise<any | AsyncResponse>;

    googlePlayReviews(
      query: string | string[],
      reviewsLimit?: number,
      sort?: string,
      cutoff?: string | null,
      rating?: number | null,
      language?: string,
      fields?: string | string[] | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    contactsAndLeads(
      query: string | string[],
      fields?: string | string[] | null,
      asyncRequest?: boolean,
      preferredContacts?: string | string[] | null,
      contactsPerCompany?: number,
      emailsPerContact?: number,
      skipContacts?: number,
      generalEmails?: boolean,
      ui?: boolean,
      webhook?: string | null
  ): Promise<any | AsyncResponse>;

    emailsAndContacts(
      query: string | string[],
      preferredContacts?: string | string[] | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    phonesEnricher(
      query: string | string[],
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    amazonProducts(
      query: string | string[],
      limit?: number,
      domain?: string,
      postalCode?: string,
      fields?: string | string[] | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    amazonReviews(
      query: string | string[],
      limit?: number,
      sort?: string,
      filterByReviewer?: string,
      filterByStar?: string,
      domain?: string | null,
      fields?: string | string[] | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    yelpSearch(
      query: string | string[],
      limit?: number,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    yelpReviews(
      query: string | string[],
      limit?: number,
      cursor?: string,
      sort?: string,
      cutoff?: string,
      fields?: string,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    tripadvisorReviews(
      query: string | string[],
      limit?: number,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    appStoreReviews(
      query: string | string[],
      limit?: number,
      sort?: string,
      cutoff?: string | null,
      fields?: string,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    youtubeComments(
      query: string | string[],
      perQuery?: number,
      language?: string,
      region?: string,
      fields?: string,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    g2Reviews(
      query: string | string[],
      limit?: number,
      sort?: string,
      cutoff?: string | null,
      fields?: string | string[] | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    trustpilotReviews(
      query: string | string[],
      limit?: number,
      languages?: string,
      sort?: string,
      cutoff?: string | null,
      fields?: string,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    trustpilot(
      query: string | string[],
      enrichment?: string[],
      fields?: string,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    trustpilotSearch(
      query: string | string[],
      limit?: number,
      skip?: number,
      enrichment?: string[],
      fields?: string,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    getGlassdoorReviews(
      query: string | string[],
      limit?: number,
      sort?: string,
      cutoff?: string | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    capterraReviews(
      query: string | string[],
      limit?: number,
      sort?: string,
      cutoff?: string | null,
      language?: string,
      region?: string | null,
      fields?: string | string[] | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    geocoding(
      query: string | string[],
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    reverseGeocoding(
      query: string | string[],
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    phoneIdentityFinder(
      query: string | string[],
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    addressScraper(
      query: string | string[],
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    companyInsights(
      query: string | string[],
      fields?: string,
      asyncRequest?: boolean,
      enrichments?: string | string[]
    ): Promise<any | AsyncResponse>;

    validateEmails(
      query: string | string[],
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;

    similarweb(
      query: string | string[],
      fields?: string | string[] | null,
      asyncRequest?: boolean,
      ui?: boolean | null,
      webhook?: string | null
    ): Promise<any | AsyncResponse>;

    companyWebsitesFinder(
      query: string | string[],
      fields?: string | string[] | null,
      asyncRequest?: boolean,
      ui?: boolean | null,
      webhook?: string | null
    ): Promise<any | AsyncResponse>;

    businessesSearch(
      filters?: RequestParams | null,
      limit?: number,
      includeTotal?: boolean,
      cursor?: string | null,
      fields?: string | string[] | null,
      asyncRequest?: boolean,
      ui?: boolean,
      webhook?: string | null
    ): Promise<any | AsyncResponse>;

    businessesIterSearch(
      filters?: RequestParams | null,
      limit?: number,
      fields?: string | string[] | null,
      includeTotal?: boolean
    ): AsyncIterableIterator<any>;

    businessesGet(
      businessId: string,
      fields?: string | string[] | null,
      asyncRequest?: boolean,
      ui?: boolean,
      webhook?: string | null
    ): Promise<any | AsyncResponse>;
  }
}

export = Outscraper;
