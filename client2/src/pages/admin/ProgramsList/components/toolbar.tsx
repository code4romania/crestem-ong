import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRouteApi } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const route = getRouteApi("/(app)/programs/");

export function TableToolbar() {
  const isFiltered = route.useSearch({
    select: (search) => Boolean(search.search) || search.status !== "all",
  });

  const navigate = route.useNavigate();

  const searchString = route.useSearch({
    select: (search) => search.search,
  });

  const [inputValue, setInputValue] = useState(searchString);
  const debouncedSearch = useDebounce(inputValue, 300);

  // apply debounced value to table filters
  useEffect(() => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: undefined,
        search: debouncedSearch,
      }),
    });
  }, [debouncedSearch]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder={"Cauta"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="flex gap-x-2"></div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setInputValue("");
              navigate({
                search: (prev) => ({
                  ...prev,
                  page: undefined,
                  search: undefined,
                  status: undefined,
                }),
              });
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
