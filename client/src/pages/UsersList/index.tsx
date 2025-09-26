import { Suspense } from "react";
import { NgosTable } from "./components/table";
import FullScreenLoader from "@/components/FullScreenLoader";

const UsersList = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <NgosTable />
    </Suspense>
  );
};

export default UsersList;
