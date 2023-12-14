import React from "react";
import { Link } from "react-router-dom";

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
  link,
  percentage,
}: {
  label: string;
  link: string;
  percentage: number;
}) => {
  const color = getColor(percentage);
  return (
    <div>
      <div className="flex justify-between mb-2">
        <Link className="text-lg hover:underline" to={link} target="_blank" rel="noopener noreferrer">
          {label}
        </Link>
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
