import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGetUsersQuery } from "@/redux/api/userApi";
import { Link } from "react-router-dom";
import Input from "@/components/Input";
import { User } from "@/redux/api/types";
import { downloadExcel } from "react-export-table-to-excel";
import Button from "@/components/Button";

const UsersTable = () => {
  const tableRef = useRef(null);
  const { data } = useGetUsersQuery(null);
  const [filtered, setFilterd] = useState([] as User[]);
  const [searchTerm, setSearchTerm] = useState("");
  const header = [
    "NUME ONG",
    "Dată înregistrare",
    "PROGRAM",
    "ULTIMA EVALUARE",
  ];

  const body = filtered.map(({ ongName, createdAt, reports }) => ({
    ongName,
    createdAt: new Date(createdAt).toLocaleString("ro-RO", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    program: "-",
    lastEvaluationDate: reports?.length
      ? new Date(reports[reports?.length - 1].createdAt).toLocaleString(
          "ro-RO",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )
      : "-",
  }));
  const handleChange = (event: ChangeEvent) => {
    setSearchTerm(event.target.value);
  };

  const handleDownloadExcel = useCallback(() => {
    downloadExcel({
      fileName: "organizații",
      sheet: "Organizații",
      tablePayload: {
        header,
        body,
      },
    });
  }, [header, body]);

  useEffect(() => {
    const results = data?.filter((res) =>
      res.ongName.toLowerCase().includes(searchTerm)
    );
    if (results) {
      setFilterd(results);
    }
  }, [data, searchTerm]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <div className="w-2/3">
          <Input
            placeholder="Caută"
            onChange={handleChange}
            value={searchTerm}
          />
        </div>
        <Button onClick={handleDownloadExcel}>Descarcă tabel</Button>
      </div>
      <table
        ref={tableRef}
        className="w-full table-auto divide-y divide-gray-300"
      >
        <thead className="bg-gray-50">
          <tr>
            {header.map((th) => (
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 uppercase text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                {th}
              </th>
            ))}
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 uppercase text-left text-sm font-semibold text-gray-900 sm:pl-6"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {body.map(
            ({ ongName, createdAt, program, lastEvaluationDate }, index) => (
              <tr key={filtered[index]?.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {ongName}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {createdAt}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {program}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {lastEvaluationDate}
                </td>
                <td className={"text-sm text-teal-600"}>
                  <Link to={`/users/${filtered[index]?.id}`}>Vezi</Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
