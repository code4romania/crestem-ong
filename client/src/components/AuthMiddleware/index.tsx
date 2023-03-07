import React, { useEffect } from "react";
import { useCookies } from 'react-cookie';
import FullScreenLoader from '../FullScreenLoader';
import { userApi } from '../../redux/api/userApi';
import { useAppDispatch } from "../../redux/store";
import { setToken } from "../../redux/features/userSlice";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const [cookies] = useCookies(['jwt']);
  const dispatch = useAppDispatch();

  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: !cookies.jwt,
  });

  useEffect(()=>{
    dispatch(setToken(cookies.jwt));
  },[cookies.jwt])

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;