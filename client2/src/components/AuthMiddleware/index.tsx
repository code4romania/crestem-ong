import FullScreenLoader from "@/components/FullScreenLoader";
import { useGetMe, useGetToken } from "@/services/user.queries";

import Cookies from "js-cookie";
import React, { useEffect } from "react";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const { data: token } = useGetToken();
  const { data: user, isLoading, isError } = useGetMe();

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
