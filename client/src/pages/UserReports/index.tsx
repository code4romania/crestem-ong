import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserReportsQuery } from "@/redux/api/userApi";
import TableHeadReports from "@/components/index/TableHeadReports";
import Section from "@/components/Section";
import TableRowReport from "@/components/TableRowReport";
import Heading from "@/components/Heading";
import Stats from "@/components/Stats";

const UserReports = () => {
  const { userId } = useParams();
  const { data: user } = useGetUserReportsQuery({ userId });

  return (
    <>
      <Section>
        <Heading level={"h2"}>{user?.ongName}</Heading>
        <Stats
          data={[
            { label: "Scor", value: "80%" },
            { label: "Total completări ultima evaluare", value: "64" },
            {
              label: "Total completări ultima evaluare",
              value: "3",
            },
          ]}
        />
      </Section>
      <Section>
        <div className="mb-4 text-lg font-semibold">Informații despre ONG</div>
        <table>
          <tbody className="bg-white">
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Nume organizație
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {user?.ongName}
              </td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                CIF-ul organizației
              </td>
              <td>{user?.ongIdentificationNumber}</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Program
              </td>
              <td>-</td>
            </tr>{" "}
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Județ
              </td>
              <td>{user?.county}</td>
            </tr>{" "}
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Localitate
              </td>
              <td>{user?.ongIdentificationNumber}</td>
            </tr>{" "}
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Email organizație
              </td>
              <td>{user?.email}</td>
            </tr>{" "}
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Telefon organizație
              </td>
              <td>{user?.phone}</td>
            </tr>{" "}
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Domenii de activitate
              </td>
              <td>
                {user?.domains?.map((domain) => (
                  <span key={domain.id}>{domain.name}</span>
                ))}
              </td>
            </tr>{" "}
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Cuvinte cheie ale activității
              </td>
              <td>{user?.keywords}</td>
            </tr>{" "}
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Descriere organizatie
              </td>
              <td>{user?.description}</td>
            </tr>{" "}
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Website organizatie
              </td>
              <td>{user?.website}</td>
            </tr>
            <tr className="even:bg-gray-50">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Link-uri social media
              </td>
              <td>
                {user?.accountFacebook && (
                  <a className="text-sky-700 mr-2" href={user?.accountFacebook}>
                    Facebook
                  </a>
                )}
                {user?.accountInstagram && (
                  <a
                    className="text-sky-700 mr-2"
                    href={user?.accountInstagram}
                  >
                    Instagram
                  </a>
                )}
                {user?.accountInstagram && (
                  <a className="text-sky-700" href={user?.accountTwitter}>
                    Twitter
                  </a>
                )}

                {user?.accountInstagram && (
                  <a className="text-sky-700" href={user?.accountTiktok}>
                    TikTok
                  </a>
                )}

                {user?.accountInstagram && (
                  <a className="text-sky-700" href={user?.accountLinkedin}>
                    Linkedin
                  </a>
                )}
              </td>
            </tr>{" "}
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Nume reprezentant organizatie
              </td>
              <td>{user?.contactLastName}</td>
            </tr>{" "}
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Prenume reprezentant organizatie
              </td>
              <td>{user?.contactFirstName}</td>
            </tr>{" "}
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Email reprezentant organizatie
              </td>
              <td>{user?.contactEmail}</td>
            </tr>{" "}
            <tr>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                Telefon reprezentant organizatie
              </td>
              <td>{user?.contactPhone}</td>
            </tr>{" "}
          </tbody>
        </table>
      </Section>
      <Section>
        <div className="mb-4 text-lg font-semibold">Istoric evaluări</div>
        <table className="w-full">
          <TableHeadReports />
          <tbody className="divide-y divide-gray-200 bg-white">
            {user?.reports?.map((report) => {
              return (
                <TableRowReport
                  key={report.id}
                  id={report.id}
                  createdAt={report.createdAt}
                  deadline={report.deadline}
                  evaluations={report.evaluations}
                  finished={report.finished}
                />
              );
            })}
          </tbody>
        </table>
      </Section>
    </>
  );
};

export default UserReports;
