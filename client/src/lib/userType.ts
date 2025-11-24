import type { FinalDetailedUserModel } from "@/services/api/types";
import type { FinalRoleType } from "@/services/api/types";

export function getUserType(user?: FinalDetailedUserModel): FinalRoleType {
  return user?.role?.type
    ? (user?.role?.type as FinalRoleType)
    : user
    ? "authenticated"
    : "public";
}
