import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import Select from "@/components/Select";
import { useFormContext } from "react-hook-form";

const ExternalLinkItem = ({ options, defaultValue }) => {
  const optionsLabels = useMemo(
    () => options.map(({ label }) => label),
    [options]
  );
  const [name, setName] = useState(defaultValue);
  const { register } = useFormContext();
  const handleChangeLinkType = useCallback(
    (ev: React.ChangeEvent<HTMLSelectElement>) => {
      const value = ev.target.value;
      if (value) setName(value);
    },
    []
  );

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <Select
          defaultValue={defaultValue}
          label={"Rețea de socializare"}
          name={"social_network"}
          options={options}
          onChange={handleChangeLinkType}
        />
      </div>

      <div className="sm:col-span-3">
        <label
          htmlFor="last-name"
          className="block text-sm font-medium text-gray-700"
        >
          Link
        </label>
        <div className="mt-1">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            {...register(name)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExternalLinkItem;
