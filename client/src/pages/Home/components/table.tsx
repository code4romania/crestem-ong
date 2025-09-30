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

  return (
    <div className="space-y-4 ">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  0 Rezultate
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
