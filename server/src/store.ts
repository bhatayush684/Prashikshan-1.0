import fs from "fs";
import path from "path";

type StoreData = {
  facultyMentorshipStudents: Array<{ id: number; name: string; mentor: string | null; status: "Assigned" | "Unassigned" }>;
  studentMentorship: {
    messages: Array<{ id: number; sender: string; text: string; time: string; isMentor: boolean }>;
    tasks: Array<{ id: number; task: string; completed: boolean }>;
  };
  studentInternships: Array<{
    id: number;
    title: string;
    company: string;
    duration: string;
    mode: string;
    stipend: string;
    skills: string[];
    applied: boolean;
    spots: number;
    applicants: number;
    difficulty: string;
  }>;
  studentRecommendations: Array<{ id: number; title: string; company: string; match: number; reason: string; skills: string[]; applied?: boolean }>;
  facultyApprovals: Array<{ id: number; studentName: string; internship: string; company: string; status: "pending" | "approved" | "rejected" }>;
  industryApplicants: Array<{ id: number; name: string; skills: string[]; status: "pending" | "shortlisted" | "rejected"; internship: string }>;
  industryPosted: Array<{ id: number; title: string; description: string; duration: string; mode: string; skills: string[] }>;
  industryCertificates: Array<{ id: number; name: string; role: string; duration: string; certified: boolean; rating: number; completionDate: string; achievements: string[] }>;
};

const DATA_DIR = path.join(process.cwd(), "server", "data");
const DATA_FILE = path.join(DATA_DIR, "db.json");

function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    const seed: StoreData = {
      facultyMentorshipStudents: [
        { id: 1, name: "Ayush Sharma", mentor: "Dr. Ramesh Kumar", status: "Assigned" },
        { id: 2, name: "Priya Mehta", mentor: null, status: "Unassigned" },
        { id: 3, name: "Rahul Singh", mentor: "Prof. Sarah Johnson", status: "Assigned" },
      ],
      studentMentorship: {
        messages: [
          { id: 1, sender: "Dr. Ramesh Kumar", text: "How is your data analysis project going?", time: "10:30 AM", isMentor: true },
          { id: 2, sender: "You", text: "Going well! Completed the initial data cleaning phase.", time: "10:35 AM", isMentor: false },
          { id: 3, sender: "Dr. Ramesh Kumar", text: "Great! Make sure to document your findings in the logbook.", time: "10:40 AM", isMentor: true },
        ],
        tasks: [
          { id: 1, task: "Complete Python certification", completed: true },
          { id: 2, task: "Submit mid-term internship report", completed: true },
          { id: 3, task: "Practice SQL queries daily", completed: false },
          { id: 4, task: "Prepare presentation for final review", completed: false },
        ],
      },
      studentInternships: [
        { id: 1, title: "Data Analyst Intern", company: "FinCorp", duration: "3 months", mode: "Remote", stipend: "₹15,000/month", skills: ["Python", "SQL", "Excel", "Data Visualization"], applied: true, spots: 5, applicants: 28, difficulty: "Intermediate" },
        { id: 2, title: "Frontend Developer Intern", company: "WebWorks", duration: "6 months", mode: "Onsite - Bangalore", stipend: "₹20,000/month", skills: ["React", "TypeScript", "CSS", "Tailwind"], applied: false, spots: 3, applicants: 45, difficulty: "Intermediate" },
        { id: 3, title: "Marketing Intern", company: "BrandX", duration: "4 months", mode: "Remote", stipend: "₹12,000/month", skills: ["Social Media", "Content Writing", "SEO", "Analytics"], applied: false, spots: 4, applicants: 32, difficulty: "Beginner" },
      ],
      studentRecommendations: [
        { id: 1, title: "UI/UX Designer Intern", company: "DesignHub", match: 92, reason: "Strong match with your design skills and portfolio", skills: ["Figma", "Adobe XD", "User Research"], applied: false },
        { id: 2, title: "Machine Learning Intern", company: "AI Labs", match: 85, reason: "Your Python and data science skills align perfectly", skills: ["Python", "TensorFlow", "Data Analysis"], applied: false },
      ],
      facultyApprovals: [
        { id: 1, studentName: "Ankit Kumar", internship: "Data Scientist Intern", company: "DataCorp", status: "pending" },
        { id: 2, studentName: "Neha Gupta", internship: "UI/UX Designer", company: "DesignHub", status: "pending" },
      ],
      industryApplicants: [
        { id: 1, name: "Ayush Sharma", skills: ["Python", "SQL", "Excel"], status: "pending", internship: "Data Analyst Intern" },
        { id: 2, name: "Priya Mehta", skills: ["React", "CSS", "JavaScript"], status: "pending", internship: "Frontend Developer" },
      ],
      industryPosted: [],
      industryCertificates: [
        { id: 1, name: "Sneha Patel", role: "Backend Developer Intern", duration: "6 months", certified: true, rating: 4.8, completionDate: "June 15, 2025", achievements: ["Completed 12 projects", "Excellent code quality", "Strong team collaboration"] },
        { id: 2, name: "Rohit Verma", role: "Cloud Engineer Intern", duration: "4 months", certified: false, rating: 4.5, completionDate: "June 20, 2025", achievements: ["AWS Certified", "Deployed 5 applications", "Quick learner"] },
      ],
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2), "utf-8");
  }
}

export function readStore(): StoreData {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as StoreData;
}

export function writeStore(data: StoreData): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function nextId(items: Array<{ id: number }>): number {
  return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
}



