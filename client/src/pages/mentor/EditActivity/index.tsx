import { useAuth } from "@/contexts/auth";
import { Route } from "@/routes/(app)/activities/$activityId/edit";
import { useSuspenseGetActivityById } from "@/services/activities.queries";
import { useUpdateActivityMutation } from "@/services/activity.mutations";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { useCallback } from "react";
import { toast } from "sonner";
import ActivityForm, { type ActivityInput } from "../components/ActivityForm";

function EditActivity() {
  const { activityId } = Route.useParams();
  const { data: activity } = useSuspenseGetActivityById(activityId);
  const { mutate: updateActivity } = useUpdateActivityMutation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (data: ActivityInput) => {
      updateActivity(
        {
          id: activityId,
          ...data,
          startDate: format(data.startDate, "yyyy-MM-dd"),
          duration: data.duration.toString(),
          notes: data.notes ?? "",
          mentor: user!.id,
        },
        {
          onSuccess: () => {
            toast.success("Activitatea a fost actualizata");
            navigate({ to: "/activities" });
          },
        }
      );
    },
    [updateActivity, activityId, user, navigate]
  );
  return <ActivityForm onSubmit={onSubmit} activity={activity} />;
}

export default EditActivity;
