import React from "react";

const TableEvaluations = ({
  evaluations,
}: {
  evaluations: { id: number; email: string; dimensions: any[] }[];
}) => (
  <table className="min-w-full divide-y divide-gray-300">
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
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          STATUS
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 bg-white">
      {evaluations.map(({ id, email, dimensions }) => (
        <tr key={id}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
            {email}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {dimensions.length === 10 ? "Completat" : "Necompletat"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableEvaluations;
