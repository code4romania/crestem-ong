import type { Table } from "@tanstack/react-table";
import React from "react";

import { X } from "lucide-react";

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { DebouncedInput } from "@/components/ui/debounced-input";
import type { ProgramVM } from "../type";

interface ProgramsDataTableToolbarProps {
  table: Table<ProgramVM>;
}

const statuses = [
  {
    label: "In desfasurare",
    value: "ongoing",
  },
  {
    label: "Incheiat",
    value: "finished",
  },
];

export function ProgramsDataTableToolbar({
  table,
}: ProgramsDataTableToolbarProps) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  const onReset = React.useCallback(() => {
    table.resetColumnFilters();
    table.setGlobalFilter("");
  }, [table]);

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={"flex w-full items-start justify-between gap-2 p-1"}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <DebouncedInput
          placeholder="Cauta"
          className="h-8 w-[150px] lg:w-[250px]"
          onChange={(value) => {
            table.setGlobalFilter(value);
          }}
          value={table.getState().globalFilter ?? ""}
        />

        <DataTableFacetedFilter
          column={table.getColumn("status")}
          title={"Status"}
          options={statuses}
          multiple={false}
        />

        {isFiltered && (
          <Button
            aria-label="Sterge filtre"
            variant="outline"
            size="sm"
            className="border-dashed"
            onClick={onReset}
          >
            <X />
            Sterge filtre
          </Button>
        )}
      </div>
    </div>
  );
}
