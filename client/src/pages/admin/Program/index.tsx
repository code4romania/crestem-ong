import React, { useCallback, useEffect, useMemo, useState } from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import {
  useFindProgramQuery,
  useGetMentorsQuery,
  useGetUsersQuery,
  useUpdateProgramMutation,
} from "@/redux/api/userApi";
import { NavLink, useParams } from "react-router-dom";
import FullScreenLoader from "@/components/FullScreenLoader";
import Table from "@/components/Table";
import Button from "@/components/Button";
import AddUserInProgram from "@/components/AddUserInProgram";
import AddMentorInProgram from "@/components/AddMentorInProgram";
import EmptyScreen from "@/components/EmptyScreen";

const Program = () => {
  const { programId = "" } = useParams();
  const [openUserInProgram, setOpenUserInProgram] = useState(false);
  const [openMentorInProgram, setOpenMentorInProgram] = useState(false);

  const [updateProgram, { isSuccess: isUpdateSuccess, isError }] =
    useUpdateProgramMutation();
  const { isLoading, data } = useFindProgramQuery({ programId });
  const programUserIds = data?.users?.map(({ id }) => id) || [];
  const programMentorIds = data?.mentors?.map(({ id }) => id) || [];
  const { data: users } = useGetUsersQuery();
  const { data: mentors } = useGetMentorsQuery();
  const availableUsers = useMemo(
    () => users?.filter(({ id }) => !programUserIds.includes(id)),
    [users, programUserIds]
  );
  const availableMentors = useMemo(
    () => mentors?.filter(({ id }) => !programMentorIds.includes(id)),
    [mentors, programMentorIds]
  );

  const handleOnAddUserInProgram = useCallback(
    ({ user }, setModalOpen) => {
      updateProgram({
        id: programId,
        users: data.users?.map(({ id }) => id).concat(+user),
      });
      setModalOpen(false);
    },
    [data?.users]
  );

  const handleOnAddUMentorInProgram = useCallback(
    ({ mentor }, setModalOpen) => {
      updateProgram({
        id: programId,
        mentors: data.mentors?.map(({ id }) => id).concat(+mentor),
      });
      setModalOpen(false);
    },
    [data?.mentors]
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
      (
      <Section>
        <Table
          title="ONG-uri în program"
          button={
            availableUsers?.length > 0 && (
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
            )
          }
          head={
            data.users?.length > 0
              ? [
                  "Nume ONG",
                  "Nume reprezentant",
                  "Data intrare program",
                  "Ultima evaluare",
                  "",
                ]
              : []
          }
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
        {data?.users?.length === 0 && (
          <EmptyScreen title={"Nicio organizatie inscrisa in program"} />
        )}
      </Section>
      )
      <Section>
        <Table
          title="Persoane resursă în program"
          button={
            availableMentors?.length > 0 && (
              <>
                <Button onClick={() => setOpenMentorInProgram(true)}>
                  Adaugă persoană resursă
                </Button>
                <AddMentorInProgram
                  open={openMentorInProgram}
                  mentors={availableMentors}
                  setOpen={setOpenMentorInProgram}
                  onSave={handleOnAddUMentorInProgram}
                />
              </>
            )
          }
          head={
            data?.mentors?.length > 0 && [
              "Nume",
              "Specializare",
              "Disponibilitate",
              "Ultima activitate",
              "",
            ]
          }
          body={data.mentors.map((mentor) => [
            `${mentor.firstName} ${mentor.lastName}`,
            mentor.dimensions?.map((dimension) => dimension.name).join(", "),
            `${mentor.available ? "Disponibil" : "Indisponibil"}`,
            `${
              mentor.mentorActivities?.length
                ? new Date(
                    mentor.mentorActivities[0]?.createdAt
                  )?.toLocaleString("ro-RO", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "-"
            }`,
            <NavLink to={`/users/${mentor.id}`}>Vezi</NavLink>,
          ])}
        />
        {data?.mentors?.length === 0 && (
          <EmptyScreen title={"Nicio persoana resursa inscrisa in program"} />
        )}
      </Section>
    </>
  );
};

export default Program;
