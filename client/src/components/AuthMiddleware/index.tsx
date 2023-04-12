import React, { useEffect } from "react";
import FullScreenLoader from "@/components/FullScreenLoader";
import { userApi } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/store";
import Cookies from "js-cookie";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const token = useAppSelector((state) => state.userState.token);
  const user = useAppSelector((state) => state.userState.user);
  const { isLoading, isError } = userApi.endpoints.getMe.useQuery(null, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isError) {
      Cookies.remove("jwt");
    }
  }, [isError]);

  if ((token && !user) || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <FullScreenLoader />
      </div>
    );
  }

  return children;
};

export default AuthMiddleware;
