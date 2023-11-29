import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { downloadExcel } from "react-export-table-to-excel";
import Input from "@/components/Input";
import { useGetDomainsQuery, useGetUsersQuery } from "@/redux/api/userApi";
import Button from "@/components/Button";
import { object, string, TypeOf } from "zod";
import citiesByCounty from "@/lib/orase-dupa-judet.json";

const filtersSchema = object({
  search: string(),
  startDate: string(),
  endDate: string(),
});
export type FiltersInput = TypeOf<typeof filtersSchema>;

const UsersTable = () => {
  const counties = [...Object.keys(citiesByCounty)
    .sort()
    .map((county: string) => ({
      label: county,
      name: county,
    }))];

  const tableRef = useRef(null);
  const { data } = useGetUsersQuery(null);
  const [filtered, setFilterd] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [county, setCounty] = useState("");
  const [locality, setLocality] = useState("");
  const [domain, setDomain] = useState(-1);

  const { data: domains } = useGetDomainsQuery(null);

  const localities = useMemo(
    () =>
      county
        ? [
          ...citiesByCounty[county].map((city) => city.nume)
            .filter((value, index, array) => array.indexOf(value) === index)
            .sort()
            .map((city) => ({
              name: city,
              label: city,
            }))
        ]
        : [],
    [citiesByCounty, county]
  );


  const header = [
    "NUME ONG",
    "DATĂ ÎNREGISTRARE",
    "PROGRAM",
    "JUDEȚ",
    "LOCALITATE",
    "DOMENIU DE ACTIVITATE",
    "ULTIMA EVALUARE",
  ];

  const body = filtered.map(({ ongName, createdAt, reports, program, county, city, domains }) => ({
    ongName,
    createdAt: new Date(createdAt).toLocaleString("ro-RO", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    program: program || "-",
    county,
    city,
    domains: domains?.length ? domains.map(d => d.name).join(",") : "-",
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
  const handleChangeDomain = (event: ChangeEvent<HTMLSelectElement>) => {
    setDomain(+event.target.value);
  };
  const handleChangeCounty = (event: ChangeEvent<HTMLSelectElement>) => {
    setCounty(event.target.value);
  };
  const handleChangeLocality = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocality(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setDomain(-1);
    setCounty("");
    setLocality("");
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
          : true) &&
        (!county || res.county === county) &&
        (!locality || res.city === locality) &&
        (domain === -1 || res.domains?.some(d => d.id === domain))
    );
    if (results) {
      setFilterd(results);
    }
  }, [data, searchTerm, startDate, endDate, county, locality, domain]);

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
              value={searchTerm}
            />
          </div>
          <div>
            <label>Dată înregistrare</label>
            <Input
              name="startDate"
              type="date"
              onChange={handleChangeStartDate}
              value={startDate}
            />
          </div>
          <div>
            <label>Ultima evaluare</label>
            <Input
              name="endDate"
              type="date"
              onChange={handleChangeEndDate}
              value={endDate} />
          </div>
          {domains?.length && <div>
            <label>Domenii activitate</label>
            <div>
              <select
                id={"domains"}
                name={"domains"}
                title={"Domenii activitate"}
                className="relative mt-2 rounded-md shadow-sm block border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                value={domain}
                onChange={handleChangeDomain}
              >
                <option key={-1} value={-1}></option>
                {domains.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>}
          <div>
            <label>Județ</label>
            <div>
              <select
                id={"județ"}
                name={"județ"}
                title={"Județ"}
                className="relative mt-2 rounded-md shadow-sm block border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                value={county}
                onChange={handleChangeCounty}
              >
                <option key={""} value={""}></option>
                {counties.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label>Localitate</label>
            <div>
              <select
                id={"localitate"}
                name={"localitate"}
                title={"Localitate"}
                className="relative min-w-[150px] mt-2 rounded-md shadow-sm block border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                onChange={handleChangeLocality}
                disabled={!county}
              >
                <option key={""} value={""}></option>
                {localities.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="self-end">
            <Button type="button" color="white" onClick={handleClearFilters}>
              Resetează
            </Button>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button color="white" type="button" onClick={handleDownloadExcel}>
            Descarcă tabel
          </Button>
          <Button to="/create/user">Adauga organizatie</Button>
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
            ({ ongName, createdAt, program, county, city, domains, lastEvaluationDate }, index) => (
              <tr key={filtered[index]?.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {ongName}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {createdAt}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {program.name || "-"}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {county}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {city}
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {domains}
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
