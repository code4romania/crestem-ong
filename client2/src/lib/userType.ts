import type { MeModel } from "@/services/api/get-me.api";
import type { FinalRoleType } from "@/services/api/types";

export default (user?: MeModel): FinalRoleType =>
  user?.role?.type ? user?.role?.type : user ? "authenticated" : "public";
