import type {
  ActivityTypeModel,
  FinalDimensionModel,
  FinalEvaluationModel,
  FinalUserModel,
} from "@/services/api/types";

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

export interface MentorActivityVM {
  id: number;
  createdAt: string;
  startDate: string;
  duration: number;
  dimension: FinalDimensionModel;
  type: ActivityTypeModel;
  mentor: FinalUserModel | null;
  notes: string;
}
