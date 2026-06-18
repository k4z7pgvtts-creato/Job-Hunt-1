import { useNavigate } from "react-router-dom";
import PortalLayout from "@/components/layouts/portal/PortalLayout";
import Alert from "@/components/core-ui/Alert";
import useRecommendations from "./useRecommendations";
import {
  SparklesIcon,
  DocumentArrowUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const {
    mode,
    switchMode,
    query,
    setQuery,
    file,
    handleFileChange,
    results,
    isLoading,
    error,
    hasSearched,
    handleSubmit,
  } = useRecommendations();

  const handleSearchForJob = (jobTitle: string) => {
    navigate(`/my-jobs?search=${encodeURIComponent(jobTitle)}`);
  };

  return (
    <PortalLayout title="Job Recommendations">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
            <SparklesIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            AI Job Recommendations
          </h1>
          <p className="mt-2 text-gray-500">
            Tell us what you are looking for, or upload your CV, and we will
            suggest matching jobs for you.
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6">
          <div className="flex gap-x-2 mb-6 bg-gray-100 p-1 rounded-lg w-full sm:w-fit">
            <button
              type="button"
              onClick={() => switchMode("text")}
              className={`flex items-center gap-x-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors flex-1 justify-center sm:flex-none ${mode === "text" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
              Search by text
            </button>
            <button
              type="button"
              onClick={() => switchMode("cv")}
              className={`flex items-center gap-x-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors flex-1 justify-center sm:flex-none ${mode === "cv" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              <DocumentArrowUpIcon className="h-4 w-4" />
              Upload CV
            </button>
          </div>

          {error && (
            <div className="mb-4">
              <Alert type="error" message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {mode === "text" ? (
              <div>
                <label
                  htmlFor="query"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  What job are you looking for?
                </label>
                <div className="mt-2">
                  <input
                    id="query"
                    name="query"
                    type="text"
                    placeholder="e.g. frontend developer"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="cv"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload your CV
                </label>
                <div className="mt-2">
                  <label
                    htmlFor="cv"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors"
                  >
                    <DocumentArrowUpIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      {file ? file.name : "Click to upload PDF or TXT"}
                    </span>
                    <input
                      id="cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.txt"
                      className="hidden"
                      disabled={isLoading}
                      onChange={(e) =>
                        handleFileChange(e.target.files?.[0] || null)
                      }
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? "Finding matches..."
                  : mode === "text"
                    ? "Get Recommendations"
                    : "Analyze CV"}
              </button>
            </div>
          </form>
        </div>

        {hasSearched && !isLoading && !error && (
          <div className="mt-8">
            {results.length > 0 ? (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Recommended jobs for you
                </h2>
                <ul className="space-y-3">
                  {results.map((job, index) => (
                    <li
                      key={`${job.title}-${index}`}
                      className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-gray-900">
                          {job.title}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${job.matchPercentage >= 80 ? "bg-green-100 text-green-700" : job.matchPercentage >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"}`}
                        >
                          {job.matchPercentage}% match
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSearchForJob(job.title)}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 whitespace-nowrap"
                      >
                        Search for it &rarr;
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-center text-gray-500 mt-6">
                No matching jobs found for your profile. Try a different search
                or CV.
              </p>
            )}
          </div>
        )}
      </div>
    </PortalLayout>
  );
};

export default RecommendationsPage;
