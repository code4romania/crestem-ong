import { Button } from "@/components/ui/button";
import { downloadJSONToXLSX } from "@/lib/utils";
import { getRouteApi } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";
import { Download, Plus } from "lucide-react";
import { useCallback } from "react";
import type { NgoVM } from "../types";
const route = getRouteApi("/(app)/users/");

export function NgosPrimaryButtons({ table }: { table: Table<NgoVM> }) {
  const navigate = route.useNavigate();

  const handleDownloadExcel = useCallback(() => {
    const rows = table
      .getRowModel()
      .flatRows.map((r) => r.original)
      .map(
        ({
          ongName,
          ongIdentificationNumber,
          createdAt,
          county,
          programName,
          lastEvaluationDate,
          city,
          domains,
        }) => ({
          "NUME ONG": ongName,
          CIF: ongIdentificationNumber,
          "DATĂ ÎNREGISTRARE": createdAt,
          PROGRAM: programName,
          JUDEȚ: county,
          LOCALITATE: city,
          "DOMENIU DE ACTIVITATE": domains,
          "ULTIMA EVALUARE": lastEvaluationDate,
        })
      );

    downloadJSONToXLSX("organizatii.xlsx", () => [
      {
        name: "Organizații",
        rows: rows,
        cols: Object.keys(rows[0]).map((key) => ({ width: key.length + 3 })),
      },
    ]);
  }, [table]);

  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        variant="secondary"
        onClick={handleDownloadExcel}
      >
        <span>Descarca tabel </span> <Download size={18} />
      </Button>
      <Button
        className="space-x-1"
        onClick={() => navigate({ to: "/create/user" })}
      >
        <span>Adaugă organizatie </span> <Plus size={18} />
      </Button>
    </div>
  );
}
