import ExportXLSX, { type Sheet } from "@/components/ExportXLSX";
import formatDate from "@/lib/formatDate";
import { useListNgoMentorActivities } from "@/services/activities.queries";
import type { FinalDetailedUserModel } from "@/services/api/types";
import { useCallback } from "react";
import { toMentorActivityVM } from "./activities-table";
import type { MentorActivityVM } from "./type";

export const ExportActivitiesButton = ({
  ngo,
}: {
  ngo: FinalDetailedUserModel;
}) => {
  const { data: activities } = useListNgoMentorActivities(
    ngo.id,
    toMentorActivityVM
  );

  const getSheets = useCallback(
    (activities: MentorActivityVM[]): Sheet[] => {
      const rows = activities.map((activity) => ({
        Organizația: ngo.ongName,
        Mentor:
          [activity.mentor?.firstName, activity.mentor?.lastName]
            .filter(Boolean)
            .join(" ") || "-",
        Dată: formatDate(activity.startDate),
        "Durată activitate (ore)": activity.duration,
        Dimensiune: activity.dimension.name,
        "Tip activitate": activity.type.name,
        Notițe: activity.notes,
      }));
      return [
        {
          name: "Jurnal de activitate",
          rows: rows,
          cols: Object.keys(activities[0]).map((key) => ({
            width: key.length + 3,
          })),
        },
      ];
    },
    [ngo, activities]
  );

  return (
    <ExportXLSX
      fileName={`${ngo.ongName} - Jurnal de activitate.xlsx`}
      getSheets={() => getSheets(activities ?? [])}
    />
  );
};
