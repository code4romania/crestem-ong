import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "@/redux/api/userApi";
import FullScreenLoader from "@/components/FullScreenLoader";

const RequireUser = () => {
  const location = useLocation();
  const { isSuccess, isLoading } = userApi.endpoints.getMe.useQueryState(null);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return isSuccess ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
