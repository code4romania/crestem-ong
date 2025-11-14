import formatDate from "@/lib/formatDate";
import { useListNgoMentorActivities } from "@/services/activities.queries";
import type { FinalDetailedUserModel } from "@/services/api/types";
import { useCallback } from "react";
import { toMentorActivityVM } from "./activities-table";
import type { MentorActivityVM } from "./type";
import ExportXLSX from "@/components/ExportXLSX";
import type { Sheet } from "@/lib/excel";

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
      const rows = activities.map((activity) => [
        ngo.ongName,
        [activity.mentor?.firstName, activity.mentor?.lastName]
          .filter(Boolean)
          .join(" ") || "-",
        formatDate(activity.startDate),
        activity.duration,
        activity.dimension.name,
        activity.type.name,
        activity.notes,
      ]);
      return [
        {
          name: "Jurnal de activitate",
          data: [
            [
              "Organizația",
              "Mentor",
              "Dată",
              "Durată activitate (ore)",
              "Dimensiune",
              "Tip activitate",
              "Notițe",
            ],
            ...rows,
          ],
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
