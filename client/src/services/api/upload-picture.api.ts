import { API } from "../api";
export interface UploadUserAvatarRequest {
  userId: number;
  file: File;
}

export const uploadUserAvatar = (
  request: UploadUserAvatarRequest
): Promise<void> => {
  const formData = new FormData();
  formData.append("files", request.file, request.file.name);
  formData.append("ref", "plugin::users-permissions.user"); // Strapi relation
  formData.append("refId", request.userId.toString()); // Registered user ID
  formData.append("field", "avatar"); // Field in User model

  return API.post(`api/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);
};
