import { createContext, useContext, useState, ReactNode } from "react";
import { IJob } from "@/interfaces/models";
import { MOCK_SAVED_JOBS, MOCK_APPLIED_JOBS } from "@/data/mockJobs";

export type Conversation = {
  id: string;
  company: string;
  preview: string;
  time: string;
  unread?: boolean;
};

interface AppContextValue {
  savedJobs: IJob[];
  appliedJobs: IJob[];
  messages: Conversation[];
  toggleSaveJob: (job: IJob) => void;
  isJobSaved: (jobId: string) => boolean;
  applyToJob: (job: IJob) => void;
  isJobApplied: (jobId: string) => boolean;
  withdrawApplication: (jobId: string) => void; // ✅ NEW
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    company: "Pixel Forge",
    preview: "Thanks for applying! We'd like to schedule a call this week...",
    time: "2h ago",
    unread: true,
  },
  {
    id: "2",
    company: "Nimbus Labs",
    preview: "Your interview is confirmed for Thursday at 3 PM.",
    time: "Yesterday",
  },
  {
    id: "3",
    company: "Stratos Tech",
    preview: "We appreciate your interest, but we've moved forward with...",
    time: "3 days ago",
  },
];

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<IJob[]>(MOCK_SAVED_JOBS);
  const [appliedJobs, setAppliedJobs] = useState<IJob[]>(MOCK_APPLIED_JOBS);
  const [messages, setMessages] = useState<Conversation[]>(MOCK_CONVERSATIONS);

  const isJobSaved = (jobId: string) => savedJobs.some((job) => job.id === jobId);
  const isJobApplied = (jobId: string) => appliedJobs.some((job) => job.id === jobId);

  const toggleSaveJob = (job: IJob) => {
    setSavedJobs((prev) => {
      const alreadySaved = prev.some((j) => j.id === job.id);
      if (alreadySaved) return prev.filter((j) => j.id !== job.id);
      return [...prev, { ...job, isSaved: true }];
    });
  };

  const applyToJob = (job: IJob) => {
    setAppliedJobs((prev) => {
      if (prev.some((j) => j.id === job.id)) return prev;
      return [...prev, { ...job, status: "Applied" }];
    });

    setMessages((prev) => {
      const messageId = `apply-${job.id}`;
      if (prev.some((m) => m.id === messageId)) return prev;
      const confirmation: Conversation = {
        id: messageId,
        company: job.company,
        preview:
          "Your application has been received. We will contact you to schedule an interview.",
        time: "Just now",
        unread: true,
      };
      return [confirmation, ...prev];
    });
  };

  // ✅ NEW
  const withdrawApplication = (jobId: string) => {
    setAppliedJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  return (
    <AppContext.Provider
      value={{
        savedJobs,
        appliedJobs,
        messages,
        toggleSaveJob,
        isJobSaved,
        applyToJob,
        isJobApplied,
        withdrawApplication, // ✅ NEW
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};