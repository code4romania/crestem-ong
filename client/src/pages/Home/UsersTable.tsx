import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { downloadExcel } from "react-export-table-to-excel";
import Input from "@/components/Input";
import { useGetUsersQuery } from "@/redux/api/userApi";
import Button from "@/components/Button";
import { object, string, TypeOf } from "zod";

const filtersSchema = object({
  search: string(),
  startDate: string(),
  endDate: string(),
});
export type FiltersInput = TypeOf<typeof filtersSchema>;

const UsersTable = () => {
  const tableRef = useRef(null);
  const { data } = useGetUsersQuery(null);
  const [filtered, setFilterd] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const header = [
    "NUME ONG",
    "DATĂ ÎNREGISTRARE",
    "PROGRAM",
    "ULTIMA EVALUARE",
  ];

  const body = filtered.map(({ ongName, createdAt, reports, program }) => ({
    ongName,
    createdAt: new Date(createdAt).toLocaleString("ro-RO", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    program: program || "-",
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
  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };
  const handleChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
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
    const results = data?.filter(
      (res) =>
        res.ongName?.toLowerCase().includes(searchTerm) &&
        (startDate ? new Date(res.createdAt) > new Date(startDate) : true) &&
        (endDate && res.reports?.length > 0
          ? new Date(res.reports[res.reports?.length - 1].createdAt) >
            new Date(endDate)
          : true)
    );
    if (results) {
      setFilterd(results);
    }
  }, [data, searchTerm, startDate, endDate]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <form className="flex items-end justify-between mb-10">
        <div className="flex items-center justify-between space-x-2.5">
          <div className="w-2/3">
            <label>Caută</label>
            <Input
              type="search"
              name="search"
              placeholder="Caută"
              onChange={handleChangeSearch}
            />
          </div>
          <div>
            <label>Dată înregistrare</label>
            <Input
              name="startDate"
              type="date"
              onChange={handleChangeStartDate}
            />
          </div>
          <div>
            <label>Ultima evaluare</label>
            <Input name="endDate" type="date" onChange={handleChangeEndDate} />
          </div>
        </div>
        <div>
          <Button type="button" onClick={handleDownloadExcel}>
            Descarcă tabel
          </Button>
        </div>
      </form>
      <table
        ref={tableRef}
        className="w-full table-auto divide-y divide-gray-300"
      >
        <thead className="bg-gray-50">
          <tr>
            {header.map((th) => (
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                key={th}
              >
                {th}
              </th>
            ))}
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
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
