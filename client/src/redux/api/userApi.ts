import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EvaluationInput } from "@/pages/Evaluation";
import { ReportInput } from "@/pages/NewReport";
import { RootState } from "@/redux/store";
import { setUser } from "../features/userSlice";
import { User, Report, Evaluation, Matrix, Program } from "./types";

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
  tagTypes: ["User", "Report", "Evaluation"],
  endpoints: (builder) => ({
    getMe: builder.query<User, null>({
      query() {
        return {
          url: "users/me?populate[0]=reports.evaluations.dimensions.quiz&populate[1]=avatar&populate[2]=role",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    getUsers: builder.query<User[], null>({
      query() {
        return {
          url: `users?filters[role][type][$eq]=authenticated&populate[0]=role&populate[1]=domains&populate[2]=reports&sort=createdAt%3Adesc`,
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
      transformResponse: (result: User[]) => ({
        ...result,
        reports: result.reports.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      }),
    }),
    getMentors: builder.query<User[], null>({
      query() {
        return {
          url: `users?filters[role][type][$eq]=mentor&populate[0]=role&populate[1]=domains&populate[2]=programs&populate[3]=dimensions&sort=createdAt%3Adesc`,
        };
      },
    }),
    createMentor: builder.mutation<User, User>({
      query(body) {
        return {
          method: "POST",
          url: "users",
          body,
        };
      },
    }),
    getPrograms: builder.query<Program[], null>({
      query() {
        return {
          url: `programs`,
        };
      },
      transformResponse: (result: { data: any }) =>
        result.data.map((report: any) => ({
          id: report.id,
          ...report.attributes,
        })),
    }),
    getDimensions: builder.query<User[], null>({
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
    }),
    getReports: builder.query<Report[], null>({
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
    getMatrix: builder.query<Matrix, null>({
      query() {
        return {
          url: "matrix?populate=dimensions.quiz",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: any }) =>
        result.data.attributes.dimensions,
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
    getEvaluationsCount: builder.query<Report[], null>({
      query: () => ({
        url: "evaluations?populate=dimensions.quiz&pagination[pageSize]=1000",
      }),
      transformResponse: (result: { data: any }) =>
        result.data.map((evaluation: any) => ({
          id: evaluation.id,
          ...evaluation.attributes,
        })),
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
    }),
  }),
});

export const {
  useSubmitEvaluationMutation,
  useGetEvaluationQuery,
  useCreateEvaluationMutation,
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
  useGetProgramsQuery,
  useGetDimensionsQuery,
  useCreateMentorMutation,
} = userApi;
