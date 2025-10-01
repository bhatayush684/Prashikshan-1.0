import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ChatBot from "@/components/ChatBot";

// Landing & Auth
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentInternships from "./pages/student/Internships";
import StudentRecommendations from "./pages/student/Recommendations";
import StudentLogbook from "./pages/student/Logbook";
import StudentMentorship from "./pages/student/Mentorship";
import StudentProfile from "./pages/student/Profile";

// Faculty Pages
import FacultyStudents from "./pages/faculty/Students";
import FacultyApprovals from "./pages/faculty/Approvals";
import FacultyMentorship from "./pages/faculty/Mentorship";
import FacultyReports from "./pages/faculty/Reports";

// Industry Pages
import IndustryPostInternship from "./pages/industry/PostInternship";
import IndustryApplicants from "./pages/industry/Applicants";
import IndustryMentorship from "./pages/industry/Mentorship";
import IndustryCertificates from "./pages/industry/Certificates";

// Admin Pages
import AdminAnalytics from "./pages/admin/Analytics";
import AdminColleges from "./pages/admin/Colleges";
import AdminIndustries from "./pages/admin/Industries";
import AdminSkillGaps from "./pages/admin/SkillGaps";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Student Routes */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/internships" element={<StudentInternships />} />
            <Route path="/student/recommendations" element={<StudentRecommendations />} />
            <Route path="/student/logbook" element={<StudentLogbook />} />
            <Route path="/student/mentorship" element={<StudentMentorship />} />
            <Route path="/student/profile" element={<StudentProfile />} />

            {/* Faculty Routes */}
            <Route path="/faculty" element={<FacultyStudents />} />
            <Route path="/faculty/approvals" element={<FacultyApprovals />} />
            <Route path="/faculty/mentorship" element={<FacultyMentorship />} />
            <Route path="/faculty/reports" element={<FacultyReports />} />

            {/* Industry Routes */}
            <Route path="/industry" element={<IndustryPostInternship />} />
            <Route path="/industry/applicants" element={<IndustryApplicants />} />
            <Route path="/industry/mentorship" element={<IndustryMentorship />} />
            <Route path="/industry/certificates" element={<IndustryCertificates />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminAnalytics />} />
            <Route path="/admin/colleges" element={<AdminColleges />} />
            <Route path="/admin/industries" element={<AdminIndustries />} />
            <Route path="/admin/skill-gaps" element={<AdminSkillGaps />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
