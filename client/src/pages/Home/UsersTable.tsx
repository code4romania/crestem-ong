import React from "react";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { Link } from "react-router-dom";

const UsersTable = () => {
  const { data } = useGetUsersQuery();
  if (!data) {
    return <></>;
  }
  return (
    <table className="w-full table-auto divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            EMAIL
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          ></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map(({ id, email }) => (
          <tr key={id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {email}
            </td>
            <td className={"text-sm"}>
              <Link to={`/users/${id}`}>Vezi rapoarte</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
