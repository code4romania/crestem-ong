import FullScreenLoader from "@/components/FullScreenLoader";
import { useAppSelector } from "@/redux/store";
import { useGetMe } from "@/services/user.queries";
import Cookies from "js-cookie";
import React, { useEffect } from "react";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const token = useAppSelector((state) => state.userState.token);
  const user = useAppSelector((state) => state.userState.user);
  const { isLoading, isError } = useGetMe();

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
