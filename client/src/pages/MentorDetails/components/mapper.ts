import type { MentorActivityModel } from "@/services/api/types";
import type { MentorActivityVM } from "./types";

export const mapper = (result: MentorActivityModel[]): MentorActivityVM[] =>
  result.map((ma) => {
    return {
      id: ma.id.toString(),
      ngo: ma.user?.ongName ?? "N/A",
      dimension: ma.dimension?.name ?? "N/A",
      activityType: ma.type?.name ?? "N/A",
      startDate: ma.startDate ?? "N/A",
      duration: ma.duration ?? 0,
      notes: ma.notes ?? "N/A",
    };
  });
