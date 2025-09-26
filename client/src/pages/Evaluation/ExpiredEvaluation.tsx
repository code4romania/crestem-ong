const ExpiredEvaluation = ({ error }: any) => {
  return (
    <div className="h-72 flex justify-center items-center">
      {error.response.data.error.message}
    </div>
  );
};

export default ExpiredEvaluation;
