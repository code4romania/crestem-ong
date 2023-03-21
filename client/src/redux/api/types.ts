export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface User {
  activities: string;
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
}

export interface IGenericResponse {
  status: string;
  message: string;
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
