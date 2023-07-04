import React from "react";

const Stats = ({ data }: { data: { label: string; value: string }[] }) => (
  <div>
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {data.map(({ label, value }) => (
        <div
          key={label}
          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <dt className="truncate text-sm font-medium text-gray-500">
            {label}
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default Stats;
