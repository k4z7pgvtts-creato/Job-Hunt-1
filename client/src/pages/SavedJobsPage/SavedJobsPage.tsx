import PortalLayout from "@/components/layouts/portal/PortalLayout";
import JobCard from "@/components/jobs/JobCard";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const SavedJobsPage = () => {
  const { savedJobs, toggleSaveJob } = useAppContext();

  const handleToggleSave = (jobId: string) => {
    const job = savedJobs.find((j) => j.id === jobId);
    if (job) toggleSaveJob(job);
  };

  return (
    <PortalLayout title="Saved Jobs">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="text-sm text-gray-500 mt-1">
            Jobs you've bookmarked to come back to later.
          </p>
        </div>

        {savedJobs.length > 0 ? (
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={{ ...job, isSaved: true }}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-500">You haven't saved any jobs yet.</p>
            <Link
              to="/recommendations"
              className="inline-block mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Get AI job recommendations &rarr;
            </Link>
          </div>
        )}
      </div>
    </PortalLayout>
  );
};

export default SavedJobsPage;