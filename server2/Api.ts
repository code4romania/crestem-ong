/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiActivityTypeActivityTypeDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A text field */
  name?: string;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.249Z"
   */
  publishedAt: string;
}

export interface MatrixQuestionEntry {
  /** A string field */
  question?: string;
  /** A text field */
  option_1?: string;
  /** A text field */
  option_2?: string;
  /** A text field */
  option_3?: string;
  /** A text field */
  option_4?: string;
  /** A text field */
  option_5?: string;
  /** A string field */
  tag?: string;
}

export interface PluginUsersPermissionsPermissionDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A string field */
  action: string;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.263Z"
   */
  publishedAt: string;
  /** A relational field */
  role?: PluginUsersPermissionsRoleDocument;
}

export interface PluginUsersPermissionsRoleDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A string field */
  name: string;
  /** A string field */
  description?: string;
  /** A string field */
  type?: string;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.262Z"
   */
  publishedAt: string;
  /** A relational field */
  permissions?: PluginUsersPermissionsPermissionDocument[];
  /** A relational field */
  users?: PluginUsersPermissionsUserDocument[];
}

export interface PluginUploadFileDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A string field */
  name: string;
  /** A string field */
  alternativeText?: string;
  /** A string field */
  caption?: string;
  /**
   * An integer field
   * @min -9007199254740991
   * @max 9007199254740991
   */
  width?: number;
  /**
   * An integer field
   * @min -9007199254740991
   * @max 9007199254740991
   */
  height?: number;
  /** A JSON field */
  formats?: any;
  /** A string field */
  hash: string;
  /** A string field */
  ext?: string;
  /** A string field */
  mime: string;
  /** A decimal field */
  size: number;
  /** A string field */
  url: string;
  /** A string field */
  previewUrl?: string;
  /** A string field */
  provider: string;
  /** A JSON field */
  provider_metadata?: any;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.268Z"
   */
  publishedAt: string;
  related: any;
}

export interface EvaluationDimensionEntry {
  /** A text field */
  comment: string;
  /** A component field */
  quiz?: EvaluationQuestionEntry[];
}

export interface EvaluationQuestionEntry {
  /**
   * An integer field
   * @min 0
   * @max 4
   */
  answer: number;
}

export interface ApiEvaluationEvaluationDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /**
   * An email field
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   */
  email: string;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.272Z"
   */
  publishedAt: string;
  /** A component field */
  dimensions?: EvaluationDimensionEntry[];
  /** A relational field */
  report?: ApiReportReportDocument;
}

export interface ApiReportReportDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A date field */
  deadline: string;
  /**
   * A boolean field
   * @default false
   */
  finished: boolean;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.271Z"
   */
  publishedAt: string;
  /** A relational field */
  evaluations?: ApiEvaluationEvaluationDocument[];
  /** A relational field */
  user?: PluginUsersPermissionsUserDocument;
}

export interface ApiDomainDomainDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A string field */
  name?: string;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.275Z"
   */
  publishedAt: string;
  /** A relational field */
  mentors?: PluginUsersPermissionsUserDocument[];
}

export interface ApiProgramProgramDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A string field */
  name: string;
  /** A date field */
  startDate: string;
  /** A date field */
  endDate: string;
  /** A string field */
  sponsorName?: string;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.279Z"
   */
  publishedAt: string;
  /** A relational field */
  mentors?: PluginUsersPermissionsUserDocument[];
  /** A relational field */
  users?: PluginUsersPermissionsUserDocument[];
}

export interface ApiActivityActivityDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A date field */
  startDate: string;
  /** A richtext field */
  notes?: string;
  /**
   * An integer field
   * @min -9007199254740991
   * @max 9007199254740991
   */
  duration?: number;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.281Z"
   */
  publishedAt: string;
  /** A relational field */
  type?: ApiActivityTypeActivityTypeDocument;
  /** A relational field */
  dimension?: ApiDimensionDimensionDocument;
  /** A relational field */
  mentor?: PluginUsersPermissionsUserDocument;
  /** A relational field */
  user?: PluginUsersPermissionsUserDocument;
}

export interface ApiMentorshipRequestMentorshipRequestDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.283Z"
   */
  publishedAt: string;
  /** A relational field */
  mentor?: PluginUsersPermissionsUserDocument;
  /** A relational field */
  user?: PluginUsersPermissionsUserDocument;
}

export interface PluginUsersPermissionsUserDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A string field */
  username: string;
  /**
   * An email field
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   */
  email: string;
  /** A string field */
  provider?: string;
  /**
   * A boolean field
   * @default false
   */
  confirmed: boolean;
  /**
   * A boolean field
   * @default false
   */
  blocked: boolean;
  /** A string field */
  ongName?: string;
  /** A string field */
  ongIdentificationNumber?: string;
  /** A string field */
  county?: string;
  /** A string field */
  city?: string;
  /** A string field */
  phone?: string;
  /** A string field */
  website?: string;
  /** A string field */
  keywords?: string;
  /** A text field */
  description?: string;
  /** A string field */
  contactFirstName?: string;
  /** A string field */
  contactLastName?: string;
  /** A string field */
  contactEmail?: string;
  /** A string field */
  contactPhone?: string;
  /** A string field */
  accountFacebook?: string;
  /** A string field */
  accountTwitter?: string;
  /** A string field */
  accountTiktok?: string;
  /** A string field */
  accountInstagram?: string;
  /** A string field */
  accountLinkedin?: string;
  /** A text field */
  bio?: string;
  /** A text field */
  expertise?: string;
  /** A string field */
  firstName?: string;
  /** A string field */
  lastName?: string;
  /**
   * A boolean field
   * @default false
   */
  available: boolean;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.260Z"
   */
  publishedAt: string;
  /** A relational field */
  role?: PluginUsersPermissionsRoleDocument;
  /** A media field */
  avatar?: PluginUploadFileDocument;
  /** A media field */
  logo?: PluginUploadFileDocument;
  /** A relational field */
  reports?: ApiReportReportDocument[];
  /** A relational field */
  domains?: ApiDomainDomainDocument[];
  /** A relational field */
  programs?: ApiProgramProgramDocument[];
  /** A relational field */
  dimensions?: ApiDimensionDimensionDocument[];
  /** A relational field */
  program?: ApiProgramProgramDocument;
  /** A relational field */
  mentorActivities?: ApiActivityActivityDocument[];
  /** A relational field */
  userActivities?: ApiActivityActivityDocument[];
  /** A relational field */
  mentorSessions?: ApiMentorshipRequestMentorshipRequestDocument[];
  /** A relational field */
  userSessions?: ApiMentorshipRequestMentorshipRequestDocument[];
}

export interface ApiDimensionDimensionDocument {
  /**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   */
  documentId: string;
  id: number;
  /** A string field */
  name: string;
  /** A string field */
  link?: string;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /**
   * A datetime field
   * @default "2025-09-12T06:37:57.251Z"
   */
  publishedAt: string;
  /** A component field */
  quiz?: MatrixQuestionEntry[];
  /** A relational field */
  mentors?: PluginUsersPermissionsUserDocument[];
  /** A relational field */
  activities?: ApiActivityActivityDocument[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title server-2
 * @version 0.1.0
 *
 * API documentation for server-2 v0.1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
 * No description
 *
 * @tags upload
 * @name UploadPost
 * @request POST:/
 * @response `200` `({
  \**
   * @exclusiveMin 0
   * @max 9007199254740991
   *\
    id: number,
  \**
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    name: string,
    alternativeText?: (string | null),
    caption?: (string | null),
  \**
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    width?: number,
  \**
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    height?: number,
    formats?: Record<string,any>,
    hash: string,
    ext?: string,
    mime: string,
    size: number,
    url: string,
    previewUrl?: (string | null),
    folder?: number,
    folderPath: string,
    provider: string,
    provider_metadata?: (Record<string,any> | null),
    createdAt: string,
    updatedAt: string,
    createdBy?: number,
    updatedBy?: number,

} | ({
  \**
   * @exclusiveMin 0
   * @max 9007199254740991
   *\
    id: number,
  \**
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    name: string,
    alternativeText?: (string | null),
    caption?: (string | null),
  \**
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    width?: number,
  \**
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    height?: number,
    formats?: Record<string,any>,
    hash: string,
    ext?: string,
    mime: string,
    size: number,
    url: string,
    previewUrl?: (string | null),
    folder?: number,
    folderPath: string,
    provider: string,
    provider_metadata?: (Record<string,any> | null),
    createdAt: string,
    updatedAt: string,
    createdBy?: number,
    updatedBy?: number,

})[])` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
  uploadPost = (
    query?: {
      /**
       * @exclusiveMin 0
       * @max 9007199254740991
       */
      id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      | {
          /**
           * @exclusiveMin 0
           * @max 9007199254740991
           */
          id: number;
          /**
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          documentId: string;
          name: string;
          alternativeText?: string | null;
          caption?: string | null;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          width?: number;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          height?: number;
          formats?: Record<string, any>;
          hash: string;
          ext?: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string | null;
          folder?: number;
          folderPath: string;
          provider: string;
          provider_metadata?: Record<string, any> | null;
          createdAt: string;
          updatedAt: string;
          createdBy?: number;
          updatedBy?: number;
        }
      | {
          /**
           * @exclusiveMin 0
           * @max 9007199254740991
           */
          id: number;
          /**
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          documentId: string;
          name: string;
          alternativeText?: string | null;
          caption?: string | null;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          width?: number;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          height?: number;
          formats?: Record<string, any>;
          hash: string;
          ext?: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string | null;
          folder?: number;
          folderPath: string;
          provider: string;
          provider_metadata?: Record<string, any> | null;
          createdAt: string;
          updatedAt: string;
          createdBy?: number;
          updatedBy?: number;
        }[],
      void
    >({
      path: `/`,
      method: "POST",
      query: query,
      format: "json",
      ...params,
    });

  activities = {
    /**
 * No description
 *
 * @tags activity
 * @name ActivityGetActivities
 * @request GET:/activities
 * @response `200` `{
    data: ({
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A date field *\
    startDate: string,
  \** A richtext field *\
    notes?: string,
  \**
   * An integer field
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    duration?: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.244Z"
   *\
    publishedAt: string,
  \** A relational field *\
    type?: ApiActivityTypeActivityTypeDocument,
  \** A relational field *\
    dimension?: ApiDimensionDimensionDocument,
  \** A relational field *\
    mentor?: PluginUsersPermissionsUserDocument,
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    activityGetActivities: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "startDate"
          | "notes"
          | "duration"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Filters to apply to the query */
        filters?: Record<
          | "startDate"
          | "notes"
          | "duration"
          | "createdAt"
          | "updatedAt"
          | "publishedAt",
          any
        >;
        _q?: string;
        /** Pagination parameters */
        pagination?: {
          /** Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /**
               * Page number (1-based)
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              page: number;
              /**
               * Number of entries per page
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              pageSize: number;
            }
          | {
              /**
               * Number of entries to skip
               * @min 0
               * @max 9007199254740991
               */
              start: number;
              /**
               * Maximum number of entries to return
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              limit: number;
            }
        );
        /** Sort the result */
        sort?:
          | "startDate"
          | "notes"
          | "duration"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | (
              | "startDate"
              | "notes"
              | "duration"
              | "createdAt"
              | "updatedAt"
              | "publishedAt"
            )[]
          | Record<
              | "startDate"
              | "notes"
              | "duration"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              | "startDate"
              | "notes"
              | "duration"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | "type"
          | "dimension"
          | "mentor"
          | "user"
          | ("type" | "dimension" | "mentor" | "user")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A date field */
            startDate: string;
            /** A richtext field */
            notes?: string;
            /**
             * An integer field
             * @min -9007199254740991
             * @max 9007199254740991
             */
            duration?: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.244Z"
             */
            publishedAt: string;
            /** A relational field */
            type?: ApiActivityTypeActivityTypeDocument;
            /** A relational field */
            dimension?: ApiDimensionDimensionDocument;
            /** A relational field */
            mentor?: PluginUsersPermissionsUserDocument;
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          }[];
        },
        void
      >({
        path: `/activities`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags activity
 * @name ActivityPostActivities
 * @request POST:/activities
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A date field *\
    startDate: string,
  \** A richtext field *\
    notes?: string,
  \**
   * An integer field
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    duration?: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.297Z"
   *\
    publishedAt: string,
  \** A relational field *\
    type?: ApiActivityTypeActivityTypeDocument,
  \** A relational field *\
    dimension?: ApiDimensionDimensionDocument,
  \** A relational field *\
    mentor?: PluginUsersPermissionsUserDocument,
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    activityPostActivities: (
      data: {
        data: {
          /** A date field */
          startDate: string;
          /** A richtext field */
          notes?: string;
          /**
           * A float field
           * @min -9007199254740991
           * @max 9007199254740991
           */
          duration?: number;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.295Z"
           */
          publishedAt: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          type?: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          dimension?: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          mentor?: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          user?: string;
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "startDate"
          | "notes"
          | "duration"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | "type"
          | "dimension"
          | "mentor"
          | "user"
          | ("type" | "dimension" | "mentor" | "user")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A date field */
            startDate: string;
            /** A richtext field */
            notes?: string;
            /**
             * An integer field
             * @min -9007199254740991
             * @max 9007199254740991
             */
            duration?: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.297Z"
             */
            publishedAt: string;
            /** A relational field */
            type?: ApiActivityTypeActivityTypeDocument;
            /** A relational field */
            dimension?: ApiDimensionDimensionDocument;
            /** A relational field */
            mentor?: PluginUsersPermissionsUserDocument;
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/activities`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags activity
 * @name ActivityGetActivitiesById
 * @request GET:/activities/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A date field *\
    startDate: string,
  \** A richtext field *\
    notes?: string,
  \**
   * An integer field
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    duration?: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.289Z"
   *\
    publishedAt: string,
  \** A relational field *\
    type?: ApiActivityTypeActivityTypeDocument,
  \** A relational field *\
    dimension?: ApiDimensionDimensionDocument,
  \** A relational field *\
    mentor?: PluginUsersPermissionsUserDocument,
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    activityGetActivitiesById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "startDate"
          | "notes"
          | "duration"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | "type"
          | "dimension"
          | "mentor"
          | "user"
          | ("type" | "dimension" | "mentor" | "user")[];
        /** Filters to apply to the query */
        filters?: Record<
          | "startDate"
          | "notes"
          | "duration"
          | "createdAt"
          | "updatedAt"
          | "publishedAt",
          any
        >;
        /** Sort the result */
        sort?:
          | "startDate"
          | "notes"
          | "duration"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | (
              | "startDate"
              | "notes"
              | "duration"
              | "createdAt"
              | "updatedAt"
              | "publishedAt"
            )[]
          | Record<
              | "startDate"
              | "notes"
              | "duration"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              | "startDate"
              | "notes"
              | "duration"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A date field */
            startDate: string;
            /** A richtext field */
            notes?: string;
            /**
             * An integer field
             * @min -9007199254740991
             * @max 9007199254740991
             */
            duration?: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.289Z"
             */
            publishedAt: string;
            /** A relational field */
            type?: ApiActivityTypeActivityTypeDocument;
            /** A relational field */
            dimension?: ApiDimensionDimensionDocument;
            /** A relational field */
            mentor?: PluginUsersPermissionsUserDocument;
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/activities/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags activity
 * @name ActivityPutActivitiesById
 * @request PUT:/activities/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A date field *\
    startDate: string,
  \** A richtext field *\
    notes?: string,
  \**
   * An integer field
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    duration?: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.304Z"
   *\
    publishedAt: string,
  \** A relational field *\
    type?: ApiActivityTypeActivityTypeDocument,
  \** A relational field *\
    dimension?: ApiDimensionDimensionDocument,
  \** A relational field *\
    mentor?: PluginUsersPermissionsUserDocument,
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    activityPutActivitiesById: (
      id: string,
      data: {
        data: {
          /** A date field */
          startDate?: string;
          /** A richtext field */
          notes?: string;
          /**
           * A float field
           * @min -9007199254740991
           * @max 9007199254740991
           */
          duration?: number;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.302Z"
           */
          publishedAt?: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          type?: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          dimension?: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          mentor?: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          user?: string;
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "startDate"
          | "notes"
          | "duration"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | "type"
          | "dimension"
          | "mentor"
          | "user"
          | ("type" | "dimension" | "mentor" | "user")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A date field */
            startDate: string;
            /** A richtext field */
            notes?: string;
            /**
             * An integer field
             * @min -9007199254740991
             * @max 9007199254740991
             */
            duration?: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.304Z"
             */
            publishedAt: string;
            /** A relational field */
            type?: ApiActivityTypeActivityTypeDocument;
            /** A relational field */
            dimension?: ApiDimensionDimensionDocument;
            /** A relational field */
            mentor?: PluginUsersPermissionsUserDocument;
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/activities/${id}`,
        method: "PUT",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags activity
 * @name ActivityDeleteActivitiesById
 * @request DELETE:/activities/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A date field *\
    startDate: string,
  \** A richtext field *\
    notes?: string,
  \**
   * An integer field
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    duration?: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.307Z"
   *\
    publishedAt: string,
  \** A relational field *\
    type?: ApiActivityTypeActivityTypeDocument,
  \** A relational field *\
    dimension?: ApiDimensionDimensionDocument,
  \** A relational field *\
    mentor?: PluginUsersPermissionsUserDocument,
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    activityDeleteActivitiesById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "startDate"
          | "notes"
          | "duration"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | "type"
          | "dimension"
          | "mentor"
          | "user"
          | ("type" | "dimension" | "mentor" | "user")[];
        /** Filters to apply to the query */
        filters?: Record<
          | "startDate"
          | "notes"
          | "duration"
          | "createdAt"
          | "updatedAt"
          | "publishedAt",
          any
        >;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A date field */
            startDate: string;
            /** A richtext field */
            notes?: string;
            /**
             * An integer field
             * @min -9007199254740991
             * @max 9007199254740991
             */
            duration?: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.307Z"
             */
            publishedAt: string;
            /** A relational field */
            type?: ApiActivityTypeActivityTypeDocument;
            /** A relational field */
            dimension?: ApiDimensionDimensionDocument;
            /** A relational field */
            mentor?: PluginUsersPermissionsUserDocument;
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/activities/${id}`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),
  };
  activityTypes = {
    /**
 * No description
 *
 * @tags activity-type
 * @name ActivityTypeGetActivityTypes
 * @request GET:/activity-types
 * @response `200` `{
    data: ({
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A text field *\
    name?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.313Z"
   *\
    publishedAt: string,

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    activityTypeGetActivityTypes: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Filters to apply to the query */
        filters?: Record<
          "name" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
        _q?: string;
        /** Pagination parameters */
        pagination?: {
          /** Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /**
               * Page number (1-based)
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              page: number;
              /**
               * Number of entries per page
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              pageSize: number;
            }
          | {
              /**
               * Number of entries to skip
               * @min 0
               * @max 9007199254740991
               */
              start: number;
              /**
               * Maximum number of entries to return
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              limit: number;
            }
        );
        /** Sort the result */
        sort?:
          | "name"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")[]
          | Record<
              "name" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              "name" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | string | string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A text field */
            name?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.313Z"
             */
            publishedAt: string;
          }[];
        },
        void
      >({
        path: `/activity-types`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags activity-type
 * @name ActivityTypePostActivityTypes
 * @request POST:/activity-types
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A text field *\
    name?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.327Z"
   *\
    publishedAt: string,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    activityTypePostActivityTypes: (
      data: {
        data: {
          /** A text field */
          name?: string;
          /**
           * A datetime field
           * @default "2025-09-12T06:38:03.737Z"
           */
          publishedAt: string;
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | string | string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A text field */
            name?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.327Z"
             */
            publishedAt: string;
          };
        },
        void
      >({
        path: `/activity-types`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags activity-type
 * @name ActivityTypeGetActivityTypesById
 * @request GET:/activity-types/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A text field *\
    name?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.321Z"
   *\
    publishedAt: string,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    activityTypeGetActivityTypesById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | string | string[];
        /** Filters to apply to the query */
        filters?: Record<
          "name" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
        /** Sort the result */
        sort?:
          | "name"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")[]
          | Record<
              "name" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              "name" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A text field */
            name?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.321Z"
             */
            publishedAt: string;
          };
        },
        void
      >({
        path: `/activity-types/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags activity-type
 * @name ActivityTypePutActivityTypesById
 * @request PUT:/activity-types/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A text field *\
    name?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.332Z"
   *\
    publishedAt: string,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    activityTypePutActivityTypesById: (
      id: string,
      data: {
        data: {
          /** A text field */
          name?: string;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.330Z"
           */
          publishedAt?: string;
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | string | string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A text field */
            name?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.332Z"
             */
            publishedAt: string;
          };
        },
        void
      >({
        path: `/activity-types/${id}`,
        method: "PUT",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags activity-type
 * @name ActivityTypeDeleteActivityTypesById
 * @request DELETE:/activity-types/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A text field *\
    name?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.336Z"
   *\
    publishedAt: string,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    activityTypeDeleteActivityTypesById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | string | string[];
        /** Filters to apply to the query */
        filters?: Record<
          "name" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A text field */
            name?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.336Z"
             */
            publishedAt: string;
          };
        },
        void
      >({
        path: `/activity-types/${id}`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),
  };
  dimensions = {
    /**
 * No description
 *
 * @tags dimension
 * @name DimensionGetDimensions
 * @request GET:/dimensions
 * @response `200` `{
    data: ({
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name: string,
  \** A string field *\
    link?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.347Z"
   *\
    publishedAt: string,
  \** A component field *\
    quiz?: (MatrixQuestionEntry)[],
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],
  \** A relational field *\
    activities?: (ApiActivityActivityDocument)[],

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    dimensionGetDimensions: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "name"
          | "link"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Filters to apply to the query */
        filters?: Record<
          "name" | "link" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
        _q?: string;
        /** Pagination parameters */
        pagination?: {
          /** Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /**
               * Page number (1-based)
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              page: number;
              /**
               * Number of entries per page
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              pageSize: number;
            }
          | {
              /**
               * Number of entries to skip
               * @min 0
               * @max 9007199254740991
               */
              start: number;
              /**
               * Maximum number of entries to return
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              limit: number;
            }
        );
        /** Sort the result */
        sort?:
          | "name"
          | "link"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | ("name" | "link" | "createdAt" | "updatedAt" | "publishedAt")[]
          | Record<
              "name" | "link" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              "name" | "link" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | "quiz"
          | "mentors"
          | "activities"
          | ("quiz" | "mentors" | "activities")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name: string;
            /** A string field */
            link?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.347Z"
             */
            publishedAt: string;
            /** A component field */
            quiz?: MatrixQuestionEntry[];
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
            /** A relational field */
            activities?: ApiActivityActivityDocument[];
          }[];
        },
        void
      >({
        path: `/dimensions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags dimension
 * @name DimensionPostDimensions
 * @request POST:/dimensions
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name: string,
  \** A string field *\
    link?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.367Z"
   *\
    publishedAt: string,
  \** A component field *\
    quiz?: (MatrixQuestionEntry)[],
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],
  \** A relational field *\
    activities?: (ApiActivityActivityDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    dimensionPostDimensions: (
      data: {
        data: {
          /** A string field */
          name: string;
          /** A string field */
          link?: string;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.365Z"
           */
          publishedAt: string;
          /** A component field */
          quiz?: any[];
          /** A relational field */
          mentors?: string[];
          /** A relational field */
          activities?: string[];
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "name"
          | "link"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | "quiz"
          | "mentors"
          | "activities"
          | ("quiz" | "mentors" | "activities")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name: string;
            /** A string field */
            link?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.367Z"
             */
            publishedAt: string;
            /** A component field */
            quiz?: MatrixQuestionEntry[];
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
            /** A relational field */
            activities?: ApiActivityActivityDocument[];
          };
        },
        void
      >({
        path: `/dimensions`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags dimension
 * @name DimensionGetDimensionsById
 * @request GET:/dimensions/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name: string,
  \** A string field *\
    link?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.354Z"
   *\
    publishedAt: string,
  \** A component field *\
    quiz?: (MatrixQuestionEntry)[],
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],
  \** A relational field *\
    activities?: (ApiActivityActivityDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    dimensionGetDimensionsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "name"
          | "link"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | "quiz"
          | "mentors"
          | "activities"
          | ("quiz" | "mentors" | "activities")[];
        /** Filters to apply to the query */
        filters?: Record<
          "name" | "link" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
        /** Sort the result */
        sort?:
          | "name"
          | "link"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | ("name" | "link" | "createdAt" | "updatedAt" | "publishedAt")[]
          | Record<
              "name" | "link" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              "name" | "link" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name: string;
            /** A string field */
            link?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.354Z"
             */
            publishedAt: string;
            /** A component field */
            quiz?: MatrixQuestionEntry[];
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
            /** A relational field */
            activities?: ApiActivityActivityDocument[];
          };
        },
        void
      >({
        path: `/dimensions/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags dimension
 * @name DimensionPutDimensionsById
 * @request PUT:/dimensions/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name: string,
  \** A string field *\
    link?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.371Z"
   *\
    publishedAt: string,
  \** A component field *\
    quiz?: (MatrixQuestionEntry)[],
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],
  \** A relational field *\
    activities?: (ApiActivityActivityDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    dimensionPutDimensionsById: (
      id: string,
      data: {
        data: {
          /** A string field */
          name?: string;
          /** A string field */
          link?: string;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.370Z"
           */
          publishedAt?: string;
          /** A component field */
          quiz?: any[];
          /** A relational field */
          mentors?: string[];
          /** A relational field */
          activities?: string[];
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "name"
          | "link"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | "quiz"
          | "mentors"
          | "activities"
          | ("quiz" | "mentors" | "activities")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name: string;
            /** A string field */
            link?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.371Z"
             */
            publishedAt: string;
            /** A component field */
            quiz?: MatrixQuestionEntry[];
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
            /** A relational field */
            activities?: ApiActivityActivityDocument[];
          };
        },
        void
      >({
        path: `/dimensions/${id}`,
        method: "PUT",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags dimension
 * @name DimensionDeleteDimensionsById
 * @request DELETE:/dimensions/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name: string,
  \** A string field *\
    link?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.374Z"
   *\
    publishedAt: string,
  \** A component field *\
    quiz?: (MatrixQuestionEntry)[],
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],
  \** A relational field *\
    activities?: (ApiActivityActivityDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    dimensionDeleteDimensionsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "name"
          | "link"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | "quiz"
          | "mentors"
          | "activities"
          | ("quiz" | "mentors" | "activities")[];
        /** Filters to apply to the query */
        filters?: Record<
          "name" | "link" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name: string;
            /** A string field */
            link?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.374Z"
             */
            publishedAt: string;
            /** A component field */
            quiz?: MatrixQuestionEntry[];
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
            /** A relational field */
            activities?: ApiActivityActivityDocument[];
          };
        },
        void
      >({
        path: `/dimensions/${id}`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),
  };
  domains = {
    /**
 * No description
 *
 * @tags domain
 * @name DomainGetDomains
 * @request GET:/domains
 * @response `200` `{
    data: ({
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.379Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    domainGetDomains: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Filters to apply to the query */
        filters?: Record<
          "name" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
        _q?: string;
        /** Pagination parameters */
        pagination?: {
          /** Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /**
               * Page number (1-based)
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              page: number;
              /**
               * Number of entries per page
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              pageSize: number;
            }
          | {
              /**
               * Number of entries to skip
               * @min 0
               * @max 9007199254740991
               */
              start: number;
              /**
               * Maximum number of entries to return
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              limit: number;
            }
        );
        /** Sort the result */
        sort?:
          | "name"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")[]
          | Record<
              "name" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              "name" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentors" | "mentors"[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.379Z"
             */
            publishedAt: string;
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
          }[];
        },
        void
      >({
        path: `/domains`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags domain
 * @name DomainPostDomains
 * @request POST:/domains
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.389Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    domainPostDomains: (
      data: {
        data: {
          /** A string field */
          name?: string;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.388Z"
           */
          publishedAt: string;
          /** A relational field */
          mentors?: string[];
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentors" | "mentors"[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.389Z"
             */
            publishedAt: string;
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
          };
        },
        void
      >({
        path: `/domains`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags domain
 * @name DomainGetDomainsById
 * @request GET:/domains/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.384Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    domainGetDomainsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentors" | "mentors"[];
        /** Filters to apply to the query */
        filters?: Record<
          "name" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
        /** Sort the result */
        sort?:
          | "name"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | ("name" | "createdAt" | "updatedAt" | "publishedAt")[]
          | Record<
              "name" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              "name" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.384Z"
             */
            publishedAt: string;
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
          };
        },
        void
      >({
        path: `/domains/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags domain
 * @name DomainPutDomainsById
 * @request PUT:/domains/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.392Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    domainPutDomainsById: (
      id: string,
      data: {
        data: {
          /** A string field */
          name?: string;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.391Z"
           */
          publishedAt?: string;
          /** A relational field */
          mentors?: string[];
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentors" | "mentors"[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.392Z"
             */
            publishedAt: string;
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
          };
        },
        void
      >({
        path: `/domains/${id}`,
        method: "PUT",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags domain
 * @name DomainDeleteDomainsById
 * @request DELETE:/domains/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.395Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    domainDeleteDomainsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("name" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentors" | "mentors"[];
        /** Filters to apply to the query */
        filters?: Record<
          "name" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.395Z"
             */
            publishedAt: string;
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
          };
        },
        void
      >({
        path: `/domains/${id}`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),
  };
  evaluations = {
    /**
 * No description
 *
 * @tags evaluation
 * @name EvaluationGetEvaluations
 * @request GET:/evaluations
 * @response `200` `{
    data: ({
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \**
   * An email field
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   *\
    email: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.400Z"
   *\
    publishedAt: string,
  \** A component field *\
    dimensions?: (EvaluationDimensionEntry)[],
  \** A relational field *\
    report?: ApiReportReportDocument,

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    evaluationGetEvaluations: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("email" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Filters to apply to the query */
        filters?: Record<
          "email" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
        _q?: string;
        /** Pagination parameters */
        pagination?: {
          /** Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /**
               * Page number (1-based)
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              page: number;
              /**
               * Number of entries per page
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              pageSize: number;
            }
          | {
              /**
               * Number of entries to skip
               * @min 0
               * @max 9007199254740991
               */
              start: number;
              /**
               * Maximum number of entries to return
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              limit: number;
            }
        );
        /** Sort the result */
        sort?:
          | "email"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | ("email" | "createdAt" | "updatedAt" | "publishedAt")[]
          | Record<
              "email" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              "email" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "dimensions" | "report" | ("dimensions" | "report")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /**
             * An email field
             * @format email
             * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
             */
            email: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.400Z"
             */
            publishedAt: string;
            /** A component field */
            dimensions?: EvaluationDimensionEntry[];
            /** A relational field */
            report?: ApiReportReportDocument;
          }[];
        },
        void
      >({
        path: `/evaluations`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags evaluation
 * @name EvaluationPostEvaluations
 * @request POST:/evaluations
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \**
   * An email field
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   *\
    email: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.409Z"
   *\
    publishedAt: string,
  \** A component field *\
    dimensions?: (EvaluationDimensionEntry)[],
  \** A relational field *\
    report?: ApiReportReportDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    evaluationPostEvaluations: (
      data: {
        data: {
          /**
           * An email field
           * @format email
           * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
           */
          email: string;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.408Z"
           */
          publishedAt: string;
          /** A component field */
          dimensions?: any[];
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          report?: string;
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("email" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "dimensions" | "report" | ("dimensions" | "report")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /**
             * An email field
             * @format email
             * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
             */
            email: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.409Z"
             */
            publishedAt: string;
            /** A component field */
            dimensions?: EvaluationDimensionEntry[];
            /** A relational field */
            report?: ApiReportReportDocument;
          };
        },
        void
      >({
        path: `/evaluations`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags evaluation
 * @name EvaluationGetEvaluationsById
 * @request GET:/evaluations/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \**
   * An email field
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   *\
    email: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.406Z"
   *\
    publishedAt: string,
  \** A component field *\
    dimensions?: (EvaluationDimensionEntry)[],
  \** A relational field *\
    report?: ApiReportReportDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    evaluationGetEvaluationsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("email" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "dimensions" | "report" | ("dimensions" | "report")[];
        /** Filters to apply to the query */
        filters?: Record<
          "email" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
        /** Sort the result */
        sort?:
          | "email"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | ("email" | "createdAt" | "updatedAt" | "publishedAt")[]
          | Record<
              "email" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              "email" | "createdAt" | "updatedAt" | "publishedAt",
              "asc" | "desc"
            >[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /**
             * An email field
             * @format email
             * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
             */
            email: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.406Z"
             */
            publishedAt: string;
            /** A component field */
            dimensions?: EvaluationDimensionEntry[];
            /** A relational field */
            report?: ApiReportReportDocument;
          };
        },
        void
      >({
        path: `/evaluations/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags evaluation
 * @name EvaluationPutEvaluationsById
 * @request PUT:/evaluations/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \**
   * An email field
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   *\
    email: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.413Z"
   *\
    publishedAt: string,
  \** A component field *\
    dimensions?: (EvaluationDimensionEntry)[],
  \** A relational field *\
    report?: ApiReportReportDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    evaluationPutEvaluationsById: (
      id: string,
      data: {
        data: {
          /**
           * An email field
           * @format email
           * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
           */
          email?: string;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.411Z"
           */
          publishedAt?: string;
          /** A component field */
          dimensions?: any[];
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          report?: string;
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("email" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "dimensions" | "report" | ("dimensions" | "report")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /**
             * An email field
             * @format email
             * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
             */
            email: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.413Z"
             */
            publishedAt: string;
            /** A component field */
            dimensions?: EvaluationDimensionEntry[];
            /** A relational field */
            report?: ApiReportReportDocument;
          };
        },
        void
      >({
        path: `/evaluations/${id}`,
        method: "PUT",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags evaluation
 * @name EvaluationDeleteEvaluationsById
 * @request DELETE:/evaluations/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \**
   * An email field
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   *\
    email: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.416Z"
   *\
    publishedAt: string,
  \** A component field *\
    dimensions?: (EvaluationDimensionEntry)[],
  \** A relational field *\
    report?: ApiReportReportDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    evaluationDeleteEvaluationsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("email" | "createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "dimensions" | "report" | ("dimensions" | "report")[];
        /** Filters to apply to the query */
        filters?: Record<
          "email" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /**
             * An email field
             * @format email
             * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
             */
            email: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.416Z"
             */
            publishedAt: string;
            /** A component field */
            dimensions?: EvaluationDimensionEntry[];
            /** A relational field */
            report?: ApiReportReportDocument;
          };
        },
        void
      >({
        path: `/evaluations/${id}`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),
  };
  matrix = {
    /**
 * No description
 *
 * @tags matrix
 * @name MatrixGetMatrix
 * @request GET:/matrix
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.421Z"
   *\
    publishedAt: string,
  \** A relational field *\
    dimensions?: (ApiDimensionDimensionDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    matrixGetMatrix: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "dimensions" | "dimensions"[];
        /** Filters to apply to the query */
        filters?: Record<"createdAt" | "updatedAt" | "publishedAt", any>;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.421Z"
             */
            publishedAt: string;
            /** A relational field */
            dimensions?: ApiDimensionDimensionDocument[];
          };
        },
        void
      >({
        path: `/matrix`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags matrix
 * @name MatrixPutMatrix
 * @request PUT:/matrix
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.424Z"
   *\
    publishedAt: string,
  \** A relational field *\
    dimensions?: (ApiDimensionDimensionDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    matrixPutMatrix: (
      data: {
        data: {
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.423Z"
           */
          publishedAt?: string;
          /** A relational field */
          dimensions?: string[];
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "dimensions" | "dimensions"[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.424Z"
             */
            publishedAt: string;
            /** A relational field */
            dimensions?: ApiDimensionDimensionDocument[];
          };
        },
        void
      >({
        path: `/matrix`,
        method: "PUT",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags matrix
 * @name MatrixDeleteMatrix
 * @request DELETE:/matrix
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.426Z"
   *\
    publishedAt: string,
  \** A relational field *\
    dimensions?: (ApiDimensionDimensionDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    matrixDeleteMatrix: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "dimensions" | "dimensions"[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.426Z"
             */
            publishedAt: string;
            /** A relational field */
            dimensions?: ApiDimensionDimensionDocument[];
          };
        },
        void
      >({
        path: `/matrix`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),
  };
  mentorshipRequests = {
    /**
 * No description
 *
 * @tags mentorship-request
 * @name MentorshipRequestGetMentorshipRequests
 * @request GET:/mentorship-requests
 * @response `200` `{
    data: ({
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.430Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentor?: PluginUsersPermissionsUserDocument,
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    mentorshipRequestGetMentorshipRequests: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("createdAt" | "updatedAt" | "publishedAt")[];
        /** Filters to apply to the query */
        filters?: Record<"createdAt" | "updatedAt" | "publishedAt", any>;
        _q?: string;
        /** Pagination parameters */
        pagination?: {
          /** Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /**
               * Page number (1-based)
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              page: number;
              /**
               * Number of entries per page
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              pageSize: number;
            }
          | {
              /**
               * Number of entries to skip
               * @min 0
               * @max 9007199254740991
               */
              start: number;
              /**
               * Maximum number of entries to return
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              limit: number;
            }
        );
        /** Sort the result */
        sort?:
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | ("createdAt" | "updatedAt" | "publishedAt")[]
          | Record<"createdAt" | "updatedAt" | "publishedAt", "asc" | "desc">
          | Record<"createdAt" | "updatedAt" | "publishedAt", "asc" | "desc">[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentor" | "user" | ("mentor" | "user")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.430Z"
             */
            publishedAt: string;
            /** A relational field */
            mentor?: PluginUsersPermissionsUserDocument;
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          }[];
        },
        void
      >({
        path: `/mentorship-requests`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags mentorship-request
 * @name MentorshipRequestPostMentorshipRequests
 * @request POST:/mentorship-requests
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.439Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentor?: PluginUsersPermissionsUserDocument,
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    mentorshipRequestPostMentorshipRequests: (
      data: {
        data: {
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.438Z"
           */
          publishedAt: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          mentor?: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          user?: string;
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentor" | "user" | ("mentor" | "user")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.439Z"
             */
            publishedAt: string;
            /** A relational field */
            mentor?: PluginUsersPermissionsUserDocument;
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/mentorship-requests`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags mentorship-request
 * @name MentorshipRequestGetMentorshipRequestsById
 * @request GET:/mentorship-requests/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.433Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentor?: PluginUsersPermissionsUserDocument,
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    mentorshipRequestGetMentorshipRequestsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentor" | "user" | ("mentor" | "user")[];
        /** Filters to apply to the query */
        filters?: Record<"createdAt" | "updatedAt" | "publishedAt", any>;
        /** Sort the result */
        sort?:
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | ("createdAt" | "updatedAt" | "publishedAt")[]
          | Record<"createdAt" | "updatedAt" | "publishedAt", "asc" | "desc">
          | Record<"createdAt" | "updatedAt" | "publishedAt", "asc" | "desc">[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.433Z"
             */
            publishedAt: string;
            /** A relational field */
            mentor?: PluginUsersPermissionsUserDocument;
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/mentorship-requests/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags mentorship-request
 * @name MentorshipRequestPutMentorshipRequestsById
 * @request PUT:/mentorship-requests/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.441Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentor?: PluginUsersPermissionsUserDocument,
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    mentorshipRequestPutMentorshipRequestsById: (
      id: string,
      data: {
        data: {
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.440Z"
           */
          publishedAt?: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          mentor?: string;
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          user?: string;
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentor" | "user" | ("mentor" | "user")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.441Z"
             */
            publishedAt: string;
            /** A relational field */
            mentor?: PluginUsersPermissionsUserDocument;
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/mentorship-requests/${id}`,
        method: "PUT",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags mentorship-request
 * @name MentorshipRequestDeleteMentorshipRequestsById
 * @request DELETE:/mentorship-requests/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.442Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentor?: PluginUsersPermissionsUserDocument,
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    mentorshipRequestDeleteMentorshipRequestsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ("createdAt" | "updatedAt" | "publishedAt")[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentor" | "user" | ("mentor" | "user")[];
        /** Filters to apply to the query */
        filters?: Record<"createdAt" | "updatedAt" | "publishedAt", any>;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.442Z"
             */
            publishedAt: string;
            /** A relational field */
            mentor?: PluginUsersPermissionsUserDocument;
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/mentorship-requests/${id}`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),
  };
  programs = {
    /**
 * No description
 *
 * @tags program
 * @name ProgramGetPrograms
 * @request GET:/programs
 * @response `200` `{
    data: ({
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name: string,
  \** A date field *\
    startDate: string,
  \** A date field *\
    endDate: string,
  \** A string field *\
    sponsorName?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.449Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],
  \** A relational field *\
    users?: (PluginUsersPermissionsUserDocument)[],

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    programGetPrograms: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "name"
          | "startDate"
          | "endDate"
          | "sponsorName"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Filters to apply to the query */
        filters?: Record<
          | "name"
          | "startDate"
          | "endDate"
          | "sponsorName"
          | "createdAt"
          | "updatedAt"
          | "publishedAt",
          any
        >;
        _q?: string;
        /** Pagination parameters */
        pagination?: {
          /** Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /**
               * Page number (1-based)
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              page: number;
              /**
               * Number of entries per page
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              pageSize: number;
            }
          | {
              /**
               * Number of entries to skip
               * @min 0
               * @max 9007199254740991
               */
              start: number;
              /**
               * Maximum number of entries to return
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              limit: number;
            }
        );
        /** Sort the result */
        sort?:
          | "name"
          | "startDate"
          | "endDate"
          | "sponsorName"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | (
              | "name"
              | "startDate"
              | "endDate"
              | "sponsorName"
              | "createdAt"
              | "updatedAt"
              | "publishedAt"
            )[]
          | Record<
              | "name"
              | "startDate"
              | "endDate"
              | "sponsorName"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              | "name"
              | "startDate"
              | "endDate"
              | "sponsorName"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentors" | "users" | ("mentors" | "users")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name: string;
            /** A date field */
            startDate: string;
            /** A date field */
            endDate: string;
            /** A string field */
            sponsorName?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.449Z"
             */
            publishedAt: string;
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
            /** A relational field */
            users?: PluginUsersPermissionsUserDocument[];
          }[];
        },
        void
      >({
        path: `/programs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags program
 * @name ProgramPostPrograms
 * @request POST:/programs
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name: string,
  \** A date field *\
    startDate: string,
  \** A date field *\
    endDate: string,
  \** A string field *\
    sponsorName?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.456Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],
  \** A relational field *\
    users?: (PluginUsersPermissionsUserDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    programPostPrograms: (
      data: {
        data: {
          /** A string field */
          name: string;
          /** A date field */
          startDate: string;
          /** A date field */
          endDate: string;
          /** A string field */
          sponsorName?: string;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.455Z"
           */
          publishedAt: string;
          /** A relational field */
          mentors?: string[];
          /** A relational field */
          users?: string[];
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "name"
          | "startDate"
          | "endDate"
          | "sponsorName"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentors" | "users" | ("mentors" | "users")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name: string;
            /** A date field */
            startDate: string;
            /** A date field */
            endDate: string;
            /** A string field */
            sponsorName?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.456Z"
             */
            publishedAt: string;
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
            /** A relational field */
            users?: PluginUsersPermissionsUserDocument[];
          };
        },
        void
      >({
        path: `/programs`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags program
 * @name ProgramGetProgramsById
 * @request GET:/programs/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name: string,
  \** A date field *\
    startDate: string,
  \** A date field *\
    endDate: string,
  \** A string field *\
    sponsorName?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.453Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],
  \** A relational field *\
    users?: (PluginUsersPermissionsUserDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    programGetProgramsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "name"
          | "startDate"
          | "endDate"
          | "sponsorName"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentors" | "users" | ("mentors" | "users")[];
        /** Filters to apply to the query */
        filters?: Record<
          | "name"
          | "startDate"
          | "endDate"
          | "sponsorName"
          | "createdAt"
          | "updatedAt"
          | "publishedAt",
          any
        >;
        /** Sort the result */
        sort?:
          | "name"
          | "startDate"
          | "endDate"
          | "sponsorName"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | (
              | "name"
              | "startDate"
              | "endDate"
              | "sponsorName"
              | "createdAt"
              | "updatedAt"
              | "publishedAt"
            )[]
          | Record<
              | "name"
              | "startDate"
              | "endDate"
              | "sponsorName"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              | "name"
              | "startDate"
              | "endDate"
              | "sponsorName"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name: string;
            /** A date field */
            startDate: string;
            /** A date field */
            endDate: string;
            /** A string field */
            sponsorName?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.453Z"
             */
            publishedAt: string;
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
            /** A relational field */
            users?: PluginUsersPermissionsUserDocument[];
          };
        },
        void
      >({
        path: `/programs/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags program
 * @name ProgramPutProgramsById
 * @request PUT:/programs/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name: string,
  \** A date field *\
    startDate: string,
  \** A date field *\
    endDate: string,
  \** A string field *\
    sponsorName?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.463Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],
  \** A relational field *\
    users?: (PluginUsersPermissionsUserDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    programPutProgramsById: (
      id: string,
      data: {
        data: {
          /** A string field */
          name?: string;
          /** A date field */
          startDate?: string;
          /** A date field */
          endDate?: string;
          /** A string field */
          sponsorName?: string;
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.458Z"
           */
          publishedAt?: string;
          /** A relational field */
          mentors?: string[];
          /** A relational field */
          users?: string[];
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "name"
          | "startDate"
          | "endDate"
          | "sponsorName"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentors" | "users" | ("mentors" | "users")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name: string;
            /** A date field */
            startDate: string;
            /** A date field */
            endDate: string;
            /** A string field */
            sponsorName?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.463Z"
             */
            publishedAt: string;
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
            /** A relational field */
            users?: PluginUsersPermissionsUserDocument[];
          };
        },
        void
      >({
        path: `/programs/${id}`,
        method: "PUT",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags program
 * @name ProgramDeleteProgramsById
 * @request DELETE:/programs/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A string field *\
    name: string,
  \** A date field *\
    startDate: string,
  \** A date field *\
    endDate: string,
  \** A string field *\
    sponsorName?: string,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.465Z"
   *\
    publishedAt: string,
  \** A relational field *\
    mentors?: (PluginUsersPermissionsUserDocument)[],
  \** A relational field *\
    users?: (PluginUsersPermissionsUserDocument)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    programDeleteProgramsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "name"
          | "startDate"
          | "endDate"
          | "sponsorName"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "mentors" | "users" | ("mentors" | "users")[];
        /** Filters to apply to the query */
        filters?: Record<
          | "name"
          | "startDate"
          | "endDate"
          | "sponsorName"
          | "createdAt"
          | "updatedAt"
          | "publishedAt",
          any
        >;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A string field */
            name: string;
            /** A date field */
            startDate: string;
            /** A date field */
            endDate: string;
            /** A string field */
            sponsorName?: string;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.465Z"
             */
            publishedAt: string;
            /** A relational field */
            mentors?: PluginUsersPermissionsUserDocument[];
            /** A relational field */
            users?: PluginUsersPermissionsUserDocument[];
          };
        },
        void
      >({
        path: `/programs/${id}`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),
  };
  reports = {
    /**
 * No description
 *
 * @tags report
 * @name ReportGetReports
 * @request GET:/reports
 * @response `200` `{
    data: ({
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A date field *\
    deadline: string,
  \**
   * A boolean field
   * @default false
   *\
    finished: boolean,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.469Z"
   *\
    publishedAt: string,
  \** A relational field *\
    evaluations?: (ApiEvaluationEvaluationDocument)[],
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    reportGetReports: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "deadline"
          | "finished"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Filters to apply to the query */
        filters?: Record<
          "deadline" | "finished" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
        _q?: string;
        /** Pagination parameters */
        pagination?: {
          /** Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /**
               * Page number (1-based)
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              page: number;
              /**
               * Number of entries per page
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              pageSize: number;
            }
          | {
              /**
               * Number of entries to skip
               * @min 0
               * @max 9007199254740991
               */
              start: number;
              /**
               * Maximum number of entries to return
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              limit: number;
            }
        );
        /** Sort the result */
        sort?:
          | "deadline"
          | "finished"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | (
              | "deadline"
              | "finished"
              | "createdAt"
              | "updatedAt"
              | "publishedAt"
            )[]
          | Record<
              | "deadline"
              | "finished"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              | "deadline"
              | "finished"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "evaluations" | "user" | ("evaluations" | "user")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A date field */
            deadline: string;
            /**
             * A boolean field
             * @default false
             */
            finished: boolean;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.469Z"
             */
            publishedAt: string;
            /** A relational field */
            evaluations?: ApiEvaluationEvaluationDocument[];
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          }[];
        },
        void
      >({
        path: `/reports`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags report
 * @name ReportPostReports
 * @request POST:/reports
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A date field *\
    deadline: string,
  \**
   * A boolean field
   * @default false
   *\
    finished: boolean,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.475Z"
   *\
    publishedAt: string,
  \** A relational field *\
    evaluations?: (ApiEvaluationEvaluationDocument)[],
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    reportPostReports: (
      data: {
        data: {
          /** A date field */
          deadline: string;
          /**
           * A boolean field
           * @default false
           */
          finished: "0" | "1" | "t" | "true" | "f" | "false";
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.474Z"
           */
          publishedAt: string;
          /** A relational field */
          evaluations?: string[];
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          user?: string;
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "deadline"
          | "finished"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "evaluations" | "user" | ("evaluations" | "user")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A date field */
            deadline: string;
            /**
             * A boolean field
             * @default false
             */
            finished: boolean;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.475Z"
             */
            publishedAt: string;
            /** A relational field */
            evaluations?: ApiEvaluationEvaluationDocument[];
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/reports`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags report
 * @name ReportGetReportsById
 * @request GET:/reports/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A date field *\
    deadline: string,
  \**
   * A boolean field
   * @default false
   *\
    finished: boolean,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.472Z"
   *\
    publishedAt: string,
  \** A relational field *\
    evaluations?: (ApiEvaluationEvaluationDocument)[],
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    reportGetReportsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "deadline"
          | "finished"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "evaluations" | "user" | ("evaluations" | "user")[];
        /** Filters to apply to the query */
        filters?: Record<
          "deadline" | "finished" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
        /** Sort the result */
        sort?:
          | "deadline"
          | "finished"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
          | (
              | "deadline"
              | "finished"
              | "createdAt"
              | "updatedAt"
              | "publishedAt"
            )[]
          | Record<
              | "deadline"
              | "finished"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >
          | Record<
              | "deadline"
              | "finished"
              | "createdAt"
              | "updatedAt"
              | "publishedAt",
              "asc" | "desc"
            >[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A date field */
            deadline: string;
            /**
             * A boolean field
             * @default false
             */
            finished: boolean;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.472Z"
             */
            publishedAt: string;
            /** A relational field */
            evaluations?: ApiEvaluationEvaluationDocument[];
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/reports/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags report
 * @name ReportPutReportsById
 * @request PUT:/reports/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A date field *\
    deadline: string,
  \**
   * A boolean field
   * @default false
   *\
    finished: boolean,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.478Z"
   *\
    publishedAt: string,
  \** A relational field *\
    evaluations?: (ApiEvaluationEvaluationDocument)[],
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    reportPutReportsById: (
      id: string,
      data: {
        data: {
          /** A date field */
          deadline?: string;
          /**
           * A boolean field
           * @default false
           */
          finished?: "0" | "1" | "t" | "true" | "f" | "false";
          /**
           * A datetime field
           * @default "2025-09-12T06:37:57.477Z"
           */
          publishedAt?: string;
          /** A relational field */
          evaluations?: string[];
          /**
           * A relational field
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          user?: string;
        };
      },
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "deadline"
          | "finished"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "evaluations" | "user" | ("evaluations" | "user")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A date field */
            deadline: string;
            /**
             * A boolean field
             * @default false
             */
            finished: boolean;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.478Z"
             */
            publishedAt: string;
            /** A relational field */
            evaluations?: ApiEvaluationEvaluationDocument[];
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/reports/${id}`,
        method: "PUT",
        query: query,
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags report
 * @name ReportDeleteReportsById
 * @request DELETE:/reports/{id}
 * @response `200` `{
    data: {
  \**
   * The document ID, represented by a UUID
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    id: number,
  \** A date field *\
    deadline: string,
  \**
   * A boolean field
   * @default false
   *\
    finished: boolean,
  \** A datetime field *\
    createdAt?: string,
  \** A datetime field *\
    updatedAt?: string,
  \**
   * A datetime field
   * @default "2025-09-12T06:37:57.479Z"
   *\
    publishedAt: string,
  \** A relational field *\
    evaluations?: (ApiEvaluationEvaluationDocument)[],
  \** A relational field *\
    user?: PluginUsersPermissionsUserDocument,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    reportDeleteReportsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: (
          | "deadline"
          | "finished"
          | "createdAt"
          | "updatedAt"
          | "publishedAt"
        )[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | "evaluations" | "user" | ("evaluations" | "user")[];
        /** Filters to apply to the query */
        filters?: Record<
          "deadline" | "finished" | "createdAt" | "updatedAt" | "publishedAt",
          any
        >;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /**
             * The document ID, represented by a UUID
             * @format uuid
             * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
             */
            documentId: string;
            id: number;
            /** A date field */
            deadline: string;
            /**
             * A boolean field
             * @default false
             */
            finished: boolean;
            /** A datetime field */
            createdAt?: string;
            /** A datetime field */
            updatedAt?: string;
            /**
             * A datetime field
             * @default "2025-09-12T06:37:57.479Z"
             */
            publishedAt: string;
            /** A relational field */
            evaluations?: ApiEvaluationEvaluationDocument[];
            /** A relational field */
            user?: PluginUsersPermissionsUserDocument;
          };
        },
        void
      >({
        path: `/reports/${id}`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),
  };
  contentTypes = {
    /**
 * No description
 *
 * @tags content-type-builder
 * @name ContentTypeBuilderGetContentTypes
 * @request GET:/content-types
 * @response `200` `{
    data: ({
  \** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ *\
    uid: string,
    plugin?: string,
    apiID: string,
    schema: {
    displayName: string,
    singularName: string,
    pluralName: string,
    description: string,
    draftAndPublish: boolean,
    kind: "collectionType" | "singleType",
    collectionName?: string,
    attributes: Record<string,({
    type: "media",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    multiple: boolean,
    required?: boolean,
    allowedTypes?: (string)[],

} | {
    type: "relation",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    relation: string,
  \** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ *\
    target: string,
    targetAttribute: (string | null),
    autoPopulate?: boolean,
    mappedBy?: string,
    inversedBy?: string,

} | {
    type: "component",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    component: string,
    repeatable: boolean,
    required?: boolean,
    min?: number,
    max?: number,

} | {
    type: "dynamiczone",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    components: (string)[],
    required?: boolean,
    min?: number,
    max?: number,

} | {
    type: "uid",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    targetField?: string,

} | {
    type: string,
    required?: boolean,
    unique?: boolean,
    default?: any,
    min?: (number | string),
    max?: (number | string),
    minLength?: number,
    maxLength?: number,
    enum?: (string)[],
    regex?: string,
    private?: boolean,
    configurable?: boolean,
    pluginOptions?: Record<string,any>,

})>,
    visible: boolean,
    restrictRelationsTo: ((string)[] | null),
    pluginOptions?: Record<string,any>,
    options?: Record<string,any>,
    reviewWorkflows?: boolean,
    populateCreatorFields?: boolean,
    comment?: string,
    version?: string,

},

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    contentTypeBuilderGetContentTypes: (
      query: {
        kind: "collectionType" | "singleType";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ */
            uid: string;
            plugin?: string;
            apiID: string;
            schema: {
              displayName: string;
              singularName: string;
              pluralName: string;
              description: string;
              draftAndPublish: boolean;
              kind: "collectionType" | "singleType";
              collectionName?: string;
              attributes: Record<
                string,
                | {
                    type: "media";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    multiple: boolean;
                    required?: boolean;
                    allowedTypes?: string[];
                  }
                | {
                    type: "relation";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    relation: string;
                    /** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ */
                    target: string;
                    targetAttribute: string | null;
                    autoPopulate?: boolean;
                    mappedBy?: string;
                    inversedBy?: string;
                  }
                | {
                    type: "component";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    component: string;
                    repeatable: boolean;
                    required?: boolean;
                    min?: number;
                    max?: number;
                  }
                | {
                    type: "dynamiczone";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    components: string[];
                    required?: boolean;
                    min?: number;
                    max?: number;
                  }
                | {
                    type: "uid";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    targetField?: string;
                  }
                | {
                    type: string;
                    required?: boolean;
                    unique?: boolean;
                    default?: any;
                    min?: number | string;
                    max?: number | string;
                    minLength?: number;
                    maxLength?: number;
                    enum?: string[];
                    regex?: string;
                    private?: boolean;
                    configurable?: boolean;
                    pluginOptions?: Record<string, any>;
                  }
              >;
              visible: boolean;
              restrictRelationsTo: string[] | null;
              pluginOptions?: Record<string, any>;
              options?: Record<string, any>;
              reviewWorkflows?: boolean;
              populateCreatorFields?: boolean;
              comment?: string;
              version?: string;
            };
          }[];
        },
        void
      >({
        path: `/content-types`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags content-type-builder
 * @name ContentTypeBuilderGetContentTypesByUid
 * @request GET:/content-types/{uid}
 * @response `200` `{
    data: {
  \** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ *\
    uid: string,
    plugin?: string,
    apiID: string,
    schema: {
    displayName: string,
    singularName: string,
    pluralName: string,
    description: string,
    draftAndPublish: boolean,
    kind: "collectionType" | "singleType",
    collectionName?: string,
    attributes: Record<string,({
    type: "media",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    multiple: boolean,
    required?: boolean,
    allowedTypes?: (string)[],

} | {
    type: "relation",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    relation: string,
  \** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ *\
    target: string,
    targetAttribute: (string | null),
    autoPopulate?: boolean,
    mappedBy?: string,
    inversedBy?: string,

} | {
    type: "component",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    component: string,
    repeatable: boolean,
    required?: boolean,
    min?: number,
    max?: number,

} | {
    type: "dynamiczone",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    components: (string)[],
    required?: boolean,
    min?: number,
    max?: number,

} | {
    type: "uid",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    targetField?: string,

} | {
    type: string,
    required?: boolean,
    unique?: boolean,
    default?: any,
    min?: (number | string),
    max?: (number | string),
    minLength?: number,
    maxLength?: number,
    enum?: (string)[],
    regex?: string,
    private?: boolean,
    configurable?: boolean,
    pluginOptions?: Record<string,any>,

})>,
    visible: boolean,
    restrictRelationsTo: ((string)[] | null),
    pluginOptions?: Record<string,any>,
    options?: Record<string,any>,
    reviewWorkflows?: boolean,
    populateCreatorFields?: boolean,
    comment?: string,
    version?: string,

},

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    contentTypeBuilderGetContentTypesByUid: (
      uid: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ */
            uid: string;
            plugin?: string;
            apiID: string;
            schema: {
              displayName: string;
              singularName: string;
              pluralName: string;
              description: string;
              draftAndPublish: boolean;
              kind: "collectionType" | "singleType";
              collectionName?: string;
              attributes: Record<
                string,
                | {
                    type: "media";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    multiple: boolean;
                    required?: boolean;
                    allowedTypes?: string[];
                  }
                | {
                    type: "relation";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    relation: string;
                    /** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ */
                    target: string;
                    targetAttribute: string | null;
                    autoPopulate?: boolean;
                    mappedBy?: string;
                    inversedBy?: string;
                  }
                | {
                    type: "component";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    component: string;
                    repeatable: boolean;
                    required?: boolean;
                    min?: number;
                    max?: number;
                  }
                | {
                    type: "dynamiczone";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    components: string[];
                    required?: boolean;
                    min?: number;
                    max?: number;
                  }
                | {
                    type: "uid";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    targetField?: string;
                  }
                | {
                    type: string;
                    required?: boolean;
                    unique?: boolean;
                    default?: any;
                    min?: number | string;
                    max?: number | string;
                    minLength?: number;
                    maxLength?: number;
                    enum?: string[];
                    regex?: string;
                    private?: boolean;
                    configurable?: boolean;
                    pluginOptions?: Record<string, any>;
                  }
              >;
              visible: boolean;
              restrictRelationsTo: string[] | null;
              pluginOptions?: Record<string, any>;
              options?: Record<string, any>;
              reviewWorkflows?: boolean;
              populateCreatorFields?: boolean;
              comment?: string;
              version?: string;
            };
          };
        },
        void
      >({
        path: `/content-types/${uid}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  components = {
    /**
 * No description
 *
 * @tags content-type-builder
 * @name ContentTypeBuilderGetComponents
 * @request GET:/components
 * @response `200` `{
    data: ({
  \** @pattern ^[\w-]+\.[\w-]+$ *\
    uid: string,
    category: string,
    apiId: string,
    schema: {
    displayName: string,
    description: string,
    icon?: string,
    connection?: string,
    collectionName?: string,
    attributes: Record<string,({
    type: "media",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    multiple: boolean,
    required?: boolean,
    allowedTypes?: (string)[],

} | {
    type: "relation",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    relation: string,
  \** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ *\
    target: string,
    targetAttribute: (string | null),
    autoPopulate?: boolean,
    mappedBy?: string,
    inversedBy?: string,

} | {
    type: "component",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    component: string,
    repeatable: boolean,
    required?: boolean,
    min?: number,
    max?: number,

} | {
    type: "dynamiczone",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    components: (string)[],
    required?: boolean,
    min?: number,
    max?: number,

} | {
    type: "uid",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    targetField?: string,

} | {
    type: string,
    required?: boolean,
    unique?: boolean,
    default?: any,
    min?: (number | string),
    max?: (number | string),
    minLength?: number,
    maxLength?: number,
    enum?: (string)[],
    regex?: string,
    private?: boolean,
    configurable?: boolean,
    pluginOptions?: Record<string,any>,

})>,
    pluginOptions?: Record<string,any>,

},

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    contentTypeBuilderGetComponents: (params: RequestParams = {}) =>
      this.request<
        {
          data: {
            /** @pattern ^[\w-]+\.[\w-]+$ */
            uid: string;
            category: string;
            apiId: string;
            schema: {
              displayName: string;
              description: string;
              icon?: string;
              connection?: string;
              collectionName?: string;
              attributes: Record<
                string,
                | {
                    type: "media";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    multiple: boolean;
                    required?: boolean;
                    allowedTypes?: string[];
                  }
                | {
                    type: "relation";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    relation: string;
                    /** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ */
                    target: string;
                    targetAttribute: string | null;
                    autoPopulate?: boolean;
                    mappedBy?: string;
                    inversedBy?: string;
                  }
                | {
                    type: "component";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    component: string;
                    repeatable: boolean;
                    required?: boolean;
                    min?: number;
                    max?: number;
                  }
                | {
                    type: "dynamiczone";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    components: string[];
                    required?: boolean;
                    min?: number;
                    max?: number;
                  }
                | {
                    type: "uid";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    targetField?: string;
                  }
                | {
                    type: string;
                    required?: boolean;
                    unique?: boolean;
                    default?: any;
                    min?: number | string;
                    max?: number | string;
                    minLength?: number;
                    maxLength?: number;
                    enum?: string[];
                    regex?: string;
                    private?: boolean;
                    configurable?: boolean;
                    pluginOptions?: Record<string, any>;
                  }
              >;
              pluginOptions?: Record<string, any>;
            };
          }[];
        },
        void
      >({
        path: `/components`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags content-type-builder
 * @name ContentTypeBuilderGetComponentsByUid
 * @request GET:/components/{uid}
 * @response `200` `{
    data: {
  \** @pattern ^[\w-]+\.[\w-]+$ *\
    uid: string,
    category: string,
    apiId: string,
    schema: {
    displayName: string,
    description: string,
    icon?: string,
    connection?: string,
    collectionName?: string,
    attributes: Record<string,({
    type: "media",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    multiple: boolean,
    required?: boolean,
    allowedTypes?: (string)[],

} | {
    type: "relation",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    relation: string,
  \** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ *\
    target: string,
    targetAttribute: (string | null),
    autoPopulate?: boolean,
    mappedBy?: string,
    inversedBy?: string,

} | {
    type: "component",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    component: string,
    repeatable: boolean,
    required?: boolean,
    min?: number,
    max?: number,

} | {
    type: "dynamiczone",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    components: (string)[],
    required?: boolean,
    min?: number,
    max?: number,

} | {
    type: "uid",
    configurable?: false,
    private?: boolean,
    pluginOptions?: Record<string,any>,
    targetField?: string,

} | {
    type: string,
    required?: boolean,
    unique?: boolean,
    default?: any,
    min?: (number | string),
    max?: (number | string),
    minLength?: number,
    maxLength?: number,
    enum?: (string)[],
    regex?: string,
    private?: boolean,
    configurable?: boolean,
    pluginOptions?: Record<string,any>,

})>,
    pluginOptions?: Record<string,any>,

},

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    contentTypeBuilderGetComponentsByUid: (
      uid: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data: {
            /** @pattern ^[\w-]+\.[\w-]+$ */
            uid: string;
            category: string;
            apiId: string;
            schema: {
              displayName: string;
              description: string;
              icon?: string;
              connection?: string;
              collectionName?: string;
              attributes: Record<
                string,
                | {
                    type: "media";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    multiple: boolean;
                    required?: boolean;
                    allowedTypes?: string[];
                  }
                | {
                    type: "relation";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    relation: string;
                    /** @pattern ^((strapi|admin)::[\w-]+|(api|plugin)::[\w-]+\.[\w-]+)$ */
                    target: string;
                    targetAttribute: string | null;
                    autoPopulate?: boolean;
                    mappedBy?: string;
                    inversedBy?: string;
                  }
                | {
                    type: "component";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    component: string;
                    repeatable: boolean;
                    required?: boolean;
                    min?: number;
                    max?: number;
                  }
                | {
                    type: "dynamiczone";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    components: string[];
                    required?: boolean;
                    min?: number;
                    max?: number;
                  }
                | {
                    type: "uid";
                    configurable?: false;
                    private?: boolean;
                    pluginOptions?: Record<string, any>;
                    targetField?: string;
                  }
                | {
                    type: string;
                    required?: boolean;
                    unique?: boolean;
                    default?: any;
                    min?: number | string;
                    max?: number | string;
                    minLength?: number;
                    maxLength?: number;
                    enum?: string[];
                    regex?: string;
                    private?: boolean;
                    configurable?: boolean;
                    pluginOptions?: Record<string, any>;
                  }
              >;
              pluginOptions?: Record<string, any>;
            };
          };
        },
        void
      >({
        path: `/components/${uid}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  files = {
    /**
 * No description
 *
 * @tags upload
 * @name UploadGetFiles
 * @request GET:/files
 * @response `200` `({
  \**
   * @exclusiveMin 0
   * @max 9007199254740991
   *\
    id: number,
  \**
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    name: string,
    alternativeText?: (string | null),
    caption?: (string | null),
  \**
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    width?: number,
  \**
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    height?: number,
    formats?: Record<string,any>,
    hash: string,
    ext?: string,
    mime: string,
    size: number,
    url: string,
    previewUrl?: (string | null),
    folder?: number,
    folderPath: string,
    provider: string,
    provider_metadata?: (Record<string,any> | null),
    createdAt: string,
    updatedAt: string,
    createdBy?: number,
    updatedBy?: number,

})[]` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    uploadGetFiles: (
      query?: {
        /** Select specific fields to return in the response */
        fields?: string | string[];
        /** Specify which relations to populate in the response */
        populate?: "*" | string | string[] | Record<string, any>;
        /** Sort the results by specified fields */
        sort?:
          | string
          | string[]
          | Record<string, "asc" | "desc">
          | Record<string, "asc" | "desc">[];
        /** Pagination parameters */
        pagination?: {
          /** Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /**
               * Page number (1-based)
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              page: number;
              /**
               * Number of entries per page
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              pageSize: number;
            }
          | {
              /**
               * Number of entries to skip
               * @min 0
               * @max 9007199254740991
               */
              start: number;
              /**
               * Maximum number of entries to return
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              limit: number;
            }
        );
        /** Apply filters to the query */
        filters?: Record<string, any>;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * @exclusiveMin 0
           * @max 9007199254740991
           */
          id: number;
          /**
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          documentId: string;
          name: string;
          alternativeText?: string | null;
          caption?: string | null;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          width?: number;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          height?: number;
          formats?: Record<string, any>;
          hash: string;
          ext?: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string | null;
          folder?: number;
          folderPath: string;
          provider: string;
          provider_metadata?: Record<string, any> | null;
          createdAt: string;
          updatedAt: string;
          createdBy?: number;
          updatedBy?: number;
        }[],
        void
      >({
        path: `/files`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags upload
 * @name UploadGetFilesById
 * @request GET:/files/{id}
 * @response `200` `{
  \**
   * @exclusiveMin 0
   * @max 9007199254740991
   *\
    id: number,
  \**
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    name: string,
    alternativeText?: (string | null),
    caption?: (string | null),
  \**
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    width?: number,
  \**
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    height?: number,
    formats?: Record<string,any>,
    hash: string,
    ext?: string,
    mime: string,
    size: number,
    url: string,
    previewUrl?: (string | null),
    folder?: number,
    folderPath: string,
    provider: string,
    provider_metadata?: (Record<string,any> | null),
    createdAt: string,
    updatedAt: string,
    createdBy?: number,
    updatedBy?: number,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    uploadGetFilesById: (
      id: number,
      query?: {
        /** Select specific fields to return in the response */
        fields?: string | string[];
        /** Specify which relations to populate in the response */
        populate?: "*" | string | string[] | Record<string, any>;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * @exclusiveMin 0
           * @max 9007199254740991
           */
          id: number;
          /**
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          documentId: string;
          name: string;
          alternativeText?: string | null;
          caption?: string | null;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          width?: number;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          height?: number;
          formats?: Record<string, any>;
          hash: string;
          ext?: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string | null;
          folder?: number;
          folderPath: string;
          provider: string;
          provider_metadata?: Record<string, any> | null;
          createdAt: string;
          updatedAt: string;
          createdBy?: number;
          updatedBy?: number;
        },
        void
      >({
        path: `/files/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags upload
 * @name UploadDeleteFilesById
 * @request DELETE:/files/{id}
 * @response `200` `{
  \**
   * @exclusiveMin 0
   * @max 9007199254740991
   *\
    id: number,
  \**
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    name: string,
    alternativeText?: (string | null),
    caption?: (string | null),
  \**
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    width?: number,
  \**
   * @min -9007199254740991
   * @max 9007199254740991
   *\
    height?: number,
    formats?: Record<string,any>,
    hash: string,
    ext?: string,
    mime: string,
    size: number,
    url: string,
    previewUrl?: (string | null),
    folder?: number,
    folderPath: string,
    provider: string,
    provider_metadata?: (Record<string,any> | null),
    createdAt: string,
    updatedAt: string,
    createdBy?: number,
    updatedBy?: number,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    uploadDeleteFilesById: (id: number, params: RequestParams = {}) =>
      this.request<
        {
          /**
           * @exclusiveMin 0
           * @max 9007199254740991
           */
          id: number;
          /**
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          documentId: string;
          name: string;
          alternativeText?: string | null;
          caption?: string | null;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          width?: number;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          height?: number;
          formats?: Record<string, any>;
          hash: string;
          ext?: string;
          mime: string;
          size: number;
          url: string;
          previewUrl?: string | null;
          folder?: number;
          folderPath: string;
          provider: string;
          provider_metadata?: Record<string, any> | null;
          createdAt: string;
          updatedAt: string;
          createdBy?: number;
          updatedBy?: number;
        },
        void
      >({
        path: `/files/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  locales = {
    /**
 * No description
 *
 * @tags i18n
 * @name I18NGetLocales
 * @request GET:/locales
 * @response `200` `({
  \**
   * @exclusiveMin 0
   * @max 9007199254740991
   *\
    id: number,
  \**
   * @format uuid
   * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
   *\
    documentId: string,
    name: string,
  \**
   * @minLength 2
   * @maxLength 2
   *\
    code: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: (string | null),
    isDefault: boolean,

})[]` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    i18NGetLocales: (params: RequestParams = {}) =>
      this.request<
        {
          /**
           * @exclusiveMin 0
           * @max 9007199254740991
           */
          id: number;
          /**
           * @format uuid
           * @pattern ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$
           */
          documentId: string;
          name: string;
          /**
           * @minLength 2
           * @maxLength 2
           */
          code: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string | null;
          isDefault: boolean;
        }[],
        void
      >({
        path: `/locales`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  connect = {
    /**
     * No description
     *
     * @tags users-permissions
     * @name UsersPermissionsGetConnect
     * @request GET:/connect/(.*)
     * @response `400` `void` Bad request
     * @response `401` `void` Unauthorized
     * @response `403` `void` Forbidden
     * @response `404` `void` Not found
     * @response `500` `void` Internal server error
     */
    usersPermissionsGetConnect: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/connect/(.*)`,
        method: "GET",
        ...params,
      }),
  };
  auth = {
    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsPostAuthLocal
 * @request POST:/auth/local
 * @response `200` `{
    jwt: string,
    user: {
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsPostAuthLocal: (
      data: {
        identifier: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          jwt: string;
          user: {
            id: number;
            documentId: string;
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        },
        void
      >({
        path: `/auth/local`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsPostAuthLocalRegister
 * @request POST:/auth/local/register
 * @response `200` `({
    jwt: string,
    user: {
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

},

} | {
    user: {
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

},

})` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsPostAuthLocalRegister: (
      data: {
        username: string;
        /**
         * @format email
         * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
         */
        email: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        | {
            jwt: string;
            user: {
              id: number;
              documentId: string;
              username: string;
              email: string;
              provider: string;
              confirmed: boolean;
              blocked: boolean;
              role?:
                | number
                | {
                    id: number;
                    name: string;
                    description: string | null;
                    type: string;
                    createdAt: string;
                    updatedAt: string;
                  };
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
            };
          }
        | {
            user: {
              id: number;
              documentId: string;
              username: string;
              email: string;
              provider: string;
              confirmed: boolean;
              blocked: boolean;
              role?:
                | number
                | {
                    id: number;
                    name: string;
                    description: string | null;
                    type: string;
                    createdAt: string;
                    updatedAt: string;
                  };
              createdAt: string;
              updatedAt: string;
              publishedAt: string;
            };
          },
        void
      >({
        path: `/auth/local/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsGetAuthByProviderCallback
 * @request GET:/auth/{provider}/callback
 * @response `200` `{
    jwt: string,
    user: {
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsGetAuthByProviderCallback: (
      provider: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          jwt: string;
          user: {
            id: number;
            documentId: string;
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        },
        void
      >({
        path: `/auth/${provider}/callback`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsPostAuthForgotPassword
 * @request POST:/auth/forgot-password
 * @response `200` `{
    ok: boolean,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsPostAuthForgotPassword: (
      data: {
        /**
         * @format email
         * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
         */
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          ok: boolean;
        },
        void
      >({
        path: `/auth/forgot-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsPostAuthResetPassword
 * @request POST:/auth/reset-password
 * @response `200` `{
    jwt: string,
    user: {
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsPostAuthResetPassword: (
      data: {
        code: string;
        password: string;
        passwordConfirmation: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          jwt: string;
          user: {
            id: number;
            documentId: string;
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        },
        void
      >({
        path: `/auth/reset-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users-permissions
     * @name UsersPermissionsGetAuthEmailConfirmation
     * @request GET:/auth/email-confirmation
     * @response `400` `void` Bad request
     * @response `401` `void` Unauthorized
     * @response `403` `void` Forbidden
     * @response `404` `void` Not found
     * @response `500` `void` Internal server error
     */
    usersPermissionsGetAuthEmailConfirmation: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/auth/email-confirmation`,
        method: "GET",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsPostAuthSendEmailConfirmation
 * @request POST:/auth/send-email-confirmation
 * @response `200` `{
    email: string,
    sent: boolean,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsPostAuthSendEmailConfirmation: (
      data: {
        /**
         * @format email
         * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
         */
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          email: string;
          sent: boolean;
        },
        void
      >({
        path: `/auth/send-email-confirmation`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsPostAuthChangePassword
 * @request POST:/auth/change-password
 * @response `200` `{
    jwt: string,
    user: {
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsPostAuthChangePassword: (
      data: {
        currentPassword: string;
        password: string;
        passwordConfirmation: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          jwt: string;
          user: {
            id: number;
            documentId: string;
            username: string;
            email: string;
            provider: string;
            confirmed: boolean;
            blocked: boolean;
            role?:
              | number
              | {
                  id: number;
                  name: string;
                  description: string | null;
                  type: string;
                  createdAt: string;
                  updatedAt: string;
                };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        },
        void
      >({
        path: `/auth/change-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users-permissions
     * @name UsersPermissionsGetUsersCount
     * @request GET:/users/count
     * @response `200` `number` OK
     * @response `400` `void` Bad request
     * @response `401` `void` Unauthorized
     * @response `403` `void` Forbidden
     * @response `404` `void` Not found
     * @response `500` `void` Internal server error
     */
    usersPermissionsGetUsersCount: (
      query?: {
        /** Apply filters to the query */
        filters?: Record<string, any>;
      },
      params: RequestParams = {},
    ) =>
      this.request<number, void>({
        path: `/users/count`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsGetUsers
 * @request GET:/users
 * @response `200` `({
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

})[]` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsGetUsers: (
      query?: {
        /** Select specific fields to return in the response */
        fields?: string | string[];
        /** Specify which relations to populate in the response */
        populate?: "*" | string | string[] | Record<string, any>;
        /** Sort the results by specified fields */
        sort?:
          | string
          | string[]
          | Record<string, "asc" | "desc">
          | Record<string, "asc" | "desc">[];
        /** Pagination parameters */
        pagination?: {
          /** Include total count in response */
          withCount?: boolean;
        } & (
          | {
              /**
               * Page number (1-based)
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              page: number;
              /**
               * Number of entries per page
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              pageSize: number;
            }
          | {
              /**
               * Number of entries to skip
               * @min 0
               * @max 9007199254740991
               */
              start: number;
              /**
               * Maximum number of entries to return
               * @exclusiveMin 0
               * @max 9007199254740991
               */
              limit: number;
            }
        );
        /** Apply filters to the query */
        filters?: Record<string, any>;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          documentId: string;
          username: string;
          email: string;
          provider: string;
          confirmed: boolean;
          blocked: boolean;
          role?:
            | number
            | {
                id: number;
                name: string;
                description: string | null;
                type: string;
                createdAt: string;
                updatedAt: string;
              };
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        }[],
        void
      >({
        path: `/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsPostUsers
 * @request POST:/users
 * @response `200` `{
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsPostUsers: (
      data: {
        username: string;
        /**
         * @format email
         * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
         */
        email: string;
        password: string;
        role?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          documentId: string;
          username: string;
          email: string;
          provider: string;
          confirmed: boolean;
          blocked: boolean;
          role?:
            | number
            | {
                id: number;
                name: string;
                description: string | null;
                type: string;
                createdAt: string;
                updatedAt: string;
              };
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        },
        void
      >({
        path: `/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsGetUsersMe
 * @request GET:/users/me
 * @response `200` `{
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsGetUsersMe: (
      query?: {
        /** Select specific fields to return in the response */
        fields?: string | string[];
        /** Specify which relations to populate in the response */
        populate?: "*" | string | string[] | Record<string, any>;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          documentId: string;
          username: string;
          email: string;
          provider: string;
          confirmed: boolean;
          blocked: boolean;
          role?:
            | number
            | {
                id: number;
                name: string;
                description: string | null;
                type: string;
                createdAt: string;
                updatedAt: string;
              };
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        },
        void
      >({
        path: `/users/me`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsGetUsersById
 * @request GET:/users/{id}
 * @response `200` `{
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsGetUsersById: (
      id: string,
      query?: {
        /** Select specific fields to return in the response */
        fields?: string | string[];
        /** Specify which relations to populate in the response */
        populate?: "*" | string | string[] | Record<string, any>;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          documentId: string;
          username: string;
          email: string;
          provider: string;
          confirmed: boolean;
          blocked: boolean;
          role?:
            | number
            | {
                id: number;
                name: string;
                description: string | null;
                type: string;
                createdAt: string;
                updatedAt: string;
              };
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        },
        void
      >({
        path: `/users/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsPutUsersById
 * @request PUT:/users/{id}
 * @response `200` `{
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsPutUsersById: (
      id: string,
      data: {
        username?: string;
        /**
         * @format email
         * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
         */
        email?: string;
        password?: string;
        role?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: number;
          documentId: string;
          username: string;
          email: string;
          provider: string;
          confirmed: boolean;
          blocked: boolean;
          role?:
            | number
            | {
                id: number;
                name: string;
                description: string | null;
                type: string;
                createdAt: string;
                updatedAt: string;
              };
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        },
        void
      >({
        path: `/users/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsDeleteUsersById
 * @request DELETE:/users/{id}
 * @response `200` `{
    id: number,
    documentId: string,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    role?: (number | {
    id: number,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,

}),
    createdAt: string,
    updatedAt: string,
    publishedAt: string,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsDeleteUsersById: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          id: number;
          documentId: string;
          username: string;
          email: string;
          provider: string;
          confirmed: boolean;
          blocked: boolean;
          role?:
            | number
            | {
                id: number;
                name: string;
                description: string | null;
                type: string;
                createdAt: string;
                updatedAt: string;
              };
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        },
        void
      >({
        path: `/users/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  roles = {
    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsGetRolesById
 * @request GET:/roles/{id}
 * @response `200` `{
    role: {
    id: number,
    documentId: string,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    nb_users?: number,
    permissions?: Record<string,{
    controllers: Record<string,Record<string,{
    enabled: boolean,
    policy: string,

}>>,

}>,
    users?: (any)[],

},

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsGetRolesById: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          role: {
            id: number;
            documentId: string;
            name: string;
            description: string | null;
            type: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            nb_users?: number;
            permissions?: Record<
              string,
              {
                controllers: Record<
                  string,
                  Record<
                    string,
                    {
                      enabled: boolean;
                      policy: string;
                    }
                  >
                >;
              }
            >;
            users?: any[];
          };
        },
        void
      >({
        path: `/roles/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsGetRoles
 * @request GET:/roles
 * @response `200` `{
    roles: ({
    id: number,
    documentId: string,
    name: string,
    description: (string | null),
    type: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    nb_users?: number,
    permissions?: Record<string,{
    controllers: Record<string,Record<string,{
    enabled: boolean,
    policy: string,

}>>,

}>,
    users?: (any)[],

})[],

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsGetRoles: (params: RequestParams = {}) =>
      this.request<
        {
          roles: {
            id: number;
            documentId: string;
            name: string;
            description: string | null;
            type: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            nb_users?: number;
            permissions?: Record<
              string,
              {
                controllers: Record<
                  string,
                  Record<
                    string,
                    {
                      enabled: boolean;
                      policy: string;
                    }
                  >
                >;
              }
            >;
            users?: any[];
          }[];
        },
        void
      >({
        path: `/roles`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsPostRoles
 * @request POST:/roles
 * @response `200` `{
    ok: boolean,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsPostRoles: (
      data: {
        name: string;
        description?: string;
        type: string;
        permissions?: Record<string, any>;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          ok: boolean;
        },
        void
      >({
        path: `/roles`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsPutRolesByRole
 * @request PUT:/roles/{role}
 * @response `200` `{
    ok: boolean,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsPutRolesByRole: (
      role: string,
      data: {
        name?: string;
        description?: string;
        type?: string;
        permissions?: Record<string, any>;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          ok: boolean;
        },
        void
      >({
        path: `/roles/${role}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsDeleteRolesByRole
 * @request DELETE:/roles/{role}
 * @response `200` `{
    ok: boolean,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsDeleteRolesByRole: (
      role: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          ok: boolean;
        },
        void
      >({
        path: `/roles/${role}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
  permissions = {
    /**
 * No description
 *
 * @tags users-permissions
 * @name UsersPermissionsGetPermissions
 * @request GET:/permissions
 * @response `200` `{
    permissions: Record<string,{
    controllers: Record<string,Record<string,{
    enabled: boolean,
    policy: string,

}>>,

}>,

}` OK
 * @response `400` `void` Bad request
 * @response `401` `void` Unauthorized
 * @response `403` `void` Forbidden
 * @response `404` `void` Not found
 * @response `500` `void` Internal server error
 */
    usersPermissionsGetPermissions: (params: RequestParams = {}) =>
      this.request<
        {
          permissions: Record<
            string,
            {
              controllers: Record<
                string,
                Record<
                  string,
                  {
                    enabled: boolean;
                    policy: string;
                  }
                >
              >;
            }
          >;
        },
        void
      >({
        path: `/permissions`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  registrationInfo = {
    /**
     * No description
     *
     * @tags users-permissions
     * @name UsersPermissionsGetRegistrationInfo
     * @request GET:/registration-info
     * @response `400` `void` Bad request
     * @response `401` `void` Unauthorized
     * @response `403` `void` Forbidden
     * @response `404` `void` Not found
     * @response `500` `void` Internal server error
     */
    usersPermissionsGetRegistrationInfo: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/registration-info`,
        method: "GET",
        ...params,
      }),
  };
  register = {
    /**
     * No description
     *
     * @tags users-permissions
     * @name UsersPermissionsPostRegister
     * @request POST:/register
     * @response `400` `void` Bad request
     * @response `401` `void` Unauthorized
     * @response `403` `void` Forbidden
     * @response `404` `void` Not found
     * @response `500` `void` Internal server error
     */
    usersPermissionsPostRegister: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/register`,
        method: "POST",
        ...params,
      }),
  };
}
