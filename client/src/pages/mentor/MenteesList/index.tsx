import { Suspense } from "react";
import { MenteesTable } from "./components/table";
import FullScreenLoader from "@/components/FullScreenLoader";

const MenteesList = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <MenteesTable />
    </Suspense>
  );
};

export default MenteesList;
