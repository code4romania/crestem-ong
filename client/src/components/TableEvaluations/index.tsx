import envelope from "@/assets/envelope.svg";
import * as React from "react";

import { useAuth } from "@/contexts/auth";
import formatDate from "@/lib/formatDate";
import type {
  FinalEvaluationModel,
  FinalReportModel,
} from "@/services/api/types";
import {
  useDeleteEvaluationMutation,
  useResendEvaluationMutation,
} from "@/services/evaluation.mutations";
import { Link } from "@tanstack/react-router";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table";
import { Ellipsis, MailIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import Confirm from "../Confirm";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface TableEvaluationsProps {
  report: FinalReportModel;
}

const TableEvaluations = ({ report }: TableEvaluationsProps) => {
  const { userRole } = useAuth();
  const { mutate: deleteEvaluation } = useDeleteEvaluationMutation();
  const { mutate: resendEvaluation } = useResendEvaluationMutation();

  const [rowAction, setRowAction] = React.useState<{
    action: "delete" | "resend";
    evaluationId: number;
    email: string;
  } | null>(null);

  const isFDSC = userRole === "fdsc";
  const isMentor = userRole === "mentor";
  const isAuthenticated = userRole === "authenticated";

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
                <Badge variant="warning">Necompletat</Badge>
              )}
            </span>
          );
        },
      },
      {
        id: "invitedAt",
        header: "INVITAT LA",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      ...(isFDSC || isMentor
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
      ...(isFDSC || isAuthenticated
        ? [
            {
              id: "actions",
              cell: ({ row }: { row: Row<FinalEvaluationModel> }) => {
                const completed =
                  row.original.dimensions.reduce(
                    (acc: number, dimension: any) =>
                      acc + dimension.quiz.length,
                    0
                  ) === 50;
                return (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label="Open menu"
                        variant="ghost"
                        className="flex size-8 p-0 data-[state=open]:bg-muted"
                      >
                        <Ellipsis className="size-4" aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        disabled={completed || report.finished}
                        onSelect={() =>
                          setRowAction({
                            evaluationId: row.original.id,
                            action: "resend",
                            email: row.original.email,
                          })
                        }
                      >
                        <MailIcon className="h-5 w-5" aria-hidden="true" />
                        Retrimite invitația
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="flex items-center gap-2 text-destructive"
                        onSelect={() =>
                          setRowAction({
                            evaluationId: row.original.id,
                            action: "delete",
                            email: row.original.email,
                          })
                        }
                      >
                        <TrashIcon
                          className="h-5 w-5 text-destructive"
                          aria-hidden="true"
                        />
                        Șterge invitația
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              },
              size: 40,
            },
          ]
        : []),
    ],
    [isFDSC, report.finished]
  );

  const handleDeleteInvite = React.useCallback(() => {
    if (!rowAction?.evaluationId) return;

    deleteEvaluation(rowAction?.evaluationId, {
      onSuccess: () => toast.success("Invitația a fost ștearsă."),
      onError: (error) => {
        const errorResponse = (error as any)?.response?.data?.error;
        const message = errorResponse?.message;
        toast.error(message);
      },
    });

    setRowAction(null);
  }, [rowAction?.evaluationId]);

  const handleResendInvite = React.useCallback(() => {
    if (!rowAction?.evaluationId) return;

    resendEvaluation(rowAction?.evaluationId, {
      onSuccess: (response) => {
        if (response.notificationSentAt) {
          toast.warning(
            `Utilizatorul a primit deja o invitație la data de ${formatDate(
              response.notificationSentAt
            )}. Vei putea sa ii trimi o noua invitație peste ${formatDate(
              response.nextAvailableTime
            )}.`
          );
        } else {
          toast.success("Invitația a fost retrimisă.");
        }
      },
      onError: () => {
        toast.error("A apărut o eroare la re-trimiterea invitației.");
      },
    });

    setRowAction(null);
  }, [rowAction?.evaluationId]);

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
    <>
      <DataTable table={table} emptyMessage="Niciun membru invitat" />
      <Confirm
        header="Retrimite invitația"
        body={`Ești sigur că vrei să retrimiți invitația catre ${rowAction?.email}? Utilizatorul va primi o nouă invitație prin email.`}
        buttonText="Retrimite"
        open={rowAction?.action === "resend"}
        setOpen={() => setRowAction(null)}
        handleComplete={() => {
          handleResendInvite();
        }}
      />
      <Confirm
        header="Șterge adresa de email"
        body={`Ești sigur că vrei să ștergi ${rowAction?.email}? Utilizatorul nu va mai avea acces la evaluare și va trebui să trimiți invitația din nou pentru ca progresul să fie salvat.`}
        buttonText="Șterge"
        open={rowAction?.action === "delete"}
        setOpen={() => setRowAction(null)}
        handleComplete={() => {
          handleDeleteInvite();
        }}
        destructive={true}
      />
    </>
  );
};

export default TableEvaluations;
