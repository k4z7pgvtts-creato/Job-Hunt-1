import { useState } from "react";
import { MOCK_APPLIED_JOBS, MOCK_SAVED_JOBS } from "@/data/mockJobs";

type Mode = "text" | "cv";

export type JobMatch = {
  title: string;
  matchPercentage: number;
};

const ALL_JOBS = [...MOCK_APPLIED_JOBS, ...MOCK_SAVED_JOBS];

const useRecommendations = () => {
  const [mode, setMode] = useState<Mode>("text");
  const [query, setQuery] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setQuery("");
    setFile(null);
    setResults([]);
    setError(null);
    setHasSearched(false);
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "text" && !query.trim()) {
      setError("Please enter a job title or skill.");
      return;
    }
    if (mode === "cv" && !file) {
      setError("Please upload a CV file.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setResults([]);

    await new Promise((res) => setTimeout(res, 1500));

    try {
      if (mode === "cv") {
        // CV mode — match كل الوظائف بنسبة عالية
        const allMatched = ALL_JOBS.map((job) => ({
          title: job.title,
          matchPercentage: Math.floor(Math.random() * 30) + 65,
        })).sort((a, b) => b.matchPercentage - a.matchPercentage);

        setResults(allMatched);
      } else {
        // Text mode — matching حقيقي على الـ query
        const searchTerm = query.toLowerCase();

        const keywords = searchTerm
          .replace(/[^a-z0-9\s]/g, " ")
          .split(/\s+/)
          .filter(Boolean);

        const scored = ALL_JOBS.map((job) => {
          const haystack =
            `${job.title} ${job.company} ${job.type}`.toLowerCase();

          let score = 0;
          keywords.forEach((kw) => {
            if (haystack.includes(kw)) score += 30;
          });
          if (haystack.includes(searchTerm)) score += 40;

          return {
            title: job.title,
            matchPercentage: Math.min(score, 95),
          };
        })
          .filter((j) => j.matchPercentage >= 40)
          .sort((a, b) => b.matchPercentage - a.matchPercentage);

        setResults(scored);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};

export default useRecommendations;