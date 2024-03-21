import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EvaluationInput } from "@/pages/Evaluation";
import { ReportInput } from "@/pages/NewReport";
import { RootState } from "@/redux/store";
import { setUser } from "../features/userSlice";
import { User, Report, Evaluation, Matrix, Program, Dimension } from "./types";
import { ActivityInput } from "@/pages/mentor/NewActivity";
import qs from "qs";

const BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT as string;

interface IApiError {
  message: string;
  description: string;
  statusCode: string | number;
  data: object;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: [
    "Auth",
    "User",
    "Report",
    "Evaluation",
    "Activity",
    "Program",
    "ProgramUser",
    "Mentor",
  ],
  endpoints: (builder) => ({
    getMe: builder.query<User, null>({
      query() {
        return {
          url: "users/me?populate[0]=reports.evaluations.dimensions.quiz&populate[1]=avatar&populate[2]=role&populate[3]=programs.users&populate[4]=userActivities&populate[5]=mentorActivities.user&populate[6]=mentorActivities.type&populate[7]=mentorActivities.dimension&populate[8]=program&populate[9]=dimensions&populate[10]=domains",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      providesTags: ["Auth", "Activity", "Report"],
    }),
    updateUser: builder.mutation({
      query({ id, ...user }) {
        return {
          method: "PUT",
          url: `users/${id}`,
          body: user,
        };
      },
      invalidatesTags: ["Auth", "User"],
    }),
    getUsers: builder.query<User[], void>({
      query() {
        return {
          url: `users?filters[role][type][$eq]=authenticated&populate[0]=role&populate[1]=domains&populate[2]=reports&populate[3]=program&populate[4]=domains&sort=createdAt%3Adesc`,
        };
      },
      transformResponse: (result: User[]) =>
        result.filter((user) => user?.role?.type !== "fdsc"),
    }),
    getUserReports: builder.query<null, { userId: string }>({
      query({ userId }) {
        return {
          url: `users/${userId}?populate[0]=reports.evaluations.dimensions.quiz&populate[1]=domains`,
        };
      },
      transformResponse: (result: User) => ({
        ...result,
        reports: result.reports?.sort((a: Report, b: Report) => {
          return new Date(b?.createdAt) - new Date(a?.createdAt);
        }),
      }),
      providesTags: ["Report"],
    }),
    getMentors: builder.query<User[], void>({
      query() {
        return {
          url: `users?filters[role][type][$eq]=mentor&populate[0]=role&populate[1]=domains&populate[2]=programs&populate[3]=dimensions&populate[4]=mentorActivities&sort=createdAt%3Adesc`,
        };
      },
      providesTags: ["Mentor"],
    }),
    createMentor: builder.mutation<User, User>({
      query(body) {
        return {
          method: "POST",
          url: "users",
          body,
        };
      },
      invalidatesTags: ["Mentor"],
    }),
    createUser: builder.mutation<User, User>({
      query(body) {
        return {
          method: "POST",
          url: "users",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    createProgram: builder.mutation<User, Program>({
      query(body) {
        return {
          method: "POST",
          url: "programs",
          body: {
            data: body,
          },
        };
      },
      invalidatesTags: ["Program"],
    }),
    getPrograms: builder.query<Program[], void>({
      query() {
        return {
          url: `programs?populate[0]=mentors&populate[1]=users`,
        };
      },
      transformResponse: (result: { data: any }) =>
        result.data.map((report: any) => ({
          ...report.attributes,
          id: report.id,
          mentors: report.attributes.mentors.data.map(
            ({ attributes }) => attributes
          ),
          users: report.attributes.users.data.map(
            ({ attributes }) => attributes
          ),
        })),
      providesTags: ["Program"],
    }),
    findProgram: builder.query<Program, { programId: string }>({
      query({ programId }) {
        const query = qs.stringify({
          populate: {
            mentors: {
              populate: ['dimensions', 'mentorActivities']
            },
            users: {
              populate: {
                reports: {
                  populate: {
                    evaluations: {
                      populate: {
                        dimensions: {
                          populate: {
                            'quiz': true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        });

        return {
          url: `programs/${programId}?${query}`,
        };
      },
      transformResponse: (result) => ({
        ...result.data.attributes,
        mentors: result.data.attributes.mentors?.data?.map(
          ({ id, attributes }) => ({
            ...attributes,
            id,
            mentorActivities: attributes.mentorActivities?.data?.map(
              ({ attributes }) => attributes
            ),
            dimensions: attributes.dimensions?.data?.map(
              ({ attributes }) => attributes
            ),
          })
        ),
        users: result.data.attributes.users?.data?.map(
          ({ id, attributes }) => ({
            ...attributes,
            id,
            reports: attributes.reports.data.map(
              ({ id, attributes }) => ({
                ...attributes,
                id,
                evaluations: attributes.evaluations.data.map(
                  ({ id, attributes }) => ({
                    ...attributes,
                    id,
                  })
                )
              })
            ),
          })
        ),
      }),
      providesTags: ["ProgramUser"],
    }),
    updateProgram: builder.mutation<Program, Program>({
      query: ({ id, ...rest }) => {
        return {
          method: "PUT",
          url: `programs/${id}`,
          credentials: "include",
          body: { data: rest },
        };
      },
      invalidatesTags: ["ProgramUser"],
    }),
    getDimensions: builder.query<Dimension[], void>({
      query() {
        return {
          url: `dimensions`,
        };
      },
      transformResponse: (result: { data: any }) =>
        result.data.map((report: any) => ({
          id: report.id,
          ...report.attributes,
        })),
    }),
    getActivityTypes: builder.query<User[], void>({
      query() {
        return {
          url: `activity-types`,
        };
      },
      transformResponse: (result: { data: any }) =>
        result.data.map((report: any) => ({
          id: report.id,
          ...report.attributes,
        })),
    }),
    createActivity: builder.mutation<any, ActivityInput>({
      query: (data) => ({
        method: "POST",
        url: "activities",
        body: {
          data,
        },
      }),
      invalidatesTags: ["Activity"],
    }),
    createMentorshipRequest: builder.mutation<
      any,
      { user: number; mentor: number }
    >({
      query: (data) => ({
        method: "POST",
        url: "mentorship-requests",
        body: {
          data,
        },
      }),
    }),
    createReport: builder.mutation<Report, ReportInput>({
      query: ({ deadline, evaluations }) => ({
        method: "POST",
        url: "reports",
        body: {
          data: {
            deadline,
            evaluations: evaluations
              ? evaluations
                  .trim()
                  .split(/\r?\n/)
                  .map((email: string) => ({ email }))
              : [],
          },
        },
      }),
      invalidatesTags: ["Report"],
    }),
    getReports: builder.query<Report[], void>({
      query: () => ({
        url: "reports?pagination[pageSize]=1000&populate[0]=user&populate[1]=evaluations.dimensions.quiz&sort=createdAt%3Adesc",
      }),
      transformResponse: (result: { data: any }) =>
        result.data.map((report: any) => ({
          id: report.id,
          ...report.attributes,
          user: report?.attributes?.user?.data?.attributes,
          evaluations: report?.attributes?.evaluations?.data?.map(
            ({ attributes }) => attributes
          ),
        })),
      providesTags: ["Report"],
    }),
    findReport: builder.query<Report, string>({
      query: (reportId) =>
        reportId && {
          url: `reports/${reportId}`,
          credentials: "include",
        },
      providesTags: ["Report", "Evaluation"],
    }),
    updateReport: builder.mutation<Report, Report>({
      query: ({ id, ...rest }) => {
        return {
          method: "PUT",
          url: `reports/${id}`,
          credentials: "include",
          body: { data: rest },
        };
      },
      invalidatesTags: ["Report"],
    }),
    getMatrix: builder.query<Matrix, void>({
      query() {
        return {
          url: "matrix?populate=dimensions.quiz",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: any }) =>
        result?.data?.attributes?.dimensions?.data?.map(
          ({ attributes }: { attributes: Dimension }) => attributes
        ),
    }),
    getEvaluation: builder.query<
      EvaluationInput,
      { evaluationId: string; email: string }
    >({
      query({ evaluationId, email }: { evaluationId: string; email: string }) {
        return {
          url: `evaluations/${evaluationId}?email=${encodeURIComponent(email)}`,
          credentials: "include",
        };
      },
    }),
    getEvaluationsCount: builder.query<Report[], void>({
      query: () => ({
        url: "evaluations?populate=dimensions.quiz&pagination[pageSize]=1000",
      }),
      transformResponse: (result: { data: any }) =>
        result?.data.map((evaluation: any) => ({
          id: evaluation.id,
          ...evaluation.attributes,
        })),
    }),
    deleteEvaluation: builder.mutation<Evaluation, Evaluation>({
      query: ({ id }) => {
        return {
          method: "DELETE",
          url: `evaluations/${id}`,
          credentials: "include",
        }
      },
      invalidatesTags: ["Report"],
    }),
    getDomains: builder.query({
      query() {
        return {
          url: `domains`,
        };
      },
      transformResponse: (result: { data: any }) =>
        result.data.map((domain: any) => ({
          id: domain.id,
          ...domain.attributes,
        })),
    }),
    getRegistrationInfo: builder.query({
      query({ registrationToken }) {
        return {
          url: `users-permissions/registration-info?registrationToken=${registrationToken}`,
        };
      },
    }),
    registerWithConfirmationToken: builder.mutation<Evaluation, User>({
      query(user) {
        return {
          method: "POST",
          url: "/users-permissions/register",
          body: {
            data: user,
          },
        };
      },
    }),
    createEvaluation: builder.mutation<
      Evaluation,
      Pick<Evaluation, "id" | "email">
    >({
      query({ id, email }) {
        return {
          method: "POST",
          url: "evaluations",
          body: {
            data: {
              report: id,
              email,
            },
          },
        };
      },
      invalidatesTags: ["Evaluation"],
    }),
    submitEvaluation: builder.mutation<
      any,
      { evaluationId: string; dimensions: EvaluationInput[] }
    >({
      query({ evaluationId, dimensions }) {
        return {
          method: "PUT",
          url: `evaluations/${evaluationId}`,
          body: { data: { dimensions } },
          credentials: "include",
        };
      },
    }),
    upload: builder.mutation<any, any>({
      query(data) {
        return {
          url: "upload",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useSubmitEvaluationMutation,
  useUpdateUserMutation,
  useGetEvaluationQuery,
  useCreateEvaluationMutation,
  useDeleteEvaluationMutation,
  useCreateReportMutation,
  useFindReportQuery,
  useUpdateReportMutation,
  useUploadMutation,
  useGetUsersQuery,
  useGetUserReportsQuery,
  useGetMentorsQuery,
  useGetDomainsQuery,
  useGetReportsQuery,
  useGetEvaluationsCountQuery,
  useGetRegistrationInfoQuery,
  useRegisterWithConfirmationTokenMutation,
  useCreateProgramMutation,
  useGetProgramsQuery,
  useFindProgramQuery,
  useUpdateProgramMutation,
  useGetDimensionsQuery,
  useCreateMentorMutation,
  useCreateUserMutation,
  useGetMatrixQuery,
  useGetActivityTypesQuery,
  useCreateActivityMutation,
  useCreateMentorshipRequestMutation,
} = userApi;
