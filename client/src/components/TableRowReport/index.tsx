import React from "react";
import { calcScore } from "../../lib/score";
import { Link } from "react-router-dom";

const TableRowReport = ({ id, createdAt, deadline, evaluations, finished }) => {
  const evaluationsCompleted = evaluations
    ? evaluations.filter(({ dimensions }) => dimensions.length === 10)
    : [];
  const startDate = new Date(createdAt).toLocaleString("ro-RO", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const endDate = new Date(deadline).toLocaleString("ro-RO", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        Evaluare {startDate}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {startDate} - {endDate}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {evaluations?.length || 0}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {evaluationsCompleted?.length > 0
          ? calcScore(evaluationsCompleted)
          : "-"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {finished ? "Finalizat" : "In desfasurare"}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link to={`/reports/${id}`}>edit</Link>
      </td>
    </tr>
  );
};

export default TableRowReport;
