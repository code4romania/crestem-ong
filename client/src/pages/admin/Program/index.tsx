import React from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { useFindProgramQuery } from "@/redux/api/userApi";
import { NavLink, useParams } from "react-router-dom";
import FullScreenLoader from "@/components/FullScreenLoader";

const Program = () => {
  const { programId = "" } = useParams();

  const {
    isLoading,
    isSuccess: isEvaluationSuccess,
    data,
    isError: isEvaluationError,
    error: evaluationError,
  } = useFindProgramQuery({ programId });

  if (isLoading) return <FullScreenLoader />;

  console.log("data", data);

  return (
    <>
      <Section>
        <Heading level={"h2"}>{data.name}</Heading>
      </Section>
      <Section>
        <div>Informații despre program</div>
        <table>
          <tbody>
            <tr>
              <td>Denumire program</td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>Perioadă de desfășurare: Data de început</td>
              <td>
                {new Date(data.createdAt).toLocaleString("ro-RO", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
            </tr>
            <tr>
              <td>Perioadă de desfășurare: Data de final</td>
              <td>
                {new Date(data.endDate).toLocaleString("ro-RO", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
            </tr>
            <tr>
              <td>Nume finanțator</td>
              <td>{data.sponsorName || "-"}</td>
            </tr>
          </tbody>
        </table>
      </Section>
      <Section>
        <div>Persoane resursă în program</div>
        <table>
          <thead>
            <tr>
              <td>Nume</td>
              <td>SPECIALIZARE</td>
              <td>DISPONIBILITATE</td>
              <td>ULTIMA ACTIVITATE</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {data?.mentors?.map((mentor) => (
              <tr key={mentor.id}>
                <td>
                  {mentor.firstName} {mentor.lastName}
                </td>
                <td>{mentor.dimensions?.map((dimension) => dimension.name)}</td>
                <td>{mentor.isAvailable ? "Disponibil" : "Indisponibil"}</td>
                <td>-</td>
                <td>
                  <NavLink to={`/users/${mentor.id}`}>Vezi</NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
};

export default Program;
