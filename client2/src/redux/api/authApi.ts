import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginInput } from "src/pages/public/Login";
import { RegisterInput } from "src/pages/public/Register";
import { RegisterResponse } from "./types";
import { userApi } from "./userApi";

const BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT as string;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/auth`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponse, RegisterInput>({
      query(data) {
        return {
          url: "local/register",
          method: "POST",
          body: data,
        };
      },
    }),
    // forgotPassword: builder.mutation<RegisterResponse, ForgotPasswordInput>({
    //   query(data) {
    //     return {
    //       url: "forgot-password",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    // }),
    // resetPassword: builder.mutation<RegisterResponse, ResetPasswordInput>({
    //   query(data) {
    //     return {
    //       url: "reset-password",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    // }),
    loginUser: builder.mutation<
      { jwt: string; user: { username: string } },
      LoginInput
    >({
      query(data) {
        return {
          url: "local",
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

export const { useRegisterUserMutation } = authApi;
