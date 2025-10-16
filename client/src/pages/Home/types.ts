export interface ReportVM {
  id: string;
  evaluationName: string;
  completionPeriod: string;
  numberOfCompletions: number;
  totalEvaluations: number;
  score: string;
  isFinished: boolean;
}
