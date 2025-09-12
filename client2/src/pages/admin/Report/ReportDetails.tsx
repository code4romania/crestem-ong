import React from "react";
import { calcScore } from "@/lib/score";

export default ({ report, evaluationsCompleted, scoreByEvaluation }) => {
  return (
    <table className="w-full table-auto divide-y divide-gray-300">
      <tbody>
        <tr className="even:bg-gray-50">
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
            ID
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {report.id}
          </td>
        </tr>
        <tr className="even:bg-gray-50">
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
            Organizație
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {report.user?.ongName}
          </td>
        </tr>
        <tr className="even:bg-gray-50">
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
            Dată început
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {new Date(report.createdAt).toLocaleString("ro-RO", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </td>
        </tr>
        <tr className="even:bg-gray-50">
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
            Dată final
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {new Date(report.deadline).toLocaleString("ro-RO", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </td>
        </tr>
        <tr className="even:bg-gray-50">
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
            Scor obținut
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {calcScore(evaluationsCompleted) || 0}%
          </td>
        </tr>
        <tr className="even:bg-gray-50">
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
            Număr completări
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {evaluationsCompleted.length}
          </td>
        </tr>
        <tr className="even:bg-gray-50">
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
            Cel mai mare scor
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {scoreByEvaluation[0]?.score
              ? `${scoreByEvaluation[0]?.name} (${
                  (scoreByEvaluation && scoreByEvaluation[0]?.score) || 0
                }%)`
              : "-"}
          </td>
        </tr>
        <tr className="even:bg-gray-50">
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
            Cel mai mic scor
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {scoreByEvaluation[9]?.score
              ? `${scoreByEvaluation[9]?.name} (${
                  (scoreByEvaluation && scoreByEvaluation[9]?.score) || 0
                }%)`
              : "-"}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
