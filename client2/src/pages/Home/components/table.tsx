import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTableUrlState } from "@/hooks/use-table-url-state";
import type { ProgramModel as ApiProgramModel } from "@/services/api/types";
import { useSuspenseListPrograms } from "@/services/programs.queries";
import { getRouteApi } from "@tanstack/react-router";
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

const route = getRouteApi("/(app)/programs/");
const mapper = (result: ApiProgramModel[]): ReportVM[] =>
  result.map((p) => ({
    id: p.id,
    name: p.attributes.name,
    status:
      new Date() < new Date(p.attributes.endDate) ? "ongoing" : "finished",
    usersCount: p.attributes.usersCount,
    mentorsCount: p.attributes.mentorsCount,
  }));

export function ProgramsTable() {
  const { data } = useSuspenseListPrograms(mapper);

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    globalFilterFn: (row, _columnId, filterValue) => {
      const name = String(row.original.name).toLowerCase();
      const searchValue = String(filterValue).toLowerCase();

      return name.toLowerCase().includes(searchValue.toLowerCase());
    },
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
