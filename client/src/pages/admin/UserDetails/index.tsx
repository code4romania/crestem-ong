import { Route } from "@/routes/(app)/users/$userId";

import FullScreenLoader from "@/components/FullScreenLoader";
import { useSuspenseGetUserDetails } from "@/services/user.queries";
import { Navigate } from "@tanstack/react-router";
import MentorDetails from "@/pages/MentorDetails";
import NgoDetails from "@/pages/NgoDetails";

const UserDetails = () => {
  const { userId } = Route.useParams();
  const { data: userDetails, isLoading } = useSuspenseGetUserDetails(userId);

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      {userDetails.role?.type === "authenticated" ? (
        <NgoDetails />
      ) : userDetails.role.type === "mentor" ? (
        <MentorDetails />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default UserDetails;
