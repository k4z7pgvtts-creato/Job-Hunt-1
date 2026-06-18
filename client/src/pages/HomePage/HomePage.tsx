import { useMemo, useState } from "react";
import {
  BookmarkIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import Divider from "@/components/core-ui/Divider";
import PortalLayout from "@/components/layouts/portal/PortalLayout";
import { useAppContext } from "@/context/AppContext";
import { IJob } from "@/interfaces/models";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  tags: string[];
  salary: string;
  time: string;
  type: string;
  experience: string;
  description: string;
  applications: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
// A large, varied set of jobs across many industries (tech, design, marketing,
// sales, finance, HR, support, operations, healthcare, education, legal,
// hospitality, creative, and volunteer) so search and filters have enough
// variety to be meaningfully tested.

const JOBS: Job[] = [
  {
    id: 1,
    title: "UX/UI Designer",
    company: "Google",
    location: "Mountain View, California",
    tags: ["Remote", "Full-time", "5+ years"],
    salary: "$100k - $120k/yr",
    time: "5min ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "1000+",
    description:
      "Design beautiful, intuitive experiences for Google's suite of products used by billions worldwide. You'll work closely with product managers and engineers to bring ideas to life.",
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Facebook",
    location: "Menlo Park, California",
    tags: ["Remote", "Full-time", "5+ years"],
    salary: "$110k - $140k/yr",
    time: "10min ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "800+",
    description:
      "Build the next generation of Meta's social platforms. Work on large-scale distributed systems serving billions of users.",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Amazon",
    location: "Seattle, Washington",
    tags: ["On-site", "Full-time", "3-5 years"],
    salary: "$120k - $150k/yr",
    time: "30min ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "600+",
    description:
      "Drive product strategy and execution for Amazon's e-commerce platform. Define roadmaps, work with cross-functional teams, and deliver world-class customer experiences.",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Microsoft",
    location: "Redmond, Washington",
    tags: ["Hybrid", "Full-time", "3-5 years"],
    salary: "$105k - $130k/yr",
    time: "1hr ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "400+",
    description:
      "Apply machine learning and statistical modeling to Microsoft's vast data ecosystem. Help build intelligent features across Office, Azure, and Bing.",
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "Airbnb",
    location: "San Francisco, California",
    tags: ["Remote", "Part-time", "1-3 years"],
    salary: "$60k - $80k/yr",
    time: "2hr ago",
    type: "Part-time",
    experience: "1-3 years",
    applications: "300+",
    description:
      "Build responsive, accessible UIs for Airbnb's host and guest-facing products. Strong React and TypeScript skills required.",
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Netflix",
    location: "Los Gatos, California",
    tags: ["Remote", "Full-time", "5+ years"],
    salary: "$130k - $160k/yr",
    time: "3hr ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "250+",
    description:
      "Scale Netflix's streaming infrastructure to handle 200M+ subscribers. Own CI/CD pipelines, Kubernetes clusters, and observability tooling.",
  },
  {
    id: 7,
    title: "iOS Developer",
    company: "Apple",
    location: "Cupertino, California",
    tags: ["On-site", "Full-time", "3-5 years"],
    salary: "$120k - $145k/yr",
    time: "4hr ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "500+",
    description:
      "Build world-class iOS apps used by hundreds of millions of Apple customers. Deep expertise in Swift and UIKit required.",
  },
  {
    id: 8,
    title: "Backend Engineer",
    company: "Stripe",
    location: "Remote",
    tags: ["Remote", "Full-time", "1-3 years"],
    salary: "$90k - $115k/yr",
    time: "5hr ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "350+",
    description:
      "Power Stripe's payment APIs that handle billions in transactions annually. Work on reliability, performance, and security of critical financial infrastructure.",
  },
  {
    id: 9,
    title: "ML Engineer",
    company: "OpenAI",
    location: "San Francisco, California",
    tags: ["Hybrid", "Full-time", "5+ years"],
    salary: "$150k - $200k/yr",
    time: "6hr ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "700+",
    description:
      "Train and deploy large-scale language and vision models. Collaborate with researchers to push the frontier of AI safety and capability.",
  },
  {
    id: 10,
    title: "Backend Engineer",
    company: "Shopify",
    location: "Ottawa, Canada",
    tags: ["Remote", "Full-time", "3-5 years"],
    salary: "$95k - $120k/yr",
    time: "7hr ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "450+",
    description:
      "Build and maintain the APIs that power millions of online stores on Shopify's commerce platform.",
  },
  {
    id: 11,
    title: "Mobile Developer (iOS/Android)",
    company: "Spotify",
    location: "Stockholm, Sweden",
    tags: ["Hybrid", "Full-time", "3-5 years"],
    salary: "$100k - $130k/yr",
    time: "8hr ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "300+",
    description:
      "Ship features for Spotify's mobile apps used by hundreds of millions of listeners every day.",
  },
  {
    id: 12,
    title: "QA Automation Engineer",
    company: "Salesforce",
    location: "San Francisco, California",
    tags: ["On-site", "Full-time", "1-3 years"],
    salary: "$80k - $100k/yr",
    time: "9hr ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "200+",
    description:
      "Design and maintain automated test suites that keep Salesforce's CRM platform reliable at scale.",
  },
  {
    id: 13,
    title: "Security Engineer",
    company: "Cloudflare",
    location: "Austin, Texas",
    tags: ["Remote", "Full-time", "5+ years"],
    salary: "$140k - $170k/yr",
    time: "10hr ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "320+",
    description:
      "Protect Cloudflare's global network from threats and help build security products used by millions of websites.",
  },
  {
    id: 14,
    title: "Cloud Solutions Architect",
    company: "Oracle",
    location: "Austin, Texas",
    tags: ["Hybrid", "Full-time", "5+ years"],
    salary: "$150k - $180k/yr",
    time: "12hr ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "180+",
    description:
      "Design enterprise cloud architectures for Oracle's largest customers, balancing cost, performance, and reliability.",
  },
  {
    id: 15,
    title: "Game Developer",
    company: "Riot Games",
    location: "Los Angeles, California",
    tags: ["On-site", "Full-time", "3-5 years"],
    salary: "$110k - $135k/yr",
    time: "1 day ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "260+",
    description:
      "Build gameplay systems and tools for one of the world's most played competitive games.",
  },
  {
    id: 16,
    title: "Data Engineer",
    company: "Snowflake",
    location: "Remote",
    tags: ["Remote", "Full-time", "3-5 years"],
    salary: "$115k - $140k/yr",
    time: "1 day ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "410+",
    description:
      "Build pipelines and tooling that move and transform massive datasets for Snowflake's customers.",
  },
  {
    id: 17,
    title: "Site Reliability Engineer",
    company: "Datadog",
    location: "New York, New York",
    tags: ["Hybrid", "Full-time", "5+ years"],
    salary: "$135k - $165k/yr",
    time: "1 day ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "220+",
    description:
      "Keep Datadog's monitoring platform fast and reliable for thousands of engineering teams worldwide.",
  },
  {
    id: 18,
    title: "Full Stack Developer",
    company: "Shopify",
    location: "Remote",
    tags: ["Remote", "Part-time", "1-3 years"],
    salary: "$50k - $70k/yr",
    time: "2 days ago",
    type: "Part-time",
    experience: "1-3 years",
    applications: "190+",
    description:
      "Contribute to internal tools and merchant-facing features on a small, fast-moving team.",
  },
  {
    id: 19,
    title: "UX Researcher",
    company: "IBM",
    location: "Austin, Texas",
    tags: ["On-site", "Full-time", "3-5 years"],
    salary: "$95k - $115k/yr",
    time: "10min ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "150+",
    description:
      "Run qualitative and quantitative research to guide product decisions across IBM's enterprise software suite.",
  },
  {
    id: 20,
    title: "Graphic Designer",
    company: "Adobe",
    location: "San Jose, California",
    tags: ["Hybrid", "Full-time", "1-3 years"],
    salary: "$65k - $85k/yr",
    time: "20min ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "410+",
    description:
      "Create marketing visuals and brand assets used across Adobe's product launches and campaigns.",
  },
  {
    id: 21,
    title: "Motion Graphics Designer",
    company: "Pixar",
    location: "Emeryville, California",
    tags: ["On-site", "Full-time", "3-5 years"],
    salary: "$90k - $110k/yr",
    time: "1hr ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "130+",
    description:
      "Craft animated visuals and motion design for trailers, promos, and behind-the-scenes content.",
  },
  {
    id: 22,
    title: "Digital Marketing Manager",
    company: "HubSpot",
    location: "Boston, Massachusetts",
    tags: ["Hybrid", "Full-time", "3-5 years"],
    salary: "$85k - $105k/yr",
    time: "2hr ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "270+",
    description:
      "Plan and execute multi-channel marketing campaigns to drive demand for HubSpot's CRM platform.",
  },
  {
    id: 23,
    title: "SEO Specialist",
    company: "Moz",
    location: "Seattle, Washington",
    tags: ["Remote", "Full-time", "1-3 years"],
    salary: "$55k - $70k/yr",
    time: "3hr ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "340+",
    description:
      "Improve organic search performance through technical SEO, content strategy, and link building.",
  },
  {
    id: 24,
    title: "Content Marketing Manager",
    company: "Mailchimp",
    location: "Atlanta, Georgia",
    tags: ["Remote", "Full-time", "3-5 years"],
    salary: "$70k - $90k/yr",
    time: "4hr ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "200+",
    description:
      "Lead content strategy and editorial calendar to grow Mailchimp's audience of small business owners.",
  },
  {
    id: 25,
    title: "Social Media Manager",
    company: "Buzzfeed",
    location: "New York, New York",
    tags: ["On-site", "Full-time", "1-3 years"],
    salary: "$50k - $65k/yr",
    time: "5hr ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "380+",
    description:
      "Grow and engage Buzzfeed's social audiences across platforms with timely, shareable content.",
  },
  {
    id: 26,
    title: "Brand Manager",
    company: "Nike",
    location: "Portland, Oregon",
    tags: ["On-site", "Full-time", "5+ years"],
    salary: "$100k - $125k/yr",
    time: "6hr ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "240+",
    description:
      "Shape brand positioning and go-to-market strategy for one of Nike's flagship product lines.",
  },
  {
    id: 27,
    title: "Account Executive",
    company: "Salesforce",
    location: "Chicago, Illinois",
    tags: ["Hybrid", "Full-time", "3-5 years"],
    salary: "$80k - $110k/yr + commission",
    time: "7hr ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "290+",
    description:
      "Own the full sales cycle for mid-market accounts, from prospecting to closing.",
  },
  {
    id: 28,
    title: "Sales Development Representative",
    company: "HubSpot",
    location: "Remote",
    tags: ["Remote", "Full-time", "1-3 years"],
    salary: "$45k - $60k/yr + commission",
    time: "8hr ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "510+",
    description:
      "Generate and qualify new business opportunities for the outbound sales team.",
  },
  {
    id: 29,
    title: "Regional Sales Manager",
    company: "Oracle",
    location: "Dallas, Texas",
    tags: ["On-site", "Full-time", "5+ years"],
    salary: "$120k - $150k/yr + commission",
    time: "9hr ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "160+",
    description:
      "Lead a regional sales team and own quota for Oracle's enterprise software division.",
  },
  {
    id: 30,
    title: "Financial Analyst",
    company: "JPMorgan Chase",
    location: "New York, New York",
    tags: ["On-site", "Full-time", "1-3 years"],
    salary: "$75k - $95k/yr",
    time: "10hr ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "330+",
    description:
      "Build financial models and reports to support investment decisions for institutional clients.",
  },
  {
    id: 31,
    title: "Senior Accountant",
    company: "Deloitte",
    location: "Chicago, Illinois",
    tags: ["Hybrid", "Full-time", "3-5 years"],
    salary: "$80k - $100k/yr",
    time: "11hr ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "210+",
    description:
      "Manage month-end close, audits, and financial reporting for a portfolio of client accounts.",
  },
  {
    id: 32,
    title: "Payroll Specialist",
    company: "ADP",
    location: "Roseland, New Jersey",
    tags: ["On-site", "Full-time", "1-3 years"],
    salary: "$55k - $70k/yr",
    time: "12hr ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "140+",
    description:
      "Process payroll accurately and on time for a portfolio of corporate clients.",
  },
  {
    id: 33,
    title: "HR Business Partner",
    company: "LinkedIn",
    location: "Sunnyvale, California",
    tags: ["Hybrid", "Full-time", "5+ years"],
    salary: "$100k - $125k/yr",
    time: "1 day ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "170+",
    description:
      "Partner with leadership to shape people strategy, performance management, and org design.",
  },
  {
    id: 34,
    title: "Talent Acquisition Specialist",
    company: "Indeed",
    location: "Austin, Texas",
    tags: ["Remote", "Full-time", "1-3 years"],
    salary: "$60k - $78k/yr",
    time: "1 day ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "260+",
    description:
      "Source, screen, and hire top talent across engineering and business roles.",
  },
  {
    id: 35,
    title: "Customer Success Manager",
    company: "Zendesk",
    location: "Remote",
    tags: ["Remote", "Full-time", "3-5 years"],
    salary: "$75k - $95k/yr",
    time: "2 days ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "220+",
    description:
      "Drive adoption and renewals for a portfolio of mid-market customer accounts.",
  },
  {
    id: 36,
    title: "Technical Support Engineer",
    company: "Atlassian",
    location: "Austin, Texas",
    tags: ["Hybrid", "Full-time", "1-3 years"],
    salary: "$58k - $75k/yr",
    time: "2 days ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "310+",
    description:
      "Troubleshoot technical issues and guide customers through Atlassian's suite of developer tools.",
  },
  {
    id: 37,
    title: "Operations Manager",
    company: "Amazon",
    location: "Phoenix, Arizona",
    tags: ["On-site", "Full-time", "5+ years"],
    salary: "$90k - $115k/yr",
    time: "3 days ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "190+",
    description:
      "Oversee day-to-day fulfillment center operations, safety, and team performance.",
  },
  {
    id: 38,
    title: "Supply Chain Analyst",
    company: "Walmart",
    location: "Bentonville, Arkansas",
    tags: ["On-site", "Full-time", "1-3 years"],
    salary: "$62k - $80k/yr",
    time: "3 days ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "150+",
    description:
      "Analyze inventory and logistics data to improve forecasting and reduce supply chain costs.",
  },
  {
    id: 39,
    title: "Logistics Coordinator",
    company: "FedEx",
    location: "Memphis, Tennessee",
    tags: ["On-site", "Part-time", "1-3 years"],
    salary: "$40k - $52k/yr",
    time: "3 days ago",
    type: "Part-time",
    experience: "1-3 years",
    applications: "130+",
    description:
      "Coordinate shipment scheduling and routing to keep packages moving on time.",
  },
  {
    id: 40,
    title: "Registered Nurse",
    company: "Mayo Clinic",
    location: "Rochester, Minnesota",
    tags: ["On-site", "Full-time", "3-5 years"],
    salary: "$70k - $90k/yr",
    time: "4 days ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "220+",
    description:
      "Provide direct patient care and coordinate with physicians across a busy hospital unit.",
  },
  {
    id: 41,
    title: "Healthcare Administrator",
    company: "Kaiser Permanente",
    location: "Oakland, California",
    tags: ["Hybrid", "Full-time", "5+ years"],
    salary: "$95k - $120k/yr",
    time: "4 days ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "110+",
    description:
      "Manage clinic operations, budgets, and compliance for a multi-site healthcare network.",
  },
  {
    id: 42,
    title: "High School Teacher",
    company: "Khan Academy",
    location: "Mountain View, California",
    tags: ["On-site", "Full-time", "3-5 years"],
    salary: "$55k - $72k/yr",
    time: "5 days ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "95+",
    description:
      "Design and deliver engaging math and science curriculum for high school students.",
  },
  {
    id: 43,
    title: "Instructional Designer",
    company: "Coursera",
    location: "Remote",
    tags: ["Remote", "Full-time", "1-3 years"],
    salary: "$65k - $82k/yr",
    time: "5 days ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "175+",
    description:
      "Design online courses and learning experiences for millions of learners worldwide.",
  },
  {
    id: 44,
    title: "Paralegal",
    company: "Latham & Watkins",
    location: "Los Angeles, California",
    tags: ["On-site", "Full-time", "1-3 years"],
    salary: "$58k - $75k/yr",
    time: "6 days ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "140+",
    description:
      "Support attorneys with legal research, document review, and case preparation.",
  },
  {
    id: 45,
    title: "Compliance Officer",
    company: "Goldman Sachs",
    location: "New York, New York",
    tags: ["Hybrid", "Full-time", "5+ years"],
    salary: "$110k - $140k/yr",
    time: "6 days ago",
    type: "Full-time",
    experience: "5+ years",
    applications: "165+",
    description:
      "Monitor regulatory compliance and manage risk across the firm's trading and banking divisions.",
  },
  {
    id: 46,
    title: "Hotel Operations Manager",
    company: "Marriott International",
    location: "Orlando, Florida",
    tags: ["On-site", "Full-time", "3-5 years"],
    salary: "$65k - $85k/yr",
    time: "1 week ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "90+",
    description:
      "Oversee front desk, housekeeping, and guest services to deliver a top-tier hotel experience.",
  },
  {
    id: 47,
    title: "Event Coordinator",
    company: "Hilton",
    location: "Las Vegas, Nevada",
    tags: ["On-site", "Part-time", "1-3 years"],
    salary: "$38k - $48k/yr",
    time: "1 week ago",
    type: "Part-time",
    experience: "1-3 years",
    applications: "120+",
    description:
      "Plan and execute conferences and events, coordinating with vendors and hotel staff.",
  },
  {
    id: 48,
    title: "Copywriter",
    company: "Wieden+Kennedy",
    location: "Portland, Oregon",
    tags: ["Remote", "Full-time", "1-3 years"],
    salary: "$55k - $72k/yr",
    time: "1 week ago",
    type: "Full-time",
    experience: "1-3 years",
    applications: "230+",
    description:
      "Write compelling copy for ad campaigns across digital, print, and video for major brands.",
  },
  {
    id: 49,
    title: "Video Editor",
    company: "YouTube",
    location: "Los Angeles, California",
    tags: ["Hybrid", "Full-time", "3-5 years"],
    salary: "$68k - $88k/yr",
    time: "1 week ago",
    type: "Full-time",
    experience: "3-5 years",
    applications: "200+",
    description:
      "Edit and produce video content for creator partnerships and platform marketing.",
  },
  {
    id: 50,
    title: "Community Outreach Coordinator",
    company: "Red Cross",
    location: "Remote",
    tags: ["Remote", "Volunteer", "1-3 years"],
    salary: "Unpaid / Stipend",
    time: "2 weeks ago",
    type: "Part-time",
    experience: "1-3 years",
    applications: "60+",
    description:
      "Organize local volunteer drives, blood donation events, and disaster relief outreach.",
  },
];

const SORT_OPTIONS = ["Most Recent", "A-Z", "Top Salary", "Trending"];
const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Volunteer"];
const EXPERIENCES = ["1-3 years", "3-5 years", "5+ years"];
const LOCATIONS = ["Remote", "On-site", "Hybrid"];

// Converts a HomePage `Job` (local, id: number) into the shared `IJob` shape
// used by AppContext / JobCard / SavedJobsPage / MyJobsPage (id: string).
const toIJob = (job: Job): IJob => ({
  id: String(job.id),
  title: job.title,
  company: job.company,
  location: job.location,
  type: job.type as IJob["type"],
  salary: job.salary,
  postedAt: job.time,
});

// ─── Component ────────────────────────────────────────────────────────────────

const HomePage = () => {
  const { toggleSaveJob, isJobSaved, applyToJob, isJobApplied } =
    useAppContext();

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job>(JOBS[0]);

  // Filters
  const [sortBy, setSortBy] = useState("Most Recent");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedExps, setSelectedExps] = useState<string[]>([]);
  const [selectedLocs, setSelectedLocs] = useState<string[]>([]);

  const toggleSet = (
    list: string[],
    setList: (v: string[]) => void,
    item: string,
  ) =>
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
    );

  const toggleSave = (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveJob(toIJob(job));
  };

  const handleApply = () => {
    applyToJob(toIJob(selectedJob));
  };

  const handleSearch = () => setSearch(searchInput);

  const parseSalary = (s: string) => {
    const match = s.match(/\$(\d+)k/);
    return match ? parseInt(match[1]) * 1000 : 0;
  };

  const filteredJobs = useMemo(() => {
    let list = [...JOBS];

    if (search.trim()) {
      const term = search.trim().toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(term) ||
          j.company.toLowerCase().includes(term) ||
          j.location.toLowerCase().includes(term),
      );
    }

    if (selectedTypes.length > 0)
      list = list.filter((j) =>
        selectedTypes.some((t) => j.tags.includes(t) || j.type === t),
      );

    if (selectedExps.length > 0)
      list = list.filter((j) =>
        selectedExps.some((e) => j.tags.includes(e) || j.experience === e),
      );

    if (selectedLocs.length > 0)
      list = list.filter((j) =>
        selectedLocs.some(
          (l) =>
            j.tags.includes(l) ||
            j.location.toLowerCase().includes(l.toLowerCase()),
        ),
      );

    if (minSalary)
      list = list.filter(
        (j) => parseSalary(j.salary) >= parseInt(minSalary) * 1000,
      );
    if (maxSalary)
      list = list.filter(
        (j) => parseSalary(j.salary) <= parseInt(maxSalary) * 1000,
      );

    if (sortBy === "A-Z") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "Top Salary")
      list.sort((a, b) => parseSalary(b.salary) - parseSalary(a.salary));

    return list;
  }, [
    search,
    selectedTypes,
    selectedExps,
    selectedLocs,
    minSalary,
    maxSalary,
    sortBy,
  ]);

  const clearFilters = () => {
    setSortBy("Most Recent");
    setMinSalary("");
    setMaxSalary("");
    setSelectedTypes([]);
    setSelectedExps([]);
    setSelectedLocs([]);
    setSearch("");
    setSearchInput("");
  };

  const hasFilters =
    selectedTypes.length + selectedExps.length + selectedLocs.length > 0 ||
    minSalary ||
    maxSalary ||
    search;

  return (
    <PortalLayout title="Home">
      {/* ── Left Sidebar: Filters ── */}
      <aside className="sticky top-24 hidden w-80 shrink-0 xl:block self-start">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-lg font-semibold text-gray-900">Filters</h4>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  <XMarkIcon className="h-3.5 w-3.5" /> Clear all
                </button>
              )}
            </div>

            <div className="py-4">
              <Divider />
            </div>

            {/* Sort By */}
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">
                Sort By
              </h5>
              <div className="grid grid-cols-2 gap-3">
                {SORT_OPTIONS.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sort-by"
                      checked={sortBy === item}
                      onChange={() => setSortBy(item)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-900">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="py-4">
              <Divider />
            </div>

            {/* Salary */}
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">
                Salary (k/yr)
              </h5>
              <div className="flex gap-x-3">
                <input
                  type="number"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="py-4">
              <Divider />
            </div>

            {/* Job Type */}
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">
                Job Type
              </h5>
              <div className="grid grid-cols-2 gap-3">
                {JOB_TYPES.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(item)}
                      onChange={() =>
                        toggleSet(selectedTypes, setSelectedTypes, item)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span className="text-sm text-gray-900">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="py-4">
              <Divider />
            </div>

            {/* Experience */}
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">
                Experience
              </h5>
              <div className="grid grid-cols-2 gap-3">
                {EXPERIENCES.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedExps.includes(item)}
                      onChange={() =>
                        toggleSet(selectedExps, setSelectedExps, item)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span className="text-sm text-gray-900">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="py-4">
              <Divider />
            </div>

            {/* Location */}
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">
                Location
              </h5>
              <div className="grid grid-cols-2 gap-3">
                {LOCATIONS.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLocs.includes(item)}
                      onChange={() =>
                        toggleSet(selectedLocs, setSelectedLocs, item)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span className="text-sm text-gray-900">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 min-w-0">
        {/* Search */}
        <div className="flex gap-x-3 mb-6">
          <div className="relative rounded-md shadow-sm flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="block w-full h-10 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              placeholder="Search Jobs"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </button>
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Search Results
          </h3>
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800">
              {filteredJobs.length}
            </span>{" "}
            Results Found
          </span>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-2">No jobs match your filters.</p>
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:underline font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const isSelected = selectedJob.id === job.id;
              const isSaved = isJobSaved(String(job.id));
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`overflow-hidden rounded-lg bg-white shadow cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 ${
                    isSelected
                      ? "border-2 border-indigo-600"
                      : "border border-transparent"
                  }`}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex gap-x-4 justify-between">
                      <div className="flex gap-x-2">
                        <div className="rounded w-12 h-12 bg-indigo-50 flex items-center justify-center shrink-0">
                          <BriefcaseIcon className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-900 leading-tight">
                            {job.title}
                          </h4>
                          <p className="text-sm text-gray-500">{job.company}</p>
                          <p className="text-xs text-gray-400">
                            {job.location}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleSave(job, e)}
                        className={`shrink-0 transition-colors ${isSaved ? "text-indigo-600" : "text-gray-300 hover:text-gray-500"}`}
                      >
                        {isSaved ? (
                          <BookmarkSolid className="h-5 w-5" />
                        ) : (
                          <BookmarkIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-600 ring-1 ring-inset ring-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-x-1.5">
                        <CurrencyDollarIcon className="h-5 w-5 text-indigo-600" />
                        <span className="text-sm text-gray-600">
                          {job.salary}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{job.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Right Sidebar: Job Details ── */}
      <aside className="sticky top-24 hidden w-80 shrink-0 xl:block self-start">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            {/* Header */}
            <div className="flex gap-x-4 justify-between items-start">
              <div className="rounded w-16 h-16 bg-indigo-50 flex items-center justify-center shrink-0">
                <BriefcaseIcon className="h-10 w-10 text-indigo-600" />
              </div>
              <div className="flex gap-3 items-center">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  title="Copy link"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ShareIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => toggleSave(selectedJob, e)}
                  className={`transition-colors ${isJobSaved(String(selectedJob.id)) ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {isJobSaved(String(selectedJob.id)) ? (
                    <BookmarkSolid className="h-5 w-5" />
                  ) : (
                    <BookmarkIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-3">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedJob.title}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedJob.company} · {selectedJob.location}
              </p>
            </div>

            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs mt-2 text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {selectedJob.applications} Applications
            </span>

            <div className="py-4">
              <Divider />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Job Type", value: selectedJob.type },
                { label: "Experience", value: selectedJob.experience },
                { label: "Position", value: selectedJob.title },
                { label: "Date Posted", value: selectedJob.time },
              ].map(({ label, value }) => (
                <div key={label}>
                  <h3 className="text-xs font-semibold text-gray-900 mb-1">
                    {label}
                  </h3>
                  <p className="text-sm text-gray-400">{value}</p>
                </div>
              ))}
            </div>

            <div className="py-4">
              <Divider />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {selectedJob.description}
              </p>
            </div>

            <div className="py-4">
              <Divider />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Base Salary
              </h3>
              <p className="text-sm text-gray-400 mb-4">{selectedJob.salary}</p>
              <button
                type="button"
                onClick={handleApply}
                disabled={isJobApplied(String(selectedJob.id))}
                className={`w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isJobApplied(String(selectedJob.id))
                    ? "bg-green-600 cursor-default"
                    : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                }`}
              >
                {isJobApplied(String(selectedJob.id))
                  ? "✓ Applied"
                  : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </PortalLayout>
  );
};

export default HomePage;
