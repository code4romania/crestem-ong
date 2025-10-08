import type { FinalEvaluationModel } from "@/services/api/types";

export interface ReportVM {
  id: number;
  createdAt: string;
  deadline: string;
  numberOfCompletedEvaluations: number;
  totalEvaluations: number;
  score: string;
  finished: boolean;
  completedEvaluations: FinalEvaluationModel[];
}
