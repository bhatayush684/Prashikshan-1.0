import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";

// Landing & Auth
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentInternships from "./pages/student/Internships";
import StudentLogbook from "./pages/student/Logbook";
import StudentMentorship from "./pages/student/Mentorship";
import StudentProfile from "./pages/student/Profile";
import StudentRecommendations from "./pages/student/Recommendations";

// Faculty Pages
import FacultyApprovals from "./pages/faculty/Approvals";
import FacultyMentorship from "./pages/faculty/Mentorship";
import FacultyReports from "./pages/faculty/Reports";
import FacultyStudents from "./pages/faculty/Students";

// Industry Pages
import IndustryApplicants from "./pages/industry/Applicants";
import IndustryCertificates from "./pages/industry/Certificates";
import IndustryMentorship from "./pages/industry/Mentorship";
import IndustryPostInternship from "./pages/industry/PostInternship";

// Admin Pages
import AdminAnalytics from "./pages/admin/Analytics";
import AdminColleges from "./pages/admin/Colleges";
import AdminIndustries from "./pages/admin/Industries";
import AdminSkillGaps from "./pages/admin/SkillGaps";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/internships" element={<StudentInternships />} />
          <Route path="/student/logbook" element={<StudentLogbook />} />
          <Route path="/student/mentorship" element={<StudentMentorship />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/recommendations" element={<StudentRecommendations />} />

          {/* Faculty Routes */}
          <Route path="/faculty" element={<FacultyApprovals />} />
          <Route path="/faculty/approvals" element={<FacultyApprovals />} />
          <Route path="/faculty/mentorship" element={<FacultyMentorship />} />
          <Route path="/faculty/reports" element={<FacultyReports />} />
          <Route path="/faculty/students" element={<FacultyStudents />} />

          {/* Industry Routes */}
          <Route path="/industry" element={<IndustryPostInternship />} />
          <Route path="/industry/post-internship" element={<IndustryPostInternship />} />
          <Route path="/industry/applicants" element={<IndustryApplicants />} />
          <Route path="/industry/certificates" element={<IndustryCertificates />} />
          <Route path="/industry/mentorship" element={<IndustryMentorship />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminAnalytics />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/colleges" element={<AdminColleges />} />
          <Route path="/admin/industries" element={<AdminIndustries />} />
          <Route path="/admin/skill-gaps" element={<AdminSkillGaps />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </ErrorBoundary>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
