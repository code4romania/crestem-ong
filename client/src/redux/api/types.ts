export type RoleType = "public" | "authenticated" | "mentor" | "fdsc";
interface Role {
  id: number;
  type: RoleType;
}
interface ActivityType {
  name: string;
}

export interface Activity {
  organisation: User;
  type: ActivityType;
  dimensions: Dimension[];
  startDate: string;
  endDate: string;
  notes: string;
  duration: number;
}

export interface Quiz {
  score: number;
  option1: number;
  option2: number;
  option3: number;
  option4: number;
  option5: number;
}

export interface User {
  id: number;
  createdAt: string;
  userActivities?: Activity[];
  mentorActivities?: Activity[];
  city: string;
  confirmPassword: string;
  contactEmail: string;
  contactFirstName: string;
  contactLastName: string;
  contactPhone: string;
  county: string;
  description: string;
  email: string;
  keywords: string;
  ongIdentificationNumber: string;
  ongName: string;
  password: string;
  phone: string;
  username: string;
  website: string;
  reports: Report[];
  domains?: Domain[];
  program: Program;
  role?: Role;
  accountFacebook?: string;
  accountTwitter?: string;
  accountTiktok?: string;
  accountInstagram?: string;
  accountLinkedin?: string;


  //   Mentor
  firstName: string;
  lastName: string;
  available: boolean;
  programs: Program[];
  dimensions: Dimension[];
}

export interface Question {
  id: number;
  answer: number;
}

export interface Dimension {
  id: number | string;
  quiz: Question[];
}

export interface Evaluation {
  id: number | string;
  createdAt: string;
  updatedAt: string;
  dimensions: Dimension[];
  email: string;
}

export interface Report {
  user?: User;
  id: number | string;
  createdAt: string;
  updatedAt: string;
  deadline: string;
  finished: boolean;
  evaluations: Evaluation[];
}

export interface RegisterResponse {
  jwt: string;
  user: User;
}

export interface Domain {
  id: number;
  name: string;
}

export interface Program {
  id: string | number;
  name: string;
  startDate: string;
  endDate: string;
  mentors?: User[];
  sponsorName?: string;
  users?: User[];
}

export type Matrix = {
  name: string;
  quiz: {
    question: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    option_5: string;
    tag: string;
  }[];
}[];
