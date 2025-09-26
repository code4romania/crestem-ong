import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { confirmAccount } from "./api/confirm-account.api";
import { forgotPassword } from "./api/forgot-password.api";
import { loginUser } from "./api/login-user.api";
import { registerUser } from "./api/register-user.api";
import { resetPassword } from "./api/reset-password.api";
import { updateNgo, type UpdateNgoRequest } from "./api/update-ngo.api";
import { uploadUserAvatar } from "./api/upload-picture.api";
import {
  updateMentor,
  type UpdateMentorRequest,
} from "./api/update-mentor.api";

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

export function useConfirmAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmAccount,
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

export function useUploadPictureMutation() {
  return useMutation({
    mutationFn: uploadUserAvatar,
  });
}

export function updateNgoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateNgoRequest) => updateNgo(request),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function updateMentorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateMentorRequest) => updateMentor(request),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
