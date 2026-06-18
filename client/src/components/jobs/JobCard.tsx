import { IJob } from "@/interfaces/models";
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  BookmarkIcon as BookmarkOutlineIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/24/solid";

type Props = {
  job: IJob;
  onToggleSave?: (jobId: string) => void;
};

const statusStyles: Record<string, string> = {
  Applied: "bg-blue-50 text-blue-700",
  Interviewing: "bg-amber-50 text-amber-700",
  Offered: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

const JobCard = ({ job, onToggleSave }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-x-2 flex-wrap">
          <h3 className="text-base font-semibold text-gray-900">
            {job.title}
          </h3>
          {job.status && (
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                statusStyles[job.status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {job.status}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">{job.company}</p>
        <div className="flex items-center gap-x-4 mt-3 text-sm text-gray-500 flex-wrap">
          <span className="flex items-center gap-x-1">
            <MapPinIcon className="h-4 w-4" />
            {job.location}
          </span>
          <span className="flex items-center gap-x-1">
            <BriefcaseIcon className="h-4 w-4" />
            {job.type}
          </span>
          {job.salary && (
            <span className="flex items-center gap-x-1">
              <CurrencyDollarIcon className="h-4 w-4" />
              {job.salary}
            </span>
          )}
        </div>
      </div>

      {onToggleSave && (
        <button
          type="button"
          onClick={() => onToggleSave(job.id)}
          className="self-start sm:self-center p-2 rounded-full hover:bg-gray-100 text-indigo-600"
          aria-label={job.isSaved ? "Remove from saved jobs" : "Save job"}
        >
          {job.isSaved ? (
            <BookmarkSolidIcon className="h-5 w-5" />
          ) : (
            <BookmarkOutlineIcon className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default JobCard;