import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "@tanstack/react-router";
import { downloadExcel } from "react-export-table-to-excel";
import Input from "@/components/Input";
import {
  useGetDomainsQuery,
  useGetProgramsQuery,
  useGetUsersQuery,
} from "@/redux/api/userApi";
import Button from "@/components/Button";
import { z } from "zod";
import citiesByCounty from "@/lib/orase-dupa-judet.json";
import formatDate from "@/lib/formatDate";

const filtersSchema = z.object({
  search: z.string(),
  createdAtDateFrom: z.string(),
  createdAtDateUntil: z.string(),
  latestEvaluationDateFrom: z.string(),
  latestEvaluationDateUntil: z.string(),
});
export type FiltersInput = z.infer<typeof filtersSchema>;

const UsersTable = () => {
  const counties = [
    ...Object.keys(citiesByCounty)
      .sort()
      .map((county: string) => ({
        label: county,
        name: county,
      })),
  ];

  const tableRef = useRef(null);
  const { data } = useGetUsersQuery(null);
  const [filtered, setFilterd] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [createdAtDateFrom, setCreatedAtDateFrom] = useState("");
  const [createdAtDateUntil, setCreatedAtDateUntil] = useState("");
  const [latestEvaluationDateFrom, setLatestEvaluationDateFrom] = useState("");
  const [latestEvaluationDateUntil, setLatestEvaluationDateUntil] =
    useState("");
  const [county, setCounty] = useState("");
  const [locality, setLocality] = useState("");
  const [domain, setDomain] = useState(-1);
  const [program, setProgram] = useState(-1);

  const { data: domains } = useGetDomainsQuery(null);
  const { data: programs } = useGetProgramsQuery();

  const localities = useMemo(
    () =>
      county
        ? [
            ...citiesByCounty[county]
              .map((city) => city.nume)
              .filter((value, index, array) => array.indexOf(value) === index)
              .sort()
              .map((city) => ({
                name: city,
                label: city,
              })),
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

  const body = filtered.map(
    ({ ongName, createdAt, reports, program, county, city, domains }) => ({
      ongName,
      createdAt: formatDate(createdAt),
      program: program || "-",
      county,
      city,
      domains: domains?.length ? domains.map((d) => d.name).join(",") : "-",
      lastEvaluationDate: reports?.length
        ? formatDate(reports[reports?.length - 1].createdAt)
        : "-",
    })
  );

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleChangeCreatedAtDateFrom = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCreatedAtDateFrom(event.target.value);
  };
  const HandleChangeCreatedAtDateUntil = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCreatedAtDateUntil(event.target.value);
  };
  const handleChangeLatestEvaluationDateFrom = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setLatestEvaluationDateFrom(event.target.value);
  };
  const handleChangeLatestEvaluationDateUntil = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setLatestEvaluationDateUntil(event.target.value);
  };

  const handleChangeDomain = (event: ChangeEvent<HTMLSelectElement>) => {
    setDomain(+event.target.value);
  };
  const handleChangeProgram = (event: ChangeEvent<HTMLSelectElement>) => {
    setProgram(+event.target.value);
  };
  const handleChangeCounty = (event: ChangeEvent<HTMLSelectElement>) => {
    setCounty(event.target.value);
  };
  const handleChangeLocality = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocality(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCreatedAtDateFrom("");
    setCreatedAtDateUntil("");
    setLatestEvaluationDateFrom("");
    setLatestEvaluationDateUntil("");
    setDomain(-1);
    setProgram(-1);
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
    const results = data?.filter((res) => {
      const registeredDate = new Date(res.createdAt).setHours(0, 0, 0, 0);
      const lastEvaluationDate = res.reports?.length
        ? new Date(res.reports[res.reports?.length - 1].createdAt).setHours(
            0,
            0,
            0,
            0
          )
        : null;

      return (
        res.ongName?.toLowerCase().includes(searchTerm) &&
        (createdAtDateFrom
          ? registeredDate >= new Date(createdAtDateFrom).setHours(0, 0, 0, 0)
          : true) &&
        (createdAtDateUntil
          ? registeredDate <= new Date(createdAtDateUntil).setHours(0, 0, 0, 0)
          : true) &&
        (lastEvaluationDate && latestEvaluationDateFrom
          ? lastEvaluationDate >=
            new Date(latestEvaluationDateFrom).setHours(0, 0, 0, 0)
          : true) &&
        (lastEvaluationDate && latestEvaluationDateUntil
          ? lastEvaluationDate <=
            new Date(latestEvaluationDateUntil).setHours(0, 0, 0, 0)
          : true) &&
        (!county || res.county === county) &&
        (!locality || res.city === locality) &&
        (domain === -1 || res.domains?.some((d) => d.id === domain)) &&
        (program === -1 || res.program?.id === program)
      );
    });
    if (results) {
      setFilterd(results);
    }
  }, [
    data,
    searchTerm,
    createdAtDateFrom,
    createdAtDateUntil,
    latestEvaluationDateFrom,
    latestEvaluationDateUntil,
    county,
    locality,
    domain,
    program,
  ]);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <form className="flex flex-col gap-8 mb-10">
        <div className="flex">
          <div className="max-w-xl flex-1">
            <label>Caută</label>
            <Input
              type="search"
              name="search"
              placeholder="Caută"
              onChange={handleChangeSearch}
              value={searchTerm}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label>Dată înregistrare</label>
            <div className="flex">
              <Input
                name="createdAtDateFrom"
                type="date"
                onChange={handleChangeCreatedAtDateFrom}
                value={createdAtDateFrom}
              />

              <Input
                name="createdAtDateUntil"
                type="date"
                onChange={HandleChangeCreatedAtDateUntil}
                value={createdAtDateUntil}
              />
            </div>
          </div>
          <div>
            <label>Ultima evaluare</label>
            <div className="flex">
              <Input
                name="latestEvaluationDateFrom"
                type="date"
                onChange={handleChangeLatestEvaluationDateFrom}
                value={latestEvaluationDateFrom}
              />

              <Input
                name="latestEvaluationDateUntil"
                type="date"
                onChange={handleChangeLatestEvaluationDateUntil}
                value={latestEvaluationDateUntil}
              />
            </div>
          </div>
          {programs?.length && (
            <div>
              <label>Programe</label>
              <div>
                <select
                  id={"programs"}
                  name={"programs"}
                  title={"Programe"}
                  className="relative mt-2 rounded-md shadow-sm block border-gray-300 focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  value={program}
                  onChange={handleChangeProgram}
                >
                  <option key={-1} value={-1}></option>
                  {programs.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {domains?.length && (
            <div>
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
            </div>
          )}
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
        </div>
        <div className="flex justify-end gap-4">
          <Button type="button" color="white" onClick={handleClearFilters}>
            Resetează
          </Button>

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
            (
              {
                ongName,
                createdAt,
                program,
                county,
                city,
                domains,
                lastEvaluationDate,
              },
              index
            ) => (
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
