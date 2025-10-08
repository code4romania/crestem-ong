import FullScreenLoader from "@/components/FullScreenLoader";
import MentorDetails from "@/pages/MentorDetails";
import NgoDetails from "@/pages/NgoDetails";
import type { FinalDetailedUserModel } from "@/services/api/types";
import { Navigate } from "@tanstack/react-router";
import { Suspense } from "react";

const UserDetails = ({
  userDetails,
}: {
  userDetails: FinalDetailedUserModel;
}) => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      {userDetails.role?.type === "authenticated" ? (
        <NgoDetails ngo={userDetails} />
      ) : userDetails.role.type === "mentor" ? (
        <MentorDetails mentor={userDetails} />
      ) : (
        <Navigate to="/" />
      )}
    </Suspense>
  );
};

export default UserDetails;
