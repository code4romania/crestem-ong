import React from "react";

const TableHeadReports = () => (
  <thead className="bg-gray-50">
    <tr>
      <th
        scope="col"
        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
      >
        EVALUARE
      </th>
      <th
        scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
      >
        PERIOADA DE COMPLETARE
      </th>
      <th
        scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
      >
        TOTAL COMPLETĂRI
      </th>
      <th
        scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
      >
        SCOR OBȚINUT
      </th>
      <th
        scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
      >
        STATUS
      </th>
      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
        <span className="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
);

export default TableHeadReports;
