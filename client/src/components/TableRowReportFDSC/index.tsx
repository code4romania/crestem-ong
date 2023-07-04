import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { calcScore } from "@/lib/score";
import { evaluationsCompletedFilter } from "@/lib/filters";

const TableRowReportFDSC = ({
  id,
  createdAt,
  deadline,
  evaluations,
  finished,
  user,
}) => {
  const evaluationsCompleted = useMemo(
    () => evaluationsCompletedFilter(evaluations),
    [evaluations]
  );

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
        {id}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {user?.ongName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {startDate}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {finished ? endDate : "În progres"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {finished ? `${calcScore(evaluationsCompleted) || "0"}%` : "În progres"}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {`${evaluationsCompleted.length} / ${evaluations.length}`}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-teal-600 text-sm text-gray-500">
        <Link to={`/reports/${id}`}>Vezi</Link>
      </td>
    </tr>
  );
};

export default memo(TableRowReportFDSC);
