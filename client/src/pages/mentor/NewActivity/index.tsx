import { useCallback } from "react";

import { useCreateActivityMutation } from "@/services/activity.mutations";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { useAuth } from "@/contexts/auth";
import { queryClient } from "@/lib/query";
import { format } from "date-fns";
import ActivityForm, { type ActivityInput } from "../components/ActivityForm";
import Heading from "@/components/Heading";
import Section from "@/components/Section";

const NewActivity = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutate: createActivity, isPending } = useCreateActivityMutation();

  const onSubmit = useCallback(
    (data: ActivityInput) => {
      createActivity(
        {
          ...data,
          startDate: format(data.startDate, "yyyy-MM-dd"),
          duration: Number(data.duration),
          notes: data.notes ?? "",
          mentor: user!.id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["me", "mentor-activities"],
            });
            navigate({ to: "/activities" });
          },
          onError: () => toast.error("A aparut o problema"),
        }
      );
    },
    [createActivity]
  );

  return (
    <>
      <Section>
        <Heading level={"h2"}>Adaugă activitate</Heading>
      </Section>
      <ActivityForm onSubmit={onSubmit} />
    </>
  );
};

export default NewActivity;
