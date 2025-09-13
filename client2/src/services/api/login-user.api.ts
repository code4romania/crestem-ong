import API from "../api";

export const loginUser = ({}: {}): Promise<> => {
  return API.get(`election-rounds/${electionRoundId}/observer-guide`).then(
    (res) => res.data.guides
  );
};
