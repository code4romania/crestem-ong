import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginInput } from "@/pages/Login";
import { RegisterInput } from "@/pages/Register";
import { RegisterResponse } from "./types";
import { userApi } from "./userApi";
import { data } from "autoprefixer";

const BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT as string;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth/local`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterInput>({
      query(data) {
        return {
          url: "register",
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<
      { jwt: string; user: { username: string } },
      LoginInput
    >({
      query(data) {
        return {
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
