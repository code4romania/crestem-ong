"use client";

import * as React from "react";
import envelope from "@/assets/envelope.svg";
import DeleteEvaluation from "@/components/DeleteEvaluation";
import { useGetMe } from "@/services/user.queries";

import type {
  FinalEvaluationModel,
  FinalReportModel,
} from "@/services/api/types";
import { Link } from "@tanstack/react-router";
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  flexRender,
  type Row,
} from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

interface TableEvaluationsProps {
  report: FinalReportModel;
}

const TableEvaluations = ({ report }: TableEvaluationsProps) => {
  const { data: user } = useGetMe();
  const isFDSC = user?.role?.type === "fdsc";

  const evaluations = report?.evaluations || [];

  const columns = React.useMemo<ColumnDef<FinalEvaluationModel>[]>(
    () => [
      {
        accessorKey: "email",
        header: "EMAIL",
        cell: ({ row }) => (
          <span className="text-sm font-medium text-gray-900">
            {row.original.email}
          </span>
        ),
      },
      {
        id: "status",
        header: "STATUS",
        cell: ({ row }) => {
          const { dimensions } = row.original;
          const completed =
            dimensions.reduce(
              (acc: number, dimension: any) => acc + dimension.quiz.length,
              0
            ) === 50;
          return (
            <span className="text-sm text-gray-500">
              {completed ? (
                <Badge>Completat</Badge>
              ) : (
                <Badge variant="destructive">Necompletat</Badge>
              )}
            </span>
          );
        },
      },
      ...(isFDSC
        ? [
            {
              id: "answers",
              header: "",
              cell: ({ row }: { row: Row<FinalEvaluationModel> }) => {
                const { id, email, dimensions } = row.original;
                return (
                  dimensions.length === 10 && (
                    <Button variant="link" asChild>
                      <Link
                        to="/evaluation/$evaluationId"
                        params={{ evaluationId: id.toString() }}
                        search={{ email }}
                      >
                        Vezi răspunsurile
                      </Link>
                    </Button>
                  )
                );
              },
            },
          ]
        : []),
      ...(!report.finished
        ? [
            {
              id: "delete",
              header: "",
              cell: ({ row }: { row: Row<FinalEvaluationModel> }) => (
                <div className="text-right">
                  <DeleteEvaluation id={row.original.id} />
                </div>
              ),
            },
          ]
        : []),
    ],
    [isFDSC, report.finished]
  );

  const table = useReactTable({
    data: evaluations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!evaluations.length) {
    return (
      <div className="flex flex-col items-center">
        <img src={envelope} />
        <h3 className="text-2xl text-gray-900 font-bold mt-6 mb-2">
          Niciun membru invitat
        </h3>
        <p className="max-w-xl text-center text-gray-500 text-lg">
          Adaugă adresele de email ale membrilor organizației pentru a-i invita
          să completeze evaluarea
        </p>
      </div>
    );
  }

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
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableEvaluations;
