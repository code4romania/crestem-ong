export interface ProgramVM {
  id: number;
  name: string;
  status: "ongoing" | "finished";
  usersCount: number | undefined;
  mentorsCount: number | undefined;
}
