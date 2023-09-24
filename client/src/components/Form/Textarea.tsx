import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Textarea = ({
  name,
  label,
  register,
}: {
  name: string;
  label: string;
  register: UseFormRegister<any>;
}) => {
  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
          {...(register ? register(name) : { name: name })}
        />
      </div>
      <div className="text-red-600 text-sm mt-1">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Textarea;
