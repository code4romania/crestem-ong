import { ErrorMessage } from "@hookform/error-message";
import type { ChangeEventHandler } from "react";
import type { UseFormRegister } from "react-hook-form";

const Select = ({
  name,
  label,
  defaultValue,
  options,
  onChange,
  register,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: { name: string; label: string }[];
  onChange?: ChangeEventHandler;
  register?: UseFormRegister;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-900">
      {label}
    </label>
    <select
      id={name}
      name={name}
      className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6"
      defaultValue={defaultValue}
      onChange={onChange}
      {...(register && register(name))}
    >
      {options.map((option: { name: string; label: string }, index) => (
        <option key={option.name} value={option.name} selected={index === 0}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="text-red-400 text-sm py-2">
      <ErrorMessage name={name} />
    </div>
  </div>
);

export default Select;
