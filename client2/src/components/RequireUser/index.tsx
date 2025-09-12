import { useAppSelector } from "@/redux/store";
import { Navigate, Outlet, useLocation } from "@tanstack/react-router";

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
