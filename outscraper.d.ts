declare module 'outscraper' {
  export interface RequestParams {
    [key: string]: any;
  }

  export interface OutscraperResponse<T> {
    data: T;
  }

  export interface AsyncResponse {
    requestId?: string;
    error?: string;
    errorMessage?: string;
    data?: any;
    [key: string]: any;
  }

  export class Outscraper {
    constructor(apiKey: string);

    getRequestsHistory(type?: string): Promise<any>;
    getRequestArchive(requestId: string): Promise<any>;
    googleSearch(
      query: string | string[],
      pagesPerQuery?: number,
      uule?: string,
      language?: string,
      region?: string | null
    ): Promise<any>;
    googleMapsSearch(
      query: string | string[],
      limit?: number,
      language?: string,
      region?: string | null,
      skip?: number,
      dropDuplicates?: boolean,
      enrichment?: string | string[] | null
    ): Promise<any>;
    googleMapsReviews(
      query: string | string[],
      reviewsLimit?: number,
      limit?: number,
      sort?: string,
      skip?: number,
      start?: string | null,
      cutoff?: string | null,
      cutoffRating?: number | null,
      ignoreEmpty?: boolean,
      language?: string,
      region?: string | null,
      reviewsQuery?: string | null,
      lastPaginationId?: string | null,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;
    emailsAndContacts(
      query: string | string[],
      preferredContacts?: string | string[] | null
    ): Promise<any>;
    phonesEnricher(query: string | string[]): Promise<any>;
    companyInsights(
      query: string | string[],
      enrichments?: string | string[],
      fields?: string,
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;
    validateEmails(
      query: string | string[],
      asyncRequest?: boolean
    ): Promise<any | AsyncResponse>;
    getGoogleMapsPhotos(
      query: string | string[],
      options?: {
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
    ): Promise<any | AsyncResponse>;
    trustpilot(
      query: string | string[],
      enrichment?: string[] | [],
      fields?: string,
      asyncRequest?: boolean,
      ui?: boolean,
      webhook?: string
    ): Promise<any | AsyncResponse>;
    trustpilotSearch(
      query: string | string[],
      limit?: number,
      skip?: number,
      enrichment?: string[] | [],
      fields?: string,
      asyncRequest?: boolean,
      ui?: boolean,
      webhook?: string
    ): Promise<any | AsyncResponse>;
    trustpilotReviews(
      query: string | string[],
      limit?: number,
      languages?: string,
      sort?: string,
      cutoff?: string | null,
      fields?: string,
      asyncRequest?: boolean,
      ui?: boolean,
      webhook?: string
    ): Promise<any | AsyncResponse>;
    youtubeComments(
      query: string | string[],
      perQuery?: number,
      language?: string,
      region?: string,
      fields?: string,
      asyncRequest?: boolean,
      ui?: boolean,
      webhook?: string
    ): Promise<any | AsyncResponse>;
    yelpReviews(
      query: string | string[],
      limit?: number,
      cursor?: string,
      sort?: string,
      cutoff?: string,
      fields?: string,
      asyncRequest?: boolean,
      ui?: boolean,
      webhook?: string
    ): Promise<any | AsyncResponse>;
    phoneIdentityFinder(query: string | string[]): Promise<any>;
    addressScraper(query: string | string[]): Promise<any>;
    reverseGeocoding(query: string | string[]): Promise<any>;
    geocoding(query: string | string[]): Promise<any>;
    getGlassdoorReviews(
      query: string | string[],
      limit?: number,
      sort?: string,
      cutoff?: string | null
    ): Promise<any>;
    appStoreReviews(
      query: string | string[],
      perQuery?: number,
      limit?: number,
      sort?: string
    ): Promise<any>;
  }
}

export = Outscraper;
