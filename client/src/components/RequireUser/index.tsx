import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useAppSelector } from "@/redux/store";

const RequireUser = () => {
  const location = useLocation();
  const user = useAppSelector((state) => state.userState.user);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
