import React from "react";

const Input = ({
  label,
  type,
  name,
  id,
  placeholder,
  icon,
  onChange,
  value,
}) => (
  <div>
    {label && (
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
    )}
    <div className="relative mt-2 rounded-md shadow-sm">
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      )}
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  </div>
);

export default Input;
