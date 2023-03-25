import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import FullScreenLoader from "@/components/FullScreenLoader";
import { userApi } from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setToken } from "@/redux/features/userSlice";
import { useNavigate } from "react-router-dom";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const token = useAppSelector((state) => state.userState.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: !token,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (token && token !== cookies.jwt) {
      setCookie("jwt", token);
      navigate("/");
    }
  }, [token, cookies.jwt, navigate]);

  useEffect(() => {
    if (cookies.jwt) {
      dispatch(setToken(cookies.jwt));
    }
  }, [cookies.jwt]);

  if (isLoading || (cookies.jwt && !token)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <FullScreenLoader />
      </div>
    );
  }

  return children;
};

export default AuthMiddleware;
