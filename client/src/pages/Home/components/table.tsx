import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/lib/formatDate";
import { calcScore } from "@/lib/score";
import type { FinalReportModel } from "@/services/api/types";
import { useGetUserReports } from "@/services/reports.queries";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ReportVM } from "../types";
import { programColumns as columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

const mapper = (result: FinalReportModel[]): ReportVM[] =>
  result.map((r) => {
    const evaluationsCompleted = r.evaluations
      ? r.evaluations.filter(({ dimensions }) => dimensions.length === 10)
      : [];

    return {
      id: r.id.toString(),
      evaluationName: `Evaluare ${formatDate(r.createdAt)}`,
      completionPeriod: `${formatDate(r.createdAt)} - ${formatDate(
        r.deadline
      )}`,
      numberOfCompletions: evaluationsCompleted.length,
      score:
        evaluationsCompleted?.length > 0
          ? r.finished
            ? `${calcScore(evaluationsCompleted)}%`
            : "-"
          : "-",
      isFinished: r.finished,
    };
  });

export function ReportsTable() {
  const { data } = useGetUserReports(mapper);

  const table = useReactTable({
    data: data ?? [],
    columns,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return <DataTable table={table} />;
}
