declare module 'outscraper' {
  export interface RequestParams {
    [key: string]: any;
  }

  export interface OutscraperResponse<T> {
    data: T;
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
      lastPaginationId?: string | null
    ): Promise<any>;
    emailsAndContacts(
      query: string | string[],
      preferredContacts?: string | string[] | null
    ): Promise<any>;
    phonesEnricher(query: string | string[]): Promise<any>;
  }
}

export = Outscraper;
