import { setToken } from "@/redux/features/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { forgotPassword } from "./api/forgot-password.api";
import { loginUser } from "./api/login-user.api";
import { registerUser } from "./api/register-user.api";
import { resetPassword } from "./api/reset-password.api";
import { uploadUserAvatar } from "./api/upload-picture.api";
import { useNavigate } from "@tanstack/react-router";

export function useRegisterUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      Cookies.set("jwt", data.jwt);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate({ to: "/" });
    },
  });
}

export function useUploadPictureMutation() {
  return useMutation({
    mutationFn: uploadUserAvatar,
  });
}
