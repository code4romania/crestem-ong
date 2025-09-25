import type { MentorActivityModel } from "@/services/api/types";
import { UserCircleIcon } from "@heroicons/react/20/solid";

export interface FeedProps {
  activities: MentorActivityModel[];
}
const Feed = ({ activities }: FeedProps) => (
  <div className="flow-root">
    <ul role="list" className="-mb-8">
      {activities.map((activityItem, activityItemIdx) => (
        <li key={activityItem.id}>
          <div className="relative pb-8">
            {activityItemIdx !== activities.length - 1 ? (
              <span
                className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
            ) : null}
            <div className="relative flex items-start space-x-3">
              <>
                <div>
                  <div className="relative px-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                      <UserCircleIcon
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        Organizația {activityItem.user?.ongName}
                      </span>
                      <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200 ml-4">
                        <svg
                          className="h-1.5 w-1.5 fill-teal-500"
                          viewBox="0 0 6 6"
                          aria-hidden="true"
                        >
                          <circle cx="3" cy="3" r="3"></circle>
                        </svg>
                        {activityItem.type?.name}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {new Date(activityItem.startDate).toLocaleString(
                        "ro-RO",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}{" "}
                      ({activityItem.duration}h)
                    </p>
                    <p className="mt-2 text-sm text-gray-500 font-semibold">
                      {activityItem.dimension?.name}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {activityItem.notes}
                    </p>
                  </div>
                </div>
              </>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Feed;
