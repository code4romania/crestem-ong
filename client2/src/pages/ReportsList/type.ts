export interface ReportVM {
  id: number;
  ngoName: string;
  startDate: string;
  endDate: string;
  finished: boolean;
  score: number;
  completedEvaluationsCount: number;
  evaluationsCount: number;
}
