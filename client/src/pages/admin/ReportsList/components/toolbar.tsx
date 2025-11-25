import type { Table } from "@tanstack/react-table";
import React from "react";

import { X } from "lucide-react";

import { DataTableDateFilter } from "@/components/data-table/data-table-date-filter";
import { DataTableSliderFilter } from "@/components/data-table/data-table-slider-filter";
import { Button } from "@/components/ui/button";
import { DebouncedInput } from "@/components/ui/debounced-input";
import type { ReportVM } from "../types";

interface ReportsDataTableToolbarProps {
  table: Table<ReportVM>;
}

export function ReportsDataTableToolbar({
  table,
}: ReportsDataTableToolbarProps) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  const county = React.useMemo(() => {
    const filterValue = table.getColumn("county")?.getFilterValue();
    if (Array.isArray(filterValue) && filterValue.length > 0) {
      return filterValue[0]; // since multiple = false, we only care about the first
    }
    return undefined;
  }, [table.getColumn("county")?.getFilterValue()]);

  React.useEffect(() => {
    table.getColumn("city")?.setFilterValue(undefined);
  }, [county]);

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
        <DataTableDateFilter
          column={table.getColumn("startDate")!}
          title="Dată început"
          multiple={true}
        />
        <DataTableDateFilter
          column={table.getColumn("endDate")!}
          title="Dată final"
          multiple={true}
        />
        <DataTableSliderFilter
          column={table.getColumn("score")!}
          title="Scor"
        />

        {isFiltered && (
          <Button
            aria-label="Șterge filtre"
            variant="outline"
            size="sm"
            className="border-dashed"
            onClick={onReset}
          >
            <X />
            Șterge filtre
          </Button>
        )}
      </div>
    </div>
  );
}
