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

export enum ActivityGetActivitiesParamsFieldsEnum {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesParamsFiltersEnum {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesParamsSortEnum {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesParamsSortEnum1 {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesParamsSortEnum2 {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum ActivityGetActivitiesParamsSortEnum4 {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ActivityGetActivitiesParamsPopulateEnum {
  Type = "type",
  Dimension = "dimension",
  Mentor = "mentor",
  User = "user",
}

export enum ActivityGetActivitiesParamsPopulateEnum1 {
  Type = "type",
  Dimension = "dimension",
  Mentor = "mentor",
  User = "user",
}

export enum ActivityPostActivitiesParamsFieldsEnum {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ActivityPostActivitiesParamsPopulateEnum {
  Type = "type",
  Dimension = "dimension",
  Mentor = "mentor",
  User = "user",
}

export enum ActivityPostActivitiesParamsPopulateEnum1 {
  Type = "type",
  Dimension = "dimension",
  Mentor = "mentor",
  User = "user",
}

export enum ActivityGetActivitiesByIdParamsFieldsEnum {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ActivityGetActivitiesByIdParamsPopulateEnum {
  Type = "type",
  Dimension = "dimension",
  Mentor = "mentor",
  User = "user",
}

export enum ActivityGetActivitiesByIdParamsPopulateEnum1 {
  Type = "type",
  Dimension = "dimension",
  Mentor = "mentor",
  User = "user",
}

export enum ActivityGetActivitiesByIdParamsFiltersEnum {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesByIdParamsSortEnum {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesByIdParamsSortEnum1 {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesByIdParamsSortEnum2 {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesByIdParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum ActivityGetActivitiesByIdParamsSortEnum4 {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityGetActivitiesByIdParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

export enum ActivityPutActivitiesByIdParamsFieldsEnum {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ActivityPutActivitiesByIdParamsPopulateEnum {
  Type = "type",
  Dimension = "dimension",
  Mentor = "mentor",
  User = "user",
}

export enum ActivityPutActivitiesByIdParamsPopulateEnum1 {
  Type = "type",
  Dimension = "dimension",
  Mentor = "mentor",
  User = "user",
}

export enum ActivityDeleteActivitiesByIdParamsFieldsEnum {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ActivityDeleteActivitiesByIdParamsPopulateEnum {
  Type = "type",
  Dimension = "dimension",
  Mentor = "mentor",
  User = "user",
}

export enum ActivityDeleteActivitiesByIdParamsPopulateEnum1 {
  Type = "type",
  Dimension = "dimension",
  Mentor = "mentor",
  User = "user",
}

export enum ActivityDeleteActivitiesByIdParamsFiltersEnum {
  StartDate = "startDate",
  Notes = "notes",
  Duration = "duration",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesParamsFieldsEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesParamsFiltersEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesParamsSortEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesParamsSortEnum1 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesParamsSortEnum2 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum ActivityTypeGetActivityTypesParamsSortEnum4 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

export enum ActivityTypePostActivityTypesParamsFieldsEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesByIdParamsFieldsEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesByIdParamsFiltersEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesByIdParamsSortEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesByIdParamsSortEnum1 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesByIdParamsSortEnum2 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesByIdParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum ActivityTypeGetActivityTypesByIdParamsSortEnum4 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeGetActivityTypesByIdParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

export enum ActivityTypePutActivityTypesByIdParamsFieldsEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeDeleteActivityTypesByIdParamsFieldsEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ActivityTypeDeleteActivityTypesByIdParamsFiltersEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsParamsFieldsEnum {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsParamsFiltersEnum {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsParamsSortEnum {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsParamsSortEnum1 {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsParamsSortEnum2 {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum DimensionGetDimensionsParamsSortEnum4 {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum DimensionGetDimensionsParamsPopulateEnum {
  Quiz = "quiz",
  Mentors = "mentors",
  Activities = "activities",
}

export enum DimensionGetDimensionsParamsPopulateEnum1 {
  Quiz = "quiz",
  Mentors = "mentors",
  Activities = "activities",
}

export enum DimensionPostDimensionsParamsFieldsEnum {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum DimensionPostDimensionsParamsPopulateEnum {
  Quiz = "quiz",
  Mentors = "mentors",
  Activities = "activities",
}

export enum DimensionPostDimensionsParamsPopulateEnum1 {
  Quiz = "quiz",
  Mentors = "mentors",
  Activities = "activities",
}

export enum DimensionGetDimensionsByIdParamsFieldsEnum {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum DimensionGetDimensionsByIdParamsPopulateEnum {
  Quiz = "quiz",
  Mentors = "mentors",
  Activities = "activities",
}

export enum DimensionGetDimensionsByIdParamsPopulateEnum1 {
  Quiz = "quiz",
  Mentors = "mentors",
  Activities = "activities",
}

export enum DimensionGetDimensionsByIdParamsFiltersEnum {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsByIdParamsSortEnum {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsByIdParamsSortEnum1 {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsByIdParamsSortEnum2 {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsByIdParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum DimensionGetDimensionsByIdParamsSortEnum4 {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DimensionGetDimensionsByIdParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

export enum DimensionPutDimensionsByIdParamsFieldsEnum {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum DimensionPutDimensionsByIdParamsPopulateEnum {
  Quiz = "quiz",
  Mentors = "mentors",
  Activities = "activities",
}

export enum DimensionPutDimensionsByIdParamsPopulateEnum1 {
  Quiz = "quiz",
  Mentors = "mentors",
  Activities = "activities",
}

export enum DimensionDeleteDimensionsByIdParamsFieldsEnum {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum DimensionDeleteDimensionsByIdParamsPopulateEnum {
  Quiz = "quiz",
  Mentors = "mentors",
  Activities = "activities",
}

export enum DimensionDeleteDimensionsByIdParamsPopulateEnum1 {
  Quiz = "quiz",
  Mentors = "mentors",
  Activities = "activities",
}

export enum DimensionDeleteDimensionsByIdParamsFiltersEnum {
  Name = "name",
  Link = "link",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsParamsFieldsEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsParamsFiltersEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsParamsSortEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsParamsSortEnum1 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsParamsSortEnum2 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum DomainGetDomainsParamsSortEnum4 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum DomainGetDomainsParamsPopulateEnum {
  Mentors = "mentors",
}

export enum DomainGetDomainsParamsPopulateEnum1 {
  Mentors = "mentors",
}

export enum DomainPostDomainsParamsFieldsEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum DomainPostDomainsParamsPopulateEnum {
  Mentors = "mentors",
}

export enum DomainPostDomainsParamsPopulateEnum1 {
  Mentors = "mentors",
}

export enum DomainGetDomainsByIdParamsFieldsEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum DomainGetDomainsByIdParamsPopulateEnum {
  Mentors = "mentors",
}

export enum DomainGetDomainsByIdParamsPopulateEnum1 {
  Mentors = "mentors",
}

export enum DomainGetDomainsByIdParamsFiltersEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsByIdParamsSortEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsByIdParamsSortEnum1 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsByIdParamsSortEnum2 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsByIdParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum DomainGetDomainsByIdParamsSortEnum4 {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum DomainGetDomainsByIdParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

export enum DomainPutDomainsByIdParamsFieldsEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum DomainPutDomainsByIdParamsPopulateEnum {
  Mentors = "mentors",
}

export enum DomainPutDomainsByIdParamsPopulateEnum1 {
  Mentors = "mentors",
}

export enum DomainDeleteDomainsByIdParamsFieldsEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum DomainDeleteDomainsByIdParamsPopulateEnum {
  Mentors = "mentors",
}

export enum DomainDeleteDomainsByIdParamsPopulateEnum1 {
  Mentors = "mentors",
}

export enum DomainDeleteDomainsByIdParamsFiltersEnum {
  Name = "name",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsParamsFieldsEnum {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsParamsFiltersEnum {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsParamsSortEnum {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsParamsSortEnum1 {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsParamsSortEnum2 {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum EvaluationGetEvaluationsParamsSortEnum4 {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum EvaluationGetEvaluationsParamsPopulateEnum {
  Dimensions = "dimensions",
  Report = "report",
}

export enum EvaluationGetEvaluationsParamsPopulateEnum1 {
  Dimensions = "dimensions",
  Report = "report",
}

export enum EvaluationPostEvaluationsParamsFieldsEnum {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum EvaluationPostEvaluationsParamsPopulateEnum {
  Dimensions = "dimensions",
  Report = "report",
}

export enum EvaluationPostEvaluationsParamsPopulateEnum1 {
  Dimensions = "dimensions",
  Report = "report",
}

export enum EvaluationGetEvaluationsByIdParamsFieldsEnum {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum EvaluationGetEvaluationsByIdParamsPopulateEnum {
  Dimensions = "dimensions",
  Report = "report",
}

export enum EvaluationGetEvaluationsByIdParamsPopulateEnum1 {
  Dimensions = "dimensions",
  Report = "report",
}

export enum EvaluationGetEvaluationsByIdParamsFiltersEnum {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsByIdParamsSortEnum {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsByIdParamsSortEnum1 {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsByIdParamsSortEnum2 {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsByIdParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum EvaluationGetEvaluationsByIdParamsSortEnum4 {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum EvaluationGetEvaluationsByIdParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

export enum EvaluationPutEvaluationsByIdParamsFieldsEnum {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum EvaluationPutEvaluationsByIdParamsPopulateEnum {
  Dimensions = "dimensions",
  Report = "report",
}

export enum EvaluationPutEvaluationsByIdParamsPopulateEnum1 {
  Dimensions = "dimensions",
  Report = "report",
}

export enum EvaluationDeleteEvaluationsByIdParamsFieldsEnum {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum EvaluationDeleteEvaluationsByIdParamsPopulateEnum {
  Dimensions = "dimensions",
  Report = "report",
}

export enum EvaluationDeleteEvaluationsByIdParamsPopulateEnum1 {
  Dimensions = "dimensions",
  Report = "report",
}

export enum EvaluationDeleteEvaluationsByIdParamsFiltersEnum {
  Email = "email",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MatrixGetMatrixParamsFieldsEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum MatrixGetMatrixParamsPopulateEnum {
  Dimensions = "dimensions",
}

export enum MatrixGetMatrixParamsPopulateEnum1 {
  Dimensions = "dimensions",
}

export enum MatrixGetMatrixParamsFiltersEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MatrixPutMatrixParamsFieldsEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum MatrixPutMatrixParamsPopulateEnum {
  Dimensions = "dimensions",
}

export enum MatrixPutMatrixParamsPopulateEnum1 {
  Dimensions = "dimensions",
}

export enum MatrixDeleteMatrixParamsFieldsEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum MatrixDeleteMatrixParamsPopulateEnum {
  Dimensions = "dimensions",
}

export enum MatrixDeleteMatrixParamsPopulateEnum1 {
  Dimensions = "dimensions",
}

export enum MentorshipRequestGetMentorshipRequestsParamsFieldsEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsParamsFiltersEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsParamsSortEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsParamsSortEnum1 {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsParamsSortEnum2 {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum MentorshipRequestGetMentorshipRequestsParamsSortEnum4 {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum MentorshipRequestGetMentorshipRequestsParamsPopulateEnum {
  Mentor = "mentor",
  User = "user",
}

export enum MentorshipRequestGetMentorshipRequestsParamsPopulateEnum1 {
  Mentor = "mentor",
  User = "user",
}

export enum MentorshipRequestPostMentorshipRequestsParamsFieldsEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum MentorshipRequestPostMentorshipRequestsParamsPopulateEnum {
  Mentor = "mentor",
  User = "user",
}

export enum MentorshipRequestPostMentorshipRequestsParamsPopulateEnum1 {
  Mentor = "mentor",
  User = "user",
}

export enum MentorshipRequestGetMentorshipRequestsByIdParamsFieldsEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum MentorshipRequestGetMentorshipRequestsByIdParamsPopulateEnum {
  Mentor = "mentor",
  User = "user",
}

export enum MentorshipRequestGetMentorshipRequestsByIdParamsPopulateEnum1 {
  Mentor = "mentor",
  User = "user",
}

export enum MentorshipRequestGetMentorshipRequestsByIdParamsFiltersEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum1 {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum2 {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum4 {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

export enum MentorshipRequestPutMentorshipRequestsByIdParamsFieldsEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum MentorshipRequestPutMentorshipRequestsByIdParamsPopulateEnum {
  Mentor = "mentor",
  User = "user",
}

export enum MentorshipRequestPutMentorshipRequestsByIdParamsPopulateEnum1 {
  Mentor = "mentor",
  User = "user",
}

export enum MentorshipRequestDeleteMentorshipRequestsByIdParamsFieldsEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum MentorshipRequestDeleteMentorshipRequestsByIdParamsPopulateEnum {
  Mentor = "mentor",
  User = "user",
}

export enum MentorshipRequestDeleteMentorshipRequestsByIdParamsPopulateEnum1 {
  Mentor = "mentor",
  User = "user",
}

export enum MentorshipRequestDeleteMentorshipRequestsByIdParamsFiltersEnum {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsParamsFieldsEnum {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsParamsFiltersEnum {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsParamsSortEnum {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsParamsSortEnum1 {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsParamsSortEnum2 {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum ProgramGetProgramsParamsSortEnum4 {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ProgramGetProgramsParamsPopulateEnum {
  Mentors = "mentors",
  Users = "users",
}

export enum ProgramGetProgramsParamsPopulateEnum1 {
  Mentors = "mentors",
  Users = "users",
}

export enum ProgramPostProgramsParamsFieldsEnum {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ProgramPostProgramsParamsPopulateEnum {
  Mentors = "mentors",
  Users = "users",
}

export enum ProgramPostProgramsParamsPopulateEnum1 {
  Mentors = "mentors",
  Users = "users",
}

export enum ProgramGetProgramsByIdParamsFieldsEnum {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ProgramGetProgramsByIdParamsPopulateEnum {
  Mentors = "mentors",
  Users = "users",
}

export enum ProgramGetProgramsByIdParamsPopulateEnum1 {
  Mentors = "mentors",
  Users = "users",
}

export enum ProgramGetProgramsByIdParamsFiltersEnum {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsByIdParamsSortEnum {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsByIdParamsSortEnum1 {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsByIdParamsSortEnum2 {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsByIdParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum ProgramGetProgramsByIdParamsSortEnum4 {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ProgramGetProgramsByIdParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

export enum ProgramPutProgramsByIdParamsFieldsEnum {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ProgramPutProgramsByIdParamsPopulateEnum {
  Mentors = "mentors",
  Users = "users",
}

export enum ProgramPutProgramsByIdParamsPopulateEnum1 {
  Mentors = "mentors",
  Users = "users",
}

export enum ProgramDeleteProgramsByIdParamsFieldsEnum {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ProgramDeleteProgramsByIdParamsPopulateEnum {
  Mentors = "mentors",
  Users = "users",
}

export enum ProgramDeleteProgramsByIdParamsPopulateEnum1 {
  Mentors = "mentors",
  Users = "users",
}

export enum ProgramDeleteProgramsByIdParamsFiltersEnum {
  Name = "name",
  StartDate = "startDate",
  EndDate = "endDate",
  SponsorName = "sponsorName",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsParamsFieldsEnum {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsParamsFiltersEnum {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsParamsSortEnum {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsParamsSortEnum1 {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsParamsSortEnum2 {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum ReportGetReportsParamsSortEnum4 {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ReportGetReportsParamsPopulateEnum {
  Evaluations = "evaluations",
  User = "user",
}

export enum ReportGetReportsParamsPopulateEnum1 {
  Evaluations = "evaluations",
  User = "user",
}

/**
 * A boolean field
 * @default false
 */
export enum ReportPostReportsFinishedEnum {
  Value0 = "0",
  Value1 = "1",
  T = "t",
  True = "true",
  F = "f",
  False = "false",
}

export enum ReportPostReportsParamsFieldsEnum {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ReportPostReportsParamsPopulateEnum {
  Evaluations = "evaluations",
  User = "user",
}

export enum ReportPostReportsParamsPopulateEnum1 {
  Evaluations = "evaluations",
  User = "user",
}

export enum ReportGetReportsByIdParamsFieldsEnum {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ReportGetReportsByIdParamsPopulateEnum {
  Evaluations = "evaluations",
  User = "user",
}

export enum ReportGetReportsByIdParamsPopulateEnum1 {
  Evaluations = "evaluations",
  User = "user",
}

export enum ReportGetReportsByIdParamsFiltersEnum {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsByIdParamsSortEnum {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsByIdParamsSortEnum1 {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsByIdParamsSortEnum2 {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsByIdParamsSortEnum3 {
  Asc = "asc",
  Desc = "desc",
}

export enum ReportGetReportsByIdParamsSortEnum4 {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ReportGetReportsByIdParamsSortEnum5 {
  Asc = "asc",
  Desc = "desc",
}

/**
 * A boolean field
 * @default false
 */
export enum ReportPutReportsByIdFinishedEnum {
  Value0 = "0",
  Value1 = "1",
  T = "t",
  True = "true",
  F = "f",
  False = "false",
}

export enum ReportPutReportsByIdParamsFieldsEnum {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ReportPutReportsByIdParamsPopulateEnum {
  Evaluations = "evaluations",
  User = "user",
}

export enum ReportPutReportsByIdParamsPopulateEnum1 {
  Evaluations = "evaluations",
  User = "user",
}

export enum ReportDeleteReportsByIdParamsFieldsEnum {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

/** Populate a single relation, component, file, or dynamic zone */
export enum ReportDeleteReportsByIdParamsPopulateEnum {
  Evaluations = "evaluations",
  User = "user",
}

export enum ReportDeleteReportsByIdParamsPopulateEnum1 {
  Evaluations = "evaluations",
  User = "user",
}

export enum ReportDeleteReportsByIdParamsFiltersEnum {
  Deadline = "deadline",
  Finished = "finished",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  PublishedAt = "publishedAt",
}

export enum ContentTypeBuilderGetContentTypesKindEnum {
  CollectionType = "collectionType",
  SingleType = "singleType",
}

export enum ContentTypeBuilderGetContentTypesParamsKindEnum {
  CollectionType = "collectionType",
  SingleType = "singleType",
}

export enum ContentTypeBuilderGetContentTypesByUidKindEnum {
  CollectionType = "collectionType",
  SingleType = "singleType",
}

export enum UploadGetFilesParamsSortEnum {
  Asc = "asc",
  Desc = "desc",
}

export enum UploadGetFilesParamsSortEnum1 {
  Asc = "asc",
  Desc = "desc",
}

export enum UsersPermissionsGetUsersParamsSortEnum {
  Asc = "asc",
  Desc = "desc",
}

export enum UsersPermissionsGetUsersParamsSortEnum1 {
  Asc = "asc",
  Desc = "desc",
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
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
     */
    activityGetActivities: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ActivityGetActivitiesParamsFieldsEnum[];
        /** Filters to apply to the query */
        filters?: Record<ActivityGetActivitiesParamsFiltersEnum, any>;
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
          | ActivityGetActivitiesParamsSortEnum
          | ActivityGetActivitiesParamsSortEnum1[]
          | Record<
              ActivityGetActivitiesParamsSortEnum2,
              ActivityGetActivitiesParamsSortEnum3
            >
          | Record<
              ActivityGetActivitiesParamsSortEnum4,
              ActivityGetActivitiesParamsSortEnum5
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ActivityGetActivitiesParamsPopulateEnum
          | ActivityGetActivitiesParamsPopulateEnum1[];
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
        fields?: ActivityPostActivitiesParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ActivityPostActivitiesParamsPopulateEnum
          | ActivityPostActivitiesParamsPopulateEnum1[];
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
     */
    activityGetActivitiesById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ActivityGetActivitiesByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ActivityGetActivitiesByIdParamsPopulateEnum
          | ActivityGetActivitiesByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<ActivityGetActivitiesByIdParamsFiltersEnum, any>;
        /** Sort the result */
        sort?:
          | ActivityGetActivitiesByIdParamsSortEnum
          | ActivityGetActivitiesByIdParamsSortEnum1[]
          | Record<
              ActivityGetActivitiesByIdParamsSortEnum2,
              ActivityGetActivitiesByIdParamsSortEnum3
            >
          | Record<
              ActivityGetActivitiesByIdParamsSortEnum4,
              ActivityGetActivitiesByIdParamsSortEnum5
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
        fields?: ActivityPutActivitiesByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ActivityPutActivitiesByIdParamsPopulateEnum
          | ActivityPutActivitiesByIdParamsPopulateEnum1[];
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
     */
    activityDeleteActivitiesById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ActivityDeleteActivitiesByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ActivityDeleteActivitiesByIdParamsPopulateEnum
          | ActivityDeleteActivitiesByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<ActivityDeleteActivitiesByIdParamsFiltersEnum, any>;
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
     */
    activityTypeGetActivityTypes: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ActivityTypeGetActivityTypesParamsFieldsEnum[];
        /** Filters to apply to the query */
        filters?: Record<ActivityTypeGetActivityTypesParamsFiltersEnum, any>;
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
          | ActivityTypeGetActivityTypesParamsSortEnum
          | ActivityTypeGetActivityTypesParamsSortEnum1[]
          | Record<
              ActivityTypeGetActivityTypesParamsSortEnum2,
              ActivityTypeGetActivityTypesParamsSortEnum3
            >
          | Record<
              ActivityTypeGetActivityTypesParamsSortEnum4,
              ActivityTypeGetActivityTypesParamsSortEnum5
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
        fields?: ActivityTypePostActivityTypesParamsFieldsEnum[];
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
     */
    activityTypeGetActivityTypesById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ActivityTypeGetActivityTypesByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | string | string[];
        /** Filters to apply to the query */
        filters?: Record<
          ActivityTypeGetActivityTypesByIdParamsFiltersEnum,
          any
        >;
        /** Sort the result */
        sort?:
          | ActivityTypeGetActivityTypesByIdParamsSortEnum
          | ActivityTypeGetActivityTypesByIdParamsSortEnum1[]
          | Record<
              ActivityTypeGetActivityTypesByIdParamsSortEnum2,
              ActivityTypeGetActivityTypesByIdParamsSortEnum3
            >
          | Record<
              ActivityTypeGetActivityTypesByIdParamsSortEnum4,
              ActivityTypeGetActivityTypesByIdParamsSortEnum5
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
        fields?: ActivityTypePutActivityTypesByIdParamsFieldsEnum[];
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
     */
    activityTypeDeleteActivityTypesById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ActivityTypeDeleteActivityTypesByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?: "*" | string | string[];
        /** Filters to apply to the query */
        filters?: Record<
          ActivityTypeDeleteActivityTypesByIdParamsFiltersEnum,
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
     */
    dimensionGetDimensions: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: DimensionGetDimensionsParamsFieldsEnum[];
        /** Filters to apply to the query */
        filters?: Record<DimensionGetDimensionsParamsFiltersEnum, any>;
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
          | DimensionGetDimensionsParamsSortEnum
          | DimensionGetDimensionsParamsSortEnum1[]
          | Record<
              DimensionGetDimensionsParamsSortEnum2,
              DimensionGetDimensionsParamsSortEnum3
            >
          | Record<
              DimensionGetDimensionsParamsSortEnum4,
              DimensionGetDimensionsParamsSortEnum5
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | DimensionGetDimensionsParamsPopulateEnum
          | DimensionGetDimensionsParamsPopulateEnum1[];
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
        fields?: DimensionPostDimensionsParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | DimensionPostDimensionsParamsPopulateEnum
          | DimensionPostDimensionsParamsPopulateEnum1[];
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
     */
    dimensionGetDimensionsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: DimensionGetDimensionsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | DimensionGetDimensionsByIdParamsPopulateEnum
          | DimensionGetDimensionsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<DimensionGetDimensionsByIdParamsFiltersEnum, any>;
        /** Sort the result */
        sort?:
          | DimensionGetDimensionsByIdParamsSortEnum
          | DimensionGetDimensionsByIdParamsSortEnum1[]
          | Record<
              DimensionGetDimensionsByIdParamsSortEnum2,
              DimensionGetDimensionsByIdParamsSortEnum3
            >
          | Record<
              DimensionGetDimensionsByIdParamsSortEnum4,
              DimensionGetDimensionsByIdParamsSortEnum5
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
        fields?: DimensionPutDimensionsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | DimensionPutDimensionsByIdParamsPopulateEnum
          | DimensionPutDimensionsByIdParamsPopulateEnum1[];
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
     */
    dimensionDeleteDimensionsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: DimensionDeleteDimensionsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | DimensionDeleteDimensionsByIdParamsPopulateEnum
          | DimensionDeleteDimensionsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<DimensionDeleteDimensionsByIdParamsFiltersEnum, any>;
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
     */
    domainGetDomains: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: DomainGetDomainsParamsFieldsEnum[];
        /** Filters to apply to the query */
        filters?: Record<DomainGetDomainsParamsFiltersEnum, any>;
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
          | DomainGetDomainsParamsSortEnum
          | DomainGetDomainsParamsSortEnum1[]
          | Record<
              DomainGetDomainsParamsSortEnum2,
              DomainGetDomainsParamsSortEnum3
            >
          | Record<
              DomainGetDomainsParamsSortEnum4,
              DomainGetDomainsParamsSortEnum5
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | DomainGetDomainsParamsPopulateEnum
          | DomainGetDomainsParamsPopulateEnum1[];
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
        fields?: DomainPostDomainsParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | DomainPostDomainsParamsPopulateEnum
          | DomainPostDomainsParamsPopulateEnum1[];
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
     */
    domainGetDomainsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: DomainGetDomainsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | DomainGetDomainsByIdParamsPopulateEnum
          | DomainGetDomainsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<DomainGetDomainsByIdParamsFiltersEnum, any>;
        /** Sort the result */
        sort?:
          | DomainGetDomainsByIdParamsSortEnum
          | DomainGetDomainsByIdParamsSortEnum1[]
          | Record<
              DomainGetDomainsByIdParamsSortEnum2,
              DomainGetDomainsByIdParamsSortEnum3
            >
          | Record<
              DomainGetDomainsByIdParamsSortEnum4,
              DomainGetDomainsByIdParamsSortEnum5
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
        fields?: DomainPutDomainsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | DomainPutDomainsByIdParamsPopulateEnum
          | DomainPutDomainsByIdParamsPopulateEnum1[];
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
     */
    domainDeleteDomainsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: DomainDeleteDomainsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | DomainDeleteDomainsByIdParamsPopulateEnum
          | DomainDeleteDomainsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<DomainDeleteDomainsByIdParamsFiltersEnum, any>;
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
     */
    evaluationGetEvaluations: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: EvaluationGetEvaluationsParamsFieldsEnum[];
        /** Filters to apply to the query */
        filters?: Record<EvaluationGetEvaluationsParamsFiltersEnum, any>;
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
          | EvaluationGetEvaluationsParamsSortEnum
          | EvaluationGetEvaluationsParamsSortEnum1[]
          | Record<
              EvaluationGetEvaluationsParamsSortEnum2,
              EvaluationGetEvaluationsParamsSortEnum3
            >
          | Record<
              EvaluationGetEvaluationsParamsSortEnum4,
              EvaluationGetEvaluationsParamsSortEnum5
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | EvaluationGetEvaluationsParamsPopulateEnum
          | EvaluationGetEvaluationsParamsPopulateEnum1[];
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
        fields?: EvaluationPostEvaluationsParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | EvaluationPostEvaluationsParamsPopulateEnum
          | EvaluationPostEvaluationsParamsPopulateEnum1[];
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
     */
    evaluationGetEvaluationsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: EvaluationGetEvaluationsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | EvaluationGetEvaluationsByIdParamsPopulateEnum
          | EvaluationGetEvaluationsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<EvaluationGetEvaluationsByIdParamsFiltersEnum, any>;
        /** Sort the result */
        sort?:
          | EvaluationGetEvaluationsByIdParamsSortEnum
          | EvaluationGetEvaluationsByIdParamsSortEnum1[]
          | Record<
              EvaluationGetEvaluationsByIdParamsSortEnum2,
              EvaluationGetEvaluationsByIdParamsSortEnum3
            >
          | Record<
              EvaluationGetEvaluationsByIdParamsSortEnum4,
              EvaluationGetEvaluationsByIdParamsSortEnum5
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
        fields?: EvaluationPutEvaluationsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | EvaluationPutEvaluationsByIdParamsPopulateEnum
          | EvaluationPutEvaluationsByIdParamsPopulateEnum1[];
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
     */
    evaluationDeleteEvaluationsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: EvaluationDeleteEvaluationsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | EvaluationDeleteEvaluationsByIdParamsPopulateEnum
          | EvaluationDeleteEvaluationsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<EvaluationDeleteEvaluationsByIdParamsFiltersEnum, any>;
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
     */
    matrixGetMatrix: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: MatrixGetMatrixParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | MatrixGetMatrixParamsPopulateEnum
          | MatrixGetMatrixParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<MatrixGetMatrixParamsFiltersEnum, any>;
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
        fields?: MatrixPutMatrixParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | MatrixPutMatrixParamsPopulateEnum
          | MatrixPutMatrixParamsPopulateEnum1[];
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
     */
    matrixDeleteMatrix: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: MatrixDeleteMatrixParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | MatrixDeleteMatrixParamsPopulateEnum
          | MatrixDeleteMatrixParamsPopulateEnum1[];
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
     */
    mentorshipRequestGetMentorshipRequests: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: MentorshipRequestGetMentorshipRequestsParamsFieldsEnum[];
        /** Filters to apply to the query */
        filters?: Record<
          MentorshipRequestGetMentorshipRequestsParamsFiltersEnum,
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
          | MentorshipRequestGetMentorshipRequestsParamsSortEnum
          | MentorshipRequestGetMentorshipRequestsParamsSortEnum1[]
          | Record<
              MentorshipRequestGetMentorshipRequestsParamsSortEnum2,
              MentorshipRequestGetMentorshipRequestsParamsSortEnum3
            >
          | Record<
              MentorshipRequestGetMentorshipRequestsParamsSortEnum4,
              MentorshipRequestGetMentorshipRequestsParamsSortEnum5
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | MentorshipRequestGetMentorshipRequestsParamsPopulateEnum
          | MentorshipRequestGetMentorshipRequestsParamsPopulateEnum1[];
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
        fields?: MentorshipRequestPostMentorshipRequestsParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | MentorshipRequestPostMentorshipRequestsParamsPopulateEnum
          | MentorshipRequestPostMentorshipRequestsParamsPopulateEnum1[];
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
     */
    mentorshipRequestGetMentorshipRequestsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: MentorshipRequestGetMentorshipRequestsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | MentorshipRequestGetMentorshipRequestsByIdParamsPopulateEnum
          | MentorshipRequestGetMentorshipRequestsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<
          MentorshipRequestGetMentorshipRequestsByIdParamsFiltersEnum,
          any
        >;
        /** Sort the result */
        sort?:
          | MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum
          | MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum1[]
          | Record<
              MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum2,
              MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum3
            >
          | Record<
              MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum4,
              MentorshipRequestGetMentorshipRequestsByIdParamsSortEnum5
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
        fields?: MentorshipRequestPutMentorshipRequestsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | MentorshipRequestPutMentorshipRequestsByIdParamsPopulateEnum
          | MentorshipRequestPutMentorshipRequestsByIdParamsPopulateEnum1[];
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
     */
    mentorshipRequestDeleteMentorshipRequestsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: MentorshipRequestDeleteMentorshipRequestsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | MentorshipRequestDeleteMentorshipRequestsByIdParamsPopulateEnum
          | MentorshipRequestDeleteMentorshipRequestsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<
          MentorshipRequestDeleteMentorshipRequestsByIdParamsFiltersEnum,
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
     */
    programGetPrograms: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ProgramGetProgramsParamsFieldsEnum[];
        /** Filters to apply to the query */
        filters?: Record<ProgramGetProgramsParamsFiltersEnum, any>;
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
          | ProgramGetProgramsParamsSortEnum
          | ProgramGetProgramsParamsSortEnum1[]
          | Record<
              ProgramGetProgramsParamsSortEnum2,
              ProgramGetProgramsParamsSortEnum3
            >
          | Record<
              ProgramGetProgramsParamsSortEnum4,
              ProgramGetProgramsParamsSortEnum5
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ProgramGetProgramsParamsPopulateEnum
          | ProgramGetProgramsParamsPopulateEnum1[];
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
        fields?: ProgramPostProgramsParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ProgramPostProgramsParamsPopulateEnum
          | ProgramPostProgramsParamsPopulateEnum1[];
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
     */
    programGetProgramsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ProgramGetProgramsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ProgramGetProgramsByIdParamsPopulateEnum
          | ProgramGetProgramsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<ProgramGetProgramsByIdParamsFiltersEnum, any>;
        /** Sort the result */
        sort?:
          | ProgramGetProgramsByIdParamsSortEnum
          | ProgramGetProgramsByIdParamsSortEnum1[]
          | Record<
              ProgramGetProgramsByIdParamsSortEnum2,
              ProgramGetProgramsByIdParamsSortEnum3
            >
          | Record<
              ProgramGetProgramsByIdParamsSortEnum4,
              ProgramGetProgramsByIdParamsSortEnum5
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
        fields?: ProgramPutProgramsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ProgramPutProgramsByIdParamsPopulateEnum
          | ProgramPutProgramsByIdParamsPopulateEnum1[];
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
     */
    programDeleteProgramsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ProgramDeleteProgramsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ProgramDeleteProgramsByIdParamsPopulateEnum
          | ProgramDeleteProgramsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<ProgramDeleteProgramsByIdParamsFiltersEnum, any>;
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
     */
    reportGetReports: (
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ReportGetReportsParamsFieldsEnum[];
        /** Filters to apply to the query */
        filters?: Record<ReportGetReportsParamsFiltersEnum, any>;
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
          | ReportGetReportsParamsSortEnum
          | ReportGetReportsParamsSortEnum1[]
          | Record<
              ReportGetReportsParamsSortEnum2,
              ReportGetReportsParamsSortEnum3
            >
          | Record<
              ReportGetReportsParamsSortEnum4,
              ReportGetReportsParamsSortEnum5
            >[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ReportGetReportsParamsPopulateEnum
          | ReportGetReportsParamsPopulateEnum1[];
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
          finished: ReportPostReportsFinishedEnum;
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
        fields?: ReportPostReportsParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ReportPostReportsParamsPopulateEnum
          | ReportPostReportsParamsPopulateEnum1[];
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
     */
    reportGetReportsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ReportGetReportsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ReportGetReportsByIdParamsPopulateEnum
          | ReportGetReportsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<ReportGetReportsByIdParamsFiltersEnum, any>;
        /** Sort the result */
        sort?:
          | ReportGetReportsByIdParamsSortEnum
          | ReportGetReportsByIdParamsSortEnum1[]
          | Record<
              ReportGetReportsByIdParamsSortEnum2,
              ReportGetReportsByIdParamsSortEnum3
            >
          | Record<
              ReportGetReportsByIdParamsSortEnum4,
              ReportGetReportsByIdParamsSortEnum5
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
          finished?: ReportPutReportsByIdFinishedEnum;
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
        fields?: ReportPutReportsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ReportPutReportsByIdParamsPopulateEnum
          | ReportPutReportsByIdParamsPopulateEnum1[];
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
     */
    reportDeleteReportsById: (
      id: string,
      query?: {
        /** The fields to return, this doesn't include populatable fields like relations, components, files, or dynamic zones */
        fields?: ReportDeleteReportsByIdParamsFieldsEnum[];
        /** Populate all the first level relations, components, files, and dynamic zones for the entry */
        populate?:
          | "*"
          | ReportDeleteReportsByIdParamsPopulateEnum
          | ReportDeleteReportsByIdParamsPopulateEnum1[];
        /** Filters to apply to the query */
        filters?: Record<ReportDeleteReportsByIdParamsFiltersEnum, any>;
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
     */
    contentTypeBuilderGetContentTypes: (
      query: {
        kind: ContentTypeBuilderGetContentTypesParamsKindEnum;
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
              kind: ContentTypeBuilderGetContentTypesKindEnum;
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
              kind: ContentTypeBuilderGetContentTypesByUidKindEnum;
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
          | Record<string, UploadGetFilesParamsSortEnum>
          | Record<string, UploadGetFilesParamsSortEnum1>[];
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
          | Record<string, UsersPermissionsGetUsersParamsSortEnum>
          | Record<string, UsersPermissionsGetUsersParamsSortEnum1>[];
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
     */
    usersPermissionsPostRegister: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/register`,
        method: "POST",
        ...params,
      }),
  };
}
