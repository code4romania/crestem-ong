import { type ReactNode } from "react";

interface TableProps {
  body: (ReactNode | string | undefined)[][];
  head?: string[];
  title?: string;
  description?: string;
  button?: string | ReactNode;
}

const Table = ({ title, description, button, head, body }: TableProps) => {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {title && (
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-2 text-sm text-gray-700">{description}</p>
          )}
        </div>
        {button && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">{button}</div>
        )}
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              {head && (
                <thead>
                  <tr>
                    {head.map((th, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        {th}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
              )}
              <tbody className="bg-white">
                {body.map((row, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    {row.map((cell, index) => (
                      <td
                        key={index}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
