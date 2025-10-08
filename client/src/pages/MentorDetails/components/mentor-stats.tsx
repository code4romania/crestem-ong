import Stats from "@/components/Stats";
import { useAuth } from "@/contexts/auth";
import { useListMentorActivities } from "@/services/activities.queries";
import type {
  FinalDetailedUserModel,
  MentorActivityModel,
} from "@/services/api/types";

function mapper(data: MentorActivityModel[]): {
  hoursMentored: number;
  numberOfMeetings: number;
  numberOfNgosMentored: number;
} {
  return {
    hoursMentored: data.reduce((acc, activity) => acc + activity.duration, 0),
    numberOfMeetings: data.length,
    numberOfNgosMentored: new Set(data.map((activity) => activity.user.ongName))
      .size,
  };
}
export function MentorStats({ mentor }: { mentor: FinalDetailedUserModel }) {
  const { data } = useListMentorActivities(mentor.id, mapper);
  const { userRole } = useAuth();

  if (userRole !== "fdsc") {
    return null;
  }

  return (
    <Stats
      data={[
        {
          label: "Total ore mentorat",
          value: data?.hoursMentored ?? 0,
        },
        {
          label: "Total întâlniri",
          value: data?.numberOfMeetings ?? 0,
        },
        {
          label: "Total ONG-uri mentorate",
          value: data?.numberOfNgosMentored ?? 0,
        },
      ]}
    />
  );
}
