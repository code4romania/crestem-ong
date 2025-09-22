export interface ReportVM {
  id: string;
  evaluationName: string;
  completionPeriod: string;
  numberOfCompletions: number;
  score: number | undefined;
  isFinished: boolean;
}
