import { router } from "@/index";
import formatDate from "@/lib/formatDate";
import { useDeleteActivityMutation } from "@/services/activity.mutations";
import type { MentorActivityModel } from "@/services/api/types";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "@tanstack/react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Confirm from "../Confirm";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export interface FeedProps {
  activities: MentorActivityModel[];
}
export function Feed({ activities }: FeedProps) {
  const [modalState, setModalState] = useState<{
    modalOpen: boolean;
    activityId: number | null;
  }>({ modalOpen: false, activityId: null });

  const { mutate: deleteActivity } = useDeleteActivityMutation();
  const handleDelete = (id: number) => {
    deleteActivity(id, {
      onSuccess: () => toast.success("Activitatea a fost ștearsă."),
      onError: (error) => {
        toast.error("Activitatea nu a fost ștearsă.");
      },
    });
  };
  return (
    <div className="flow-root">
      <Confirm
        header="Șterge activitatea"
        body="Ești sigur că vrei să ștergi activitatea? Aceasta nu va mai fi disponibilă pentru vizualizare."
        buttonText="Șterge"
        open={modalState.modalOpen}
        setOpen={() => setModalState({ modalOpen: false, activityId: null })}
        handleComplete={() => handleDelete(modalState.activityId!)}
        destructive={true}
      />
      <ul role="list" className="-mb-8">
        {activities.map((activityItem, activityItemIdx) => (
          <li key={activityItem.id}>
            <div className="relative pb-8">
              {activityItemIdx !== activities.length - 1 ? (
                <span
                  className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <>
                  <div>
                    <div className="relative px-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                        <UserCircleIcon
                          className="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm flex items-center gap-1">
                        <span className="font-medium text-gray-900">
                          Organizația {activityItem.user?.ongName}
                        </span>
                        <Badge variant="outline">
                          <svg
                            className="h-1.5 w-1.5 fill-teal-500"
                            viewBox="0 0 6 6"
                            aria-hidden="true"
                          >
                            <circle cx="3" cy="3" r="3"></circle>
                          </svg>
                          {activityItem.type?.name}
                        </Badge>
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            to="/activities/$activityId/edit"
                            params={{
                              activityId: activityItem.id.toString(),
                            }}
                            search={{
                              returnTo: router.state.location.pathname,
                            }}
                          >
                            <PencilIcon className="size-4 text-primary" />
                          </Link>
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setModalState({
                              modalOpen: true,
                              activityId: activityItem.id,
                            })
                          }
                        >
                          <Trash2Icon className="size-4 text-destructive" />
                        </Button>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {formatDate(activityItem.startDate)} (
                        {activityItem.duration}h)
                      </p>
                      <p className="mt-2 text-sm text-gray-500 font-semibold">
                        {activityItem.dimension?.name}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {activityItem.notes}
                      </p>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
