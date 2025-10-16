import FullScreenLoader from "@/components/FullScreenLoader";
import MentorDetails from "@/pages/MentorDetails";
import NgoDetails from "@/pages/NgoDetails";
import type { FinalDetailedUserModel } from "@/services/api/types";
import { Navigate } from "@tanstack/react-router";
import { Suspense } from "react";

const UserDetails = ({
  userDetails,
  returnToProgramId,
}: {
  userDetails: FinalDetailedUserModel;
  returnToProgramId?: string;
}) => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      {userDetails.role?.type === "authenticated" ? (
        <NgoDetails ngo={userDetails} returnToProgramId={returnToProgramId} />
      ) : userDetails.role.type === "mentor" ? (
        <MentorDetails
          mentor={userDetails}
          returnToProgramId={returnToProgramId}
        />
      ) : (
        <Navigate to="/" />
      )}
    </Suspense>
  );
};

export default UserDetails;
