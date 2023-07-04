import React from "react";

const getColor = (percentage: number) =>
  percentage >= 70
    ? "#047B7D"
    : percentage >= 60
    ? "#1C9786"
    : percentage >= 50
    ? "#49B386"
    : percentage >= 40
    ? "#F5E36B"
    : percentage >= 25
    ? "#F1CE65"
    : "#E17A4D";

const ProgressBar = ({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) => {
  const color = getColor(percentage);
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="text-lg">{label}</div>
        <div
          className={`text-sm`}
          style={{ color: percentage >= 50 ? "#047B7D" : "#D95040" }}
        >
          {percentage || 0}%
        </div>
      </div>
      <div className={`w-full rounded-full h-2.5 bg-gray-200`}>
        <div
          className={`h-2.5 rounded-full`}
          style={{ backgroundColor: color, width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
