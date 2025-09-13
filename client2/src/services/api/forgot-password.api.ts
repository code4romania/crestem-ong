import API from "../api";

export const forgotPassword = ({}: {}): Promise<Guide[]> => {
  return API.get(`election-rounds/${electionRoundId}/observer-guide`).then(
    (res) => res.data.guides
  );
};
