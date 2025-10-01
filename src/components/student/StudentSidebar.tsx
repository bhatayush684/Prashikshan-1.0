import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Lightbulb, BookOpen, Users, User } from 'lucide-react';

const StudentSidebar = () => {
  const navItems = [
    { path: '/student', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/student/internships', icon: Briefcase, label: 'Internships' },
    { path: '/student/recommendations', icon: Lightbulb, label: 'AI Recommendations' },
    { path: '/student/logbook', icon: BookOpen, label: 'Logbook' },
    { path: '/student/mentorship', icon: Users, label: 'Mentorship' },
    { path: '/student/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="h-full p-4">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-sidebar-foreground px-3">Student Portal</h2>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/student'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default StudentSidebar;
