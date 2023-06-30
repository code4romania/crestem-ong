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
            NUME ONG
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Dată înregistrare
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            PROGRAM
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            ULTIMA EVALUARE
          </th>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          ></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map(({ id, ongName, createdAt, reports, domains }) => (
          <tr key={id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {ongName}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {new Date(createdAt).toLocaleString("ro-RO", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {domains
                ? domains.map((domain) => domain.name).join(", ")
                : "Fără program"}
            </td>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {reports?.length
                ? new Date(
                    reports[reports?.length - 1].createdAt
                  ).toLocaleString("ro-RO", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "-"}
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
