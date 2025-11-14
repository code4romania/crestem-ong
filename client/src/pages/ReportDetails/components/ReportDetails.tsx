import { calcScore } from "@/lib/score";

import formatDate from "@/lib/formatDate";
import type { FinalEvaluationModel } from "@/services/api/types";

interface ReportViewProps {
  report: any;
  evaluationsCompleted: FinalEvaluationModel[];
  scoreByEvaluation: { name: string; score: number }[];
}

const ReportView = ({
  report,
  evaluationsCompleted,
  scoreByEvaluation,
}: ReportViewProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Informații despre raport
      </h2>

      <dl className="divide-y divide-gray-200">
        <div className="py-2 grid grid-cols-3 gap-4 odd:bg-white even:bg-gray-50">
          <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
            ID
          </dt>
          <dd className="whitespace-nowrap py-2 text-sm text-gray-700 sm:pl-3">
            {report.id}
          </dd>
        </div>

        <div className="py-2 grid grid-cols-3 gap-4 odd:bg-white even:bg-gray-50">
          <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
            Organizație
          </dt>
          <dd className="whitespace-nowrap py-2 text-sm text-gray-700 sm:pl-3">
            {report.user?.ongName}
          </dd>
        </div>

        <div className="py-2 grid grid-cols-3 gap-4 odd:bg-white even:bg-gray-50">
          <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
            Dată început
          </dt>
          <dd className="whitespace-nowrap py-2 text-sm text-gray-700 sm:pl-3">
            {formatDate(report.createdAt)}
          </dd>
        </div>

        <div className="py-2 grid grid-cols-3 gap-4 odd:bg-white even:bg-gray-50">
          <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
            Dată final
          </dt>
          <dd className="whitespace-nowrap py-2 text-sm text-gray-700 sm:pl-3">
            {formatDate(report.deadline)}
          </dd>
        </div>

        <div className="py-2 grid grid-cols-3 gap-4 odd:bg-white even:bg-gray-50">
          <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
            Scor obținut
          </dt>
          <dd className="whitespace-nowrap py-2 text-sm text-gray-700 sm:pl-3">
            {calcScore(evaluationsCompleted) || 0}%
          </dd>
        </div>

        <div className="py-2 grid grid-cols-3 gap-4 odd:bg-white even:bg-gray-50">
          <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
            Număr completări
          </dt>
          <dd className="whitespace-nowrap py-2 text-sm text-gray-700 sm:pl-3">
            {evaluationsCompleted.length} / {report.evaluations.length}
          </dd>
        </div>

        <div className="py-2 grid grid-cols-3 gap-4 odd:bg-white even:bg-gray-50">
          <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
            Cel mai mare scor
          </dt>
          <dd className="whitespace-nowrap py-2 text-sm text-gray-700 sm:pl-3">
            {scoreByEvaluation[0]?.score
              ? `${scoreByEvaluation[0]?.name} (${scoreByEvaluation[0]?.score}%)`
              : "-"}
          </dd>
        </div>

        <div className="py-2 grid grid-cols-3 gap-4 odd:bg-white even:bg-gray-50">
          <dt className="pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
            Cel mai mic scor
          </dt>
          <dd className="whitespace-nowrap py-2 text-sm text-gray-700 sm:pl-3">
            {scoreByEvaluation[9]?.score
              ? `${scoreByEvaluation[9]?.name} (${scoreByEvaluation[9]?.score}%)`
              : "-"}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ReportView;
