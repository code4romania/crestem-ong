import FullScreenLoader from "@/components/FullScreenLoader";
import getUserType from "@/lib/userType";
import ProgramsList from "@/pages/admin/ProgramsList";
import { useAppSelector } from "@/redux/store";
import { listProgramsQueryOptions } from "@/services/programs.queries";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

const filtersSchema = z.object({
  search: z.string().default(""),
  status: z.enum(["ongoing", "finished", "all"]).default("all"),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  page: z.number().default(1),
  pageSize: z.number().default(25),
});

export const Route = createFileRoute("/(app)/programs/")({
  validateSearch: zodValidator(filtersSchema),
  loaderDeps: ({ search: { search, startDate, endDate, page, pageSize } }) => ({
    search,
    startDate,
    endDate,
    page,
    pageSize,
  }),

  loader: async ({
    context: { queryClient },
    deps: { search, startDate, endDate, page, pageSize },
  }) =>
    queryClient.prefetchQuery(
      listProgramsQueryOptions({
        page,
        pageSize,
        search,
        startDate,
        endDate,
      })
    ),
  component: RouteComponent,
  pendingComponent: FullScreenLoader,
});

function RouteComponent() {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);

  return userType === "fdsc" ? <ProgramsList /> : <Navigate to="/" />;
}
