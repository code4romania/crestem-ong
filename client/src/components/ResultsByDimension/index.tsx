import React from "react";
import ProgressBar from "../ProgressBar";
import goodIcon from "@/assets/good.svg";
import badIcon from "@/assets/bad.svg";

const ResultsByDimension = ({
  scoreByEvaluation,
}: {
  scoreByEvaluation: {
    id: string;
    name: string;
    link: string;
    score: number;
    tags: string[];
  }[];
}) => {
  return (
    <div className="mt-10">
      <div className={"flex justify-between mb-4"}>
        <div className="font-medium text-lg">Rezultate pe dimensiuni</div>
      </div>
      <div className="space-y-6">
        {scoreByEvaluation?.map(({ id, name, link, score, tags }, i) => (
          <div key={id} className="flex space-x-12 items-end">
            <div className="md:w-1/2">
              <ProgressBar label={name} link={link} percentage={score} />
            </div>
            <div className="md:w-1/2 flex space-x-4 text-sm">
              {score < 50 ? <img src={badIcon} /> : <img src={goodIcon} />}
              <div>
                {tags.map((tag, i) => (
                  <span key={i}>
                    {tag}
                    {i !== 2 && "; "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsByDimension;
