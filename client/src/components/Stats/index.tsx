import React from "react";

const Stats = ({ period = 0, count = 0, score = "-" }) => (
  <div>
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">
          Perioadă de completare
        </dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {period} zile
        </dd>
      </div>

      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">
          Total completări
        </dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {count}
        </dd>
      </div>

      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">
          Scor total
        </dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {score}
        </dd>
      </div>
    </dl>
  </div>
);

export default Stats;
