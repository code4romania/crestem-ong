import React from "react";

const ExpiredEvaluation = ({ error }: any) => {
  return (
    <div className="h-72 flex justify-center items-center">
      {error.data.error.message}
    </div>
  );
};

export default ExpiredEvaluation;
