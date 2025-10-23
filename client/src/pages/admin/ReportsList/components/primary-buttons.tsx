import { Button } from "@/components/ui/button";
import { useSuspenseListReports } from "@/services/reports.queries";
import { Download } from "lucide-react";
import { downloadExcel } from "react-export-table-to-excel";
import { reportsMapper } from "./table";
import { useMemo } from "react";
import formatDate from "@/lib/formatDate";

const header = [
  "ID",
  "ONG",
  "DOMENIU DE ACTIVITATE",
  "CIF",
  "LOCALITATE",
  "JUDEȚ",
  "PERSOANA RESURSA ALOCATĂ",
  "DATĂ ÎNCEPUT",
  "DATĂ FINAL",
  "SCOR OBȚINUT",
  "NUMĂR COMPLETĂRI",
  "NUMĂR INVITAȚII",
];

export function ReportsPrimaryButtons() {
  const { data } = useSuspenseListReports(reportsMapper);
  const body = useMemo(
    () =>
      data?.map(
        ({
          id,
          ngoName,
          domains,
          ongIdentificationNumber,
          city,
          county,
          mentor,
          startDate,
          endDate,
          finished,
          score,
          completedEvaluationsCount,
          evaluationsCount,
        }) => {
          return {
            id,
            ongName: ngoName,
            domains: domains?.length ? domains.map((d) => d).join(",") : "-",
            ongIdentificationNumber: ongIdentificationNumber,
            city: city,
            county: county,
            mentor: mentor,
            startDate: formatDate(startDate),
            endDate: finished ? formatDate(endDate) : "În progres",
            score: finished ? `${score}%` : "În progres",
            completedEvaluationsCount: completedEvaluationsCount,
            evaluationsCount: evaluationsCount,
          };
        }
      ),
    [data]
  );
  function onDownloadExcel() {
    downloadExcel({
      fileName: "evaluari",
      sheet: "evaluari",
      tablePayload: {
        header,
        body,
      },
    });
  }

  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={onDownloadExcel}>
        <span>Descarca tabel </span> <Download size={18} />
      </Button>
    </div>
  );
}
