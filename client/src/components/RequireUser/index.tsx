import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "@/redux/api/userApi";

const RequireUser = () => {
  const location = useLocation();

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => {
      return data!;
    },
  });

  console.log("require user", user);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
