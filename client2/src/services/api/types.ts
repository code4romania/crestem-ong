export interface PaginationRequest {
  page: number;
  pageSize: number;
}

export interface RoleModel {
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
}

export interface MentorDomainModel {
  id: number;
  /** A string field */
  name: string;
  /** A string field */
  link?: string;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /** A datetime field */
  publishedAt: string;
}
export interface MentorDimensionModel {
  id: number;
  /** A string field */
  name: string;
  /** A string field */
  link?: string;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
  /** A datetime field */
  publishedAt: string;
}

export interface DomainModel {
  id: number;
  attributes: DomainAtrributeModel;
}

export interface DomainAtrributeModel {
  name: string;
  /** A datetime field */
  createdAt?: string;
  /** A datetime field */
  updatedAt?: string;
}

export interface MentorProgramModel {
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
}

export interface UploadFileDocumentModel {
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
  formats?: Record<string, FormatModel>;
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

export interface FormatModel {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

export interface MentorActivityModel {
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
}

export interface ProgramModel {
  id: number;
  attributes: ProgramAttributesModel;
}

export interface ProgramAttributesModel {
  name: string;
  startDate: string;
  endDate: string;
  sponsorName?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface MetaModel {
  pagination: PaginationModel;
}

export interface PaginationModel {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface DimensionModel {
  id: number;
  attributes: DimensionAttributes;
}

export interface DimensionAttributes {
  name: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
}
