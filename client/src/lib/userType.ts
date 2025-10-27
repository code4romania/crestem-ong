import type { MeModel } from "@/services/api/get-me.api";
import type { FinalRoleType } from "@/services/api/types";

export function getUserType(user?: MeModel): FinalRoleType {
  return user?.role?.type
    ? user?.role?.type
    : user
    ? "authenticated"
    : "public";
}
