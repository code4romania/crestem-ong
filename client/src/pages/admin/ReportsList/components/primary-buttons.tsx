import { Button } from "@/components/ui/button";
import { useSuspenseListReports } from "@/services/reports.queries";
import { Download } from "lucide-react";
import { reportsMapper } from "./table";
import { useCallback, useMemo } from "react";
import formatDate from "@/lib/formatDate";
import { downloadJSONToXLSX } from "@/lib/utils";

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
        return {
          ID: id,
          ONG: ngoName,
          "DOMENIU DE ACTIVITATE": domains?.length
            ? domains.map((d) => d).join(",")
            : "-",
          CIF: ongIdentificationNumber,
          LOCALITATE: city,
          JUDEȚ: county,
          "PERSOANA RESURSĂ ALOCATĂ":
            mentors.filter(Boolean).join(", ") ?? "N/A",
          "DATĂ ÎNCEPUT": formatDate(startDate),
          "DATĂ FINAL": finished ? formatDate(endDate) : "În progres",
          "SCOR OBȚINUT": finished ? `${score}%` : "În progres",
          "NUMĂR COMPLETĂRI": completedEvaluationsCount,
          "NUMĂR INVITAȚII": evaluationsCount,
        };
      }
    );

    downloadJSONToXLSX("evaluari.xlsx", () => [
      {
        name: "evaluari",
        rows: rows,
        cols: Object.keys(rows[0]).map((key) => ({ width: key.length + 3 })),
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
