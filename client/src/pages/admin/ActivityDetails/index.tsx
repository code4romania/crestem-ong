import { Route } from "@/routes/(app)/activities/$activityId";
import { useSuspenseGetActivityById } from "@/services/activities.queries";

import Confirm from "@/components/Confirm";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import formatDate from "@/lib/formatDate";
import { useDeleteActivityMutation } from "@/services/activity.mutations";
import { Link, useNavigate } from "@tanstack/react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import { toast } from "sonner";

function ActivityDetails() {
  const navigate = useNavigate();
  const { activityId } = Route.useParams();
  const { returnTo } = Route.useSearch();
  const { data: activity } = useSuspenseGetActivityById(activityId);
  const { mutate: deleteActivity } = useDeleteActivityMutation();
  const [open, setOpen] = useState(false);
  const { userRole } = useAuth();

  const rows: [string, string | undefined | null | ReactNode][] = [
    [
      "Persoană resursă",
      [activity.mentor.firstName, activity.mentor.lastName]
        .filter(Boolean)
        .join(" ") || "-",
    ],
    ["ONG participant", activity.user.ongName || "-"],
    ["Dimensiune", activity.dimension.name || "-"],
    ["Tip activitate", activity.type.name || "-"],
    ["Data", formatDate(activity.startDate) || "-"],
    ["Durata", `${activity.duration} ore`],
    ["Notițe", `${activity.notes || "-"}`],
  ];

  const handleDelete = useCallback(() => {
    deleteActivity(activity.id, {
      onSuccess: () => {
        toast.success("Activitatea a fost ștearsă.");
        // todo fix redirect
        return navigate({
          to: returnTo ? returnTo : "/activities",
        });
      },
      onError: (error) => {
        const errorResponse = (error as any)?.response?.data?.error;
        const message = errorResponse?.message;
        toast.error(message);
      },
    });
  }, [deleteActivity, activity.id, navigate]);
  return (
    <>
      <>
        <Confirm
          header="Șterge activitatea"
          body="Ești sigur că vrei să ștergi activitatea? Aceasta nu va mai fi disponibilă pentru vizualizare."
          buttonText="Șterge"
          open={open}
          setOpen={setOpen}
          handleComplete={handleDelete}
          destructive={true}
        />
      </>
      <Section>
        <div className="flex w-full items-center justify-between">
          <Heading level="h2">Detalii activitate #{activity.id}</Heading>

          <div className="flex gap-2">
            <Button asChild variant="secondary">
              <Link
                to={
                  returnTo
                    ? returnTo
                    : userRole === "mentor"
                    ? "/activities"
                    : "/mentors/$mentorId"
                }
                params={{ mentorId: activity.mentor.id.toString() }}
              >
                Înapoi
              </Link>
            </Button>
            {userRole === "mentor" && (
              <>
                <Button variant="destructive" onClick={() => setOpen(true)}>
                  <Trash2Icon className="size-4" />
                  Șterge
                </Button>

                <Button asChild>
                  <Link
                    to="/activities/$activityId/edit"
                    params={{ activityId: activity.id.toString() }}
                  >
                    <PencilIcon className="size-4" />
                    Modifica
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white shadow ring-1 ring-gray-900/5 sm:rounded-lg">
          <dl className="divide-y divide-gray-100">
            {rows.map(([label, value], idx) => (
              <div
                key={idx}
                className={`px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {label}
                </dt>

                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {value || "-"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}

export default ActivityDetails;
