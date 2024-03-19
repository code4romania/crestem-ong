import ExportXLSX, { Sheet } from "@/components/ExportXLSX";
import formatDate from "@/lib/formatDate";

export interface Program {
  name: string;
  sponsorName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  startDate: string;
  endDate: string;
  users: unknown[];
  mentors: unknown[];
};

const getSheets = (data: Program): Sheet[] => {
  const sheets = [{
    name: "Informații despre program",
    rows: [{
      "Denumire program": data.name,
      "Data de început": formatDate(data.startDate),
      "Data de final": formatDate(data.endDate),
      "Nume finanțator": data.sponsorName || "-",
      "Număr ONG-uri înscrise în program": data.users?.length
    }]
  }];

  console.log(data);
  data.users.forEach((user: any) => {
    const ongName: string = user.ongName.length > 23
      ? user.ongName.slice(0, 23) + "..."
      : user.ongName;

    const rows = [];

    user.reports.forEach((report: any) => {
      const evaluations = report.evaluations.filter((evaluation: any) => evaluation.dimensions?.length);

      evaluations.forEach((evaluation: any) => {
        rows.push({
          "Nume ONG": user.ongName,
          "Domeniu de activitate": '–', // TODO: get from relationship
          "Nume reprezentant": `${user.contactFirstName} ${user.contactLastName}`,
          "Email reprezentant": user.contactEmail,
          "Data intrare program": '-', // TODO: add created_at to up_users_program_links table
          "ID evaluare": evaluation.id,
          "Dată început evaluare": formatDate(report.createdAt),
          "Dată final evaluare": formatDate(report.deadline),
          "Numar de completari": evaluations.length,
        });
      });
    });

    sheets.push({
      name: `Date ${ongName}`,
      rows,
    });
  });

  return sheets;
}

const ExportProgram = ({ data }: { data: Program }) => {
  return (
    <ExportXLSX
      className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
      fileName={`${data.name}.xlsx`}
      sheets={getSheets(data)}
    />
  );
}

export default ExportProgram;
