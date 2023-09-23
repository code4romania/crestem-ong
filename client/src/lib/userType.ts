import { User, RoleType } from "@/redux/api/types";

export default (user?: User): RoleType =>
  user?.role?.type ? user?.role?.type : user ? "authenticated" : "public";
