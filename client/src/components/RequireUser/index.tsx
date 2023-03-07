import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "../../redux/api/userApi";
import FullScreenLoader from "../FullScreenLoader";

const RequireUser = () => {
  const [cookies] = useCookies(["jwt"]);
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => {
      return data!;
    },
  });

  if (loading) {
    return <FullScreenLoader />;
  }

  return cookies.jwt || user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
