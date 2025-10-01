import { Router } from "express";
import { nextId, readStore, writeStore } from "./store";

export const api = Router();

// Faculty Mentorship Students
api.get("/faculty/mentorship/students", (_req, res) => {
  const db = readStore();
  res.json(db.facultyMentorshipStudents);
});

api.post("/faculty/mentorship/students", (req, res) => {
  const db = readStore();
  const { name } = req.body as { name: string };
  const item = { id: nextId(db.facultyMentorshipStudents), name, mentor: null, status: "Unassigned" as const };
  db.facultyMentorshipStudents.push(item);
  writeStore(db);
  res.status(201).json(item);
});

api.post("/faculty/mentorship/assign", (req, res) => {
  const db = readStore();
  const { studentId, mentor } = req.body as { studentId: number; mentor: string };
  db.facultyMentorshipStudents = db.facultyMentorshipStudents.map(s => s.id === studentId ? { ...s, mentor, status: "Assigned" } : s);
  writeStore(db);
  res.json({ ok: true });
});

// Student Mentorship Messages & Tasks
api.get("/student/mentorship", (_req, res) => {
  const db = readStore();
  res.json(db.studentMentorship);
});

api.post("/student/mentorship/messages", (req, res) => {
  const db = readStore();
  const { sender, text, time, isMentor } = req.body as { sender: string; text: string; time: string; isMentor: boolean };
  const id = nextId(db.studentMentorship.messages);
  db.studentMentorship.messages.push({ id, sender, text, time, isMentor });
  writeStore(db);
  res.status(201).json({ id });
});

api.post("/student/mentorship/tasks/toggle", (req, res) => {
  const db = readStore();
  const { id } = req.body as { id: number };
  db.studentMentorship.tasks = db.studentMentorship.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  writeStore(db);
  res.json({ ok: true });
});

// Student Internships
api.get("/student/internships", (_req, res) => {
  const db = readStore();
  res.json(db.studentInternships);
});

api.post("/student/internships/apply", (req, res) => {
  const db = readStore();
  const { id } = req.body as { id: number };
  db.studentInternships = db.studentInternships.map(i => i.id === id ? { ...i, applied: true, applicants: i.applicants + 1 } : i);
  writeStore(db);
  res.json({ ok: true });
});

// Student Recommendations
api.get("/student/recommendations", (_req, res) => {
  const db = readStore();
  res.json(db.studentRecommendations);
});

api.post("/student/recommendations/apply", (req, res) => {
  const db = readStore();
  const { id } = req.body as { id: number };
  db.studentRecommendations = db.studentRecommendations.map(r => r.id === id ? { ...r, applied: true } : r);
  writeStore(db);
  res.json({ ok: true });
});

// Faculty Approvals
api.get("/faculty/approvals", (_req, res) => {
  const db = readStore();
  res.json(db.facultyApprovals);
});

api.post("/faculty/approvals/status", (req, res) => {
  const db = readStore();
  const { id, status } = req.body as { id: number; status: "approved" | "rejected" };
  db.facultyApprovals = db.facultyApprovals.map(r => r.id === id ? { ...r, status } : r);
  writeStore(db);
  res.json({ ok: true });
});

// Industry Applicants
api.get("/industry/applicants", (_req, res) => {
  const db = readStore();
  res.json(db.industryApplicants);
});

api.post("/industry/applicants/status", (req, res) => {
  const db = readStore();
  const { id, status } = req.body as { id: number; status: "shortlisted" | "rejected" };
  db.industryApplicants = db.industryApplicants.map(a => a.id === id ? { ...a, status } : a);
  writeStore(db);
  res.json({ ok: true });
});

// Industry Posted Internships
api.get("/industry/posted", (_req, res) => {
  const db = readStore();
  res.json(db.industryPosted);
});

api.post("/industry/posted", (req, res) => {
  const db = readStore();
  const { title, description, duration, mode, skills } = req.body as { title: string; description: string; duration: string; mode: string; skills: string[] };
  const item = { id: nextId(db.industryPosted), title, description, duration, mode, skills };
  db.industryPosted.unshift(item);
  writeStore(db);
  res.status(201).json(item);
});

// Industry Certificates
api.get("/industry/certificates", (_req, res) => {
  const db = readStore();
  res.json(db.industryCertificates);
});

api.post("/industry/certificates/issue", (req, res) => {
  const db = readStore();
  const { id } = req.body as { id: number };
  db.industryCertificates = db.industryCertificates.map(c => c.id === id ? { ...c, certified: true } : c);
  writeStore(db);
  res.json({ ok: true });
});



