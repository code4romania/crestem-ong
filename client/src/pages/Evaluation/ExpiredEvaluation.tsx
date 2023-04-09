import React from "react";

const ExpiredEvaluation = ({ error }) => {
  return (
    <div className="h-72 flex justify-center items-center">
      {error.data.error.message}
    </div>
  );
};

export default ExpiredEvaluation;
