import { Button } from "@/components/ui/button";
import { getRouteApi } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";
import { Download, Plus } from "lucide-react";
import { useCallback } from "react";
import { downloadExcel } from "react-export-table-to-excel";
import type { NgoVM } from "../types";
import formatDate from "@/lib/formatDate";
const route = getRouteApi("/(app)/users/");

export function NgosPrimaryButtons({ table }: { table: Table<NgoVM> }) {
  const navigate = route.useNavigate();
  const header = [
    "NUME ONG",
    "CIF",
    "DATĂ ÎNREGISTRARE",
    "PROGRAM",
    "JUDEȚ",
    "LOCALITATE",
    "DOMENIU DE ACTIVITATE",
    "ULTIMA EVALUARE",
  ];

  const body = table
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
        ongName,
        ongIdentificationNumber,
        createdAt: formatDate(createdAt),
        program: programName || "-",
        county,
        city,
        domains: domains?.length ? domains.map((d) => d).join(",") : "-",
        lastEvaluationDate: lastEvaluationDate
          ? formatDate(lastEvaluationDate)
          : "-",
      })
    );

  const handleDownloadExcel = useCallback(() => {
    downloadExcel({
      fileName: "organizații",
      sheet: "Organizații",
      tablePayload: {
        header,
        body,
      },
    });
  }, [header, body]);

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
