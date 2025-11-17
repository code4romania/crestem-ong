import type { FinalProgramModel } from "@/services/api/types";

export interface MenteeVM {
  id: number;
  ongName: string;
  ongIdentificationNumber: string;
  createdAt: string;
  ngoPrograms: FinalProgramModel[];
  county: string;
  city: string;
  domains: string[];
  lastEvaluationDate: string | undefined;
}
