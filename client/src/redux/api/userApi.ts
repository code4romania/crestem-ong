import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import { IUser, Report, Evaluation } from "./types";
import { EvaluationInput } from "../../pages/Evaluation";
import { ReportInput } from "@/pages/NewReport";

const BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT as string;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().userState.token;
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["User", "Report", "Evaluation"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "users/me?populate[0]=reports.evaluations.dimensions.quiz&populate[1]=avatar",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
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
              ? evaluations?.split("\n")?.map((email) => ({ email }))
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
    getMatrix: builder.query<IUser, null>({
      query() {
        return {
          url: "matrix?populate=dimensions.quiz",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: any }) =>
        result.data.attributes.dimensions,
    }),
    getEvaluation: builder.query<EvaluationInput, null>({
      query({ evaluationId, email }: { evaluationId: string; email: string }) {
        return {
          url: `evaluations/${evaluationId}?populate=dimensions.quiz&email=${email}`,
          credentials: "include",
        };
      },
      transformResponse: (result: { data: any }) => result.data.attributes,
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
    submitEvaluation: builder.mutation<any, EvaluationInput>({
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
} = userApi;
