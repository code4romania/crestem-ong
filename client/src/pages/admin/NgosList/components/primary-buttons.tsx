import { Button } from "@/components/ui/button";
import { downloadDataToXLSX } from "@/lib/excel";
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
          ngoPrograms,
          lastEvaluationDate,
          city,
          domains,
        }) => [
          ongName,
          ongIdentificationNumber,
          createdAt,
          ngoPrograms?.map((p) => p.name).join(",") || "N/A",
          county,
          city,
          domains?.join(",") || "N/A",
          lastEvaluationDate,
        ]
      );

    downloadDataToXLSX("organizatii.xlsx", () => [
      {
        name: "Organizații",
        data: [
          [
            "NUME ONG",
            "CIF",
            "DATĂ ÎNREGISTRARE",
            "PROGRAME",
            "JUDEȚ",
            "LOCALITATE",
            "DOMENIU DE ACTIVITATE",
            "ULTIMA EVALUARE",
          ],
          ...rows,
        ],
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
