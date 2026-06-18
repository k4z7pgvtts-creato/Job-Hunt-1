export interface IJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary?: string;
  postedAt: string;
  status?: "Applied" | "Interviewing" | "Offered" | "Rejected";
  isSaved?: boolean;
}