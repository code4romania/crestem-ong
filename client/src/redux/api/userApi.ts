import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EvaluationInput } from "@/pages/Evaluation";
import { ReportInput } from "@/pages/NewReport";
import { RootState } from "@/redux/store";
import { setUser } from "../features/userSlice";
import { User, Report, Evaluation, Matrix } from "./types";

const BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT as string;

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
    getUsers: builder.query<null, null>({
      query() {
        return {
          url: "users?populate=role",
        };
      },
    }),
    getUserReports: builder.query<null, { userId: string }>({
      query({ userId }) {
        return {
          url: `users/${userId}?populate=reports.evaluations.dimensions.quiz`,
        };
      },
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
} = userApi;
