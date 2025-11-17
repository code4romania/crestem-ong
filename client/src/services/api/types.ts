export type FinalRoleType = "public" | "authenticated" | "mentor" | "fdsc";

export interface PaginationRequest {
  page?: number;
  pageSize?: number;
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
  startDate: string;
  notes: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  dimension: FinalDimensionModel;
  type: ActivityTypeModel;
  user: FinalUserModel;
  mentor: FinalUserModel;
}

export interface ActivityTypeModel {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinalProgramModel {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  sponsorName?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  users: FinalUserModel[];
  mentors: FinalUserModel[];
  mentorsCount: number | undefined;
  usersCount: number | undefined;
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
  name: string;
  link?: string;
}

export interface FinalReportModel {
  id: number;
  deadline: string;
  finished: boolean;
  createdAt: string;
  updatedAt: string;
  evaluations: FinalEvaluationModel[];
  user?: FinalUserModel;
}

export interface FinalEvaluationModel {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  dimensions: FinalEvaluationDimensionModel[];
}

export interface FinalEvaluationDimensionModel {
  comment: string;
  quiz: FinalEvaluationQuizModel[];
}

export interface FinalEvaluationQuizModel {
  answer: number;
}

export interface FinalUserModel {
  id: number;
  username: string;
  email: string;
  provider: string;
  password?: string | undefined;
  resetPasswordToken?: string | undefined;
  confirmationToken?: string | undefined;
  confirmed: boolean;
  blocked: boolean;
  ongName: string;
  ongIdentificationNumber: string;
  county: string;
  city: string;
  phone: string;
  website: string;
  keywords: string;
  description: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  accountFacebook: string | undefined;
  accountTwitter: string | undefined;
  accountTiktok: string | undefined;
  accountInstagram: string | undefined;
  accountLinkedin: string | undefined;
  createdAt: string;
  updatedAt: string;
  registrationToken?: string | undefined;
  bio: string | undefined;
  expertise: string | undefined;
  firstName: string | undefined;
  available: boolean;
  lastName: string | undefined;
  avatar?: Avatar;
  domains?: FinalDomainModel[];
  dimensions?: FinalDimensionModel[];
  mentorActivities?: any[];
  reports?: FinalReportModel[];
  mentors?: FinalUserModel[];
  ngoPrograms?: FinalProgramModel[];
}

export interface FinalDetailedUserModel extends FinalUserModel {
  userSessions: MentorshipRelationModel[];
  domains: FinalDomainModel[];
  dimensions: FinalDimensionModel[];
  reports: FinalReportModel[];
  // program?: FinalProgramModel;
  role: RoleModel;
  mentorPrograms: FinalProgramModel[];
  userPrograms: FinalProgramModel[];
}

export interface FinalMatrixModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  dimensions: FinalDimensionModel[];
}

export interface FinalDimensionModel {
  id: number;
  name: string;
  link?: string | undefined;
  quiz: FinalQuizModel[];
}

export interface FinalQuizModel {
  id: number;
  question: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  option_5: string;
  tag: string;
}

export interface FinalDomainModel {
  id: number;
  name: string;
}

export interface Avatar {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  large: Format;
  small: Format;
  medium: Format;
  thumbnail: Format;
}

export interface Format {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
}
export interface FinalProgramModel {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  sponsorName?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  mentors: FinalUserModel[];
  users: FinalUserModel[];
}

export interface MentorshipRelationModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: FinalUserModel;
  mentor: FinalUserModel;
}
