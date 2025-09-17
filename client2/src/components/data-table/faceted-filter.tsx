"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { Column } from "@tanstack/react-table";
import { PlusCircle, X } from "lucide-react";
import type * as React from "react";

type DataTableSingleSelectFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};

export function DataTableSingleSelectFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableSingleSelectFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValue = column?.getFilterValue() as string | undefined;
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={selectedValue || "default"}
        onValueChange={(value) => {
          column?.setFilterValue(value === "default" ? undefined : value);
        }}
      >
        <SelectTrigger className="h-8 w-auto border-dashed bg-transparent">
          <div className="flex items-center space-x-2">
            <PlusCircle className="size-4" />
            <span>{title}</span>
            {selectedValue && (
              <>
                <div className="mx-2 h-4 w-px bg-border" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedOption?.label}
                </Badge>
              </>
            )}
          </div>
        </SelectTrigger>
        <SelectContent className="w-[200px]" align="start">
          <SelectItem value="default">
            <span className="text-muted-foreground">Toate</span>
          </SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center space-x-2">
                {option.icon && (
                  <option.icon className="text-muted-foreground size-4" />
                )}
                <span>{option.label}</span>
                {facets?.get(option.value) && (
                  <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                    {facets.get(option.value)}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedValue && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={() => column?.setFilterValue(undefined)}
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
