import { IJob } from "@/interfaces/models";

// Temporary mock data. Replace with a real JobService call once the
// backend exposes job endpoints (e.g. GET /jobs, GET /jobs/applied, GET /jobs/saved).
export const MOCK_APPLIED_JOBS: IJob[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Pixel Forge",
    location: "Cairo, Egypt",
    type: "Full-time",
    salary: "$1,200 - $1,800 / mo",
    postedAt: "2026-06-10",
    status: "Interviewing",
  },
  {
    id: "2",
    title: "UI Engineer",
    company: "Nimbus Labs",
    location: "Remote",
    type: "Remote",
    salary: "$1,500 - $2,200 / mo",
    postedAt: "2026-06-05",
    status: "Applied",
  },
  {
    id: "3",
    title: "React Developer",
    company: "Stratos Tech",
    location: "Giza, Egypt",
    type: "Contract",
    salary: "$25 / hr",
    postedAt: "2026-05-28",
    status: "Rejected",
  },
];

export const MOCK_SAVED_JOBS: IJob[] = [
  {
    id: "4",
    title: "Frontend Developer",
    company: "Orbit Software",
    location: "Alexandria, Egypt",
    type: "Full-time",
    salary: "$1,000 - $1,600 / mo",
    postedAt: "2026-06-14",
    isSaved: true,
  },
  {
    id: "5",
    title: "Product Designer",
    company: "Pixel Forge",
    location: "Remote",
    type: "Remote",
    salary: "$1,800 - $2,500 / mo",
    postedAt: "2026-06-12",
    isSaved: true,
  },
];
