import { API } from "../api";

export interface CreateMentorshipRequestRequest {}

export const createMentorshipRequest = (
  request: CreateMentorshipRequestRequest
): Promise<void> => {
  const params = {
    populate: {
      mentors: {
        populate: ["dimensions", "mentorActivities"],
      },
      users: {
        populate: {
          reports: {
            populate: {
              evaluations: {
                populate: {
                  dimensions: {
                    populate: {
                      quiz: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return API.post<void>(`any`, request).then((res) => res.data);
};
