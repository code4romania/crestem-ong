import type { Table } from "@tanstack/react-table";
import React from "react";

import { X } from "lucide-react";

import { DataTableDateFilter } from "@/components/data-table/data-table-date-filter";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { DebouncedInput } from "@/components/ui/debounced-input";
import { citiesByCounty } from "@/lib/orase-dupa-judet";
import type { FinalDomainModel, FinalProgramModel } from "@/services/api/types";
import { useSuspenseListDomains } from "@/services/domains.queries";
import { useSuspenseListPrograms } from "@/services/programs.queries";
import type { Option } from "@/types/data-table";
import type { MenteeVM } from "../types";

interface MenteesDataTableToolbarProps {
  table: Table<MenteeVM>;
}

function mapToOptions(
  domains: FinalDomainModel[] | FinalProgramModel[]
): Option[] {
  return domains.map((domain) => ({
    label: domain.name,
    value: domain.name,
  }));
}

export function MenteesDataTableToolbar({
  table,
}: MenteesDataTableToolbarProps) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  const { data: domains } = useSuspenseListDomains(mapToOptions);
  const { data: programs } = useSuspenseListPrograms(mapToOptions);
  const counties = React.useMemo(
    () =>
      Object.keys(citiesByCounty).map((county) => ({
        label: county,
        value: county,
      })),
    []
  );

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

  const availableCities = React.useMemo(
    () =>
      county
        ? [...new Set(citiesByCounty[county].map((city) => city.nume))]
            .sort()
            .map((city) => ({
              value: city,
              label: city,
            }))
        : [],
    [citiesByCounty, county]
  );

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
          column={table.getColumn("createdAt")!}
          title="Dată Înregistrare"
          multiple={true}
        />
        <DataTableDateFilter
          column={table.getColumn("lastEvaluationDate")!}
          title="Ultima evaluare"
          multiple={true}
        />
        <DataTableFacetedFilter
          column={table.getColumn("ngoPrograms")}
          title={"Programe"}
          options={programs}
          multiple={true}
        />
        <DataTableFacetedFilter
          column={table.getColumn("domains")}
          title={"Domenii activitate"}
          options={domains}
          multiple={true}
        />
        <DataTableFacetedFilter
          column={table.getColumn("county")}
          title={"Județ"}
          options={counties}
          multiple={false}
        />
        <DataTableFacetedFilter
          column={table.getColumn("city")}
          title={"Localitate"}
          options={availableCities}
          multiple={false}
          disabled={!county}
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
