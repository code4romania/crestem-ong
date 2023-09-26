import React, { useCallback, useEffect, useMemo, useState } from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import {
  useFindProgramQuery,
  useGetUsersQuery,
  useUpdateProgramMutation,
} from "@/redux/api/userApi";
import { NavLink, useParams } from "react-router-dom";
import FullScreenLoader from "@/components/FullScreenLoader";
import Table from "@/components/Table";
import Button from "@/components/Button";
import AddUserInProgram from "@/components/AddUserInProgram";

const Program = () => {
  const { programId = "" } = useParams();
  const [openUserInProgram, setOpenUserInProgram] = useState(false);
  const [updateProgram, { isSuccess: isUpdateSuccess, isError }] =
    useUpdateProgramMutation();
  const { isLoading, data } = useFindProgramQuery({ programId });
  const programUserIds = data?.users?.map(({ id }) => id) || [];
  const { data: users } = useGetUsersQuery();
  const availableUsers = useMemo(
    () => users?.filter(({ id }) => !programUserIds.includes(id)),
    [users, programUserIds]
  );

  const handleOnAddUserInProgram = useCallback(
    ({ user }, close) => {
      updateProgram({
        id: programId,
        users: data.users?.map(({ id }) => id).concat(+user),
      });
      close();
    },
    [data?.users]
  );

  useEffect(() => {
    if (isUpdateSuccess) {
      setOpenUserInProgram(false);
    }
  }, [isUpdateSuccess]);

  if (!data || isLoading) return <FullScreenLoader />;

  return (
    <>
      <Section>
        <Heading level={"h2"}>{data.name}</Heading>
      </Section>
      <Section>
        <Table
          title="Informații despre program"
          body={[
            ["Denumire program", data.name],
            [
              "Perioadă de desfășurare: Data de început",
              new Date(data.startDate).toLocaleString("ro-RO", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            ],
            [
              "Perioadă de desfășurare: Data de final",
              new Date(data.endDate).toLocaleString("ro-RO", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            ],
            ["Nume finanțator", data.sponsorName || "-"],
          ]}
        />
      </Section>
      {data?.users?.length > 0 && (
        <Section>
          <Table
            title="ONG-uri în program"
            button={
              <>
                <Button onClick={() => setOpenUserInProgram(true)}>
                  Adaugă ONG
                </Button>
                <AddUserInProgram
                  open={openUserInProgram}
                  users={availableUsers}
                  setOpen={setOpenUserInProgram}
                  onSave={handleOnAddUserInProgram}
                />
              </>
            }
            head={[
              "Nume ONG",
              "Nume reprezentant",
              "Data intrare program",
              "Ultima evaluare",
              "",
            ]}
            body={data.users.map((user) => [
              user.ongName,
              `${user.contactFirstName} ${user.contactLastName}`,
              "-",
              `${
                user.reports?.[0]
                  ? new Date(user.reports?.[0].createdAt).toLocaleString(
                      "ro-RO",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : "-"
              }`,
              <NavLink to={`/users/${user.id}`}>Vezi</NavLink>,
            ])}
          />
        </Section>
      )}
      {data?.mentors?.length > 0 && (
        <Section>
          <Table
            title="Persoane resursă în program"
            button={
              <AddUserInProgram open={false} setOpen={setOpenUserInProgram} />
            }
            head={[
              "Nume",
              "Specializare",
              "Disponibilitate",
              "Ultima activitate",
              "",
            ]}
            body={data.mentors.map((mentor) => [
              `${mentor.firstName} ${mentor.lastName}`,
              mentor.dimensions?.map((dimension) => dimension.name).join(", "),
              "Indisponibil",
              "-",
              <NavLink to={`/users/${mentor.id}`}>Vezi</NavLink>,
            ])}
          />
        </Section>
      )}
    </>
  );
};

export default Program;
