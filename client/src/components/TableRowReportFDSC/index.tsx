import React, { memo, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { calcScore } from "@/lib/score";
import { evaluationsCompletedFilter } from "@/lib/filters";

const TableRowReportFDSC = ({
  id,
  ongName,
  startDate,
  endDate,
  evaluations,
  finished,
}) => {
  const navigate = useNavigate();
  const evaluationsCompleted = useMemo(
    () => evaluationsCompletedFilter(evaluations),
    [evaluations]
  );

  const handleClick = useCallback(() => {
    navigate(`/reports/${id}`);
  }, [navigate]);

  return (
    <tr className="cursor-pointer" onClick={handleClick}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {id}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {ongName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {startDate.toLocaleString("ro-RO", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {finished
          ? endDate.toLocaleString("ro-RO", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "În progres"}
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
