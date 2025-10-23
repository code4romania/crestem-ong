export interface MenteeVM {
  id: number;
  ongName: string;
  ongIdentificationNumber: string;
  createdAt: string;
  programName: string | undefined;
  county: string;
  city: string;
  domains: string[];
  lastEvaluationDate: string | undefined;
}
