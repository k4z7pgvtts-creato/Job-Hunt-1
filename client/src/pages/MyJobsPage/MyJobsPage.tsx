import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PortalLayout from "@/components/layouts/portal/PortalLayout";
import JobCard from "@/components/jobs/JobCard";
import { useAppContext } from "@/context/AppContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const MyJobsPage = () => {
  const { appliedJobs, withdrawApplication } = useAppContext(); // ✅ added
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);

  const filteredJobs = useMemo(() => {
    if (!search.trim()) return appliedJobs;
    const term = search.trim().toLowerCase();
    return appliedJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term),
    );
  }, [appliedJobs, search]);

  return (
    <PortalLayout title="My Jobs">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track the jobs you've applied to and their status.
            </p>
          </div>
        </div>

        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by job title or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-md border-0 py-2 pl-10 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          />
        </div>

        {filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="relative">
                {" "}
                {/* ✅ wrapper */}
                <JobCard job={job} />
                <button
                  onClick={() => withdrawApplication(job.id)}
                  className="absolute top-4 right-4 text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Withdraw
                </button>
              </div>
            ))}
          </div>
        ) : appliedJobs.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-500">
              You haven't applied to any jobs yet.
            </p>
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-500">No jobs found matching "{search}".</p>
          </div>
        )}
      </div>
    </PortalLayout>
  );
};

export default MyJobsPage;
