import React from "react";
import envelope from "@/assets/envelope.svg";
import { Evaluation } from "@/redux/api/types";
import { useAppSelector } from "@/redux/store";
import { Link } from "react-router-dom";

const TableEvaluations = ({ evaluations }: { evaluations: Evaluation[] }) => {
  const user = useAppSelector((state) => state.userState.user);
  const isFDSC = user?.role?.type === "fdsc";

  return evaluations.length ? (
    <table className="w-full table-auto divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            EMAIL
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            STATUS
          </th>
          {isFDSC && (
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            ></th>
          )}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {evaluations.map(({ id, email, dimensions }) => (
          <tr key={id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {email}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {dimensions.reduce(
                (acc, dimension) => acc + dimension.quiz.length,
                0
              ) === 50
                ? "Completat"
                : "Necompletat"}
            </td>
            {isFDSC && dimensions.length === 10 && (
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <Link to={`/evaluation/${id}?email=${email}`}>
                  Vezi raspunsurile
                </Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className={"flex flex-col items-center"}>
      <img src={envelope} />
      <h3 className={"text-2xl text-gray-900 font-bold mt-6 mb-2"}>
        Niciun membru invitat
      </h3>
      <p className="max-w-xl text-center text-gray-500 text-lg">
        Adaugă adresele de email ale membrilor organizației pentru a-i invita să
        completeze evaluarea
      </p>
    </div>
  );
};

export default TableEvaluations;
