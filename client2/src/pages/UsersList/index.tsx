import { Suspense } from "react";
import { NgosTable } from "./components/table";

const UsersList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NgosTable />
    </Suspense>
  );
};

export default UsersList;
