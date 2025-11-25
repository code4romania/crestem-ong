import { Button } from "@/components/ui/button";
import { useSuspenseListReports } from "@/services/reports.queries";
import { Download } from "lucide-react";
import { reportsMapper } from "./table";
import { useCallback } from "react";
import formatDate from "@/lib/formatDate";
import { downloadDataToXLSX } from "@/lib/excel";

export function ReportsPrimaryButtons() {
  const { data } = useSuspenseListReports(reportsMapper);

  const handleDownloadExcel = useCallback(() => {
    const rows = data?.map(
      ({
        id,
        ngoName,
        domains,
        ongIdentificationNumber,
        city,
        county,
        mentors,
        startDate,
        endDate,
        finished,
        score,
        completedEvaluationsCount,
        evaluationsCount,
      }) => {
        return [
          id,
          ngoName,
          domains?.join(",") || "N/A",
          ongIdentificationNumber,
          city,
          county,
          mentors.filter(Boolean).join(", ") ?? "N/A",
          formatDate(startDate),
          finished ? formatDate(endDate) : "În progres",
          finished ? `${score}%` : "În progres",
          completedEvaluationsCount,
          evaluationsCount,
        ];
      }
    );

    downloadDataToXLSX("evaluari.xlsx", () => [
      {
        name: "evaluari",
        data: [
          [
            "ID",
            "ONG",
            "DOMENIU DE ACTIVITATE",
            "CIF",
            "LOCALITATE",
            "JUDEȚ",
            "PERSOANA RESURSĂ ALOCATĂ",
            "DATĂ ÎNCEPUT",
            "DATĂ FINAL",
            "SCOR OBȚINUT",
            "NUMĂR COMPLETĂRI",
            "NUMĂR INVITAȚII",
          ],
          ...rows,
        ],
      },
    ]);
  }, [data]);

  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={handleDownloadExcel}
        disabled={!data?.length}
      >
        <span>Descarca tabel </span> <Download size={18} />
      </Button>
    </div>
  );
}
