// src/hooks/useAuth.ts
import { useAppDispatch } from "@/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { forgotPassword } from "./api/forgot-password.api";
import { loginUser } from "./api/login-user.api";
import { registerUser } from "./api/register-user.api";
import { resetPassword } from "./api/reset-password.api";
import { setToken } from "@/redux/features/userSlice";
import { uploadUserAvatar } from "./api/upload-picture.api";

export function useRegisterUserMutation() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      dispatch(setToken(data.jwt));
      Cookies.set("jwt", data.jwt);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: resetPassword,
  });
}

export function useLoginUserMutation() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      dispatch(setToken(data.jwt));
      Cookies.set("jwt", data.jwt);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useUploadPictureMutation() {
  return useMutation({
    mutationFn: uploadUserAvatar,
  });
}
