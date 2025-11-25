export interface ReportVM {
  id: number;
  ngoName: string;
  domains: string[];
  ongIdentificationNumber: string;
  city: string;
  county: string;
  mentors: string[];
  startDate: string;
  endDate: string;
  finished: boolean;
  score: number;
  completedEvaluationsCount: number;
  evaluationsCount: number;
}
