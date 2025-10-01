import { NavLink } from 'react-router-dom';
import { PlusCircle, Users, UserCheck, Award } from 'lucide-react';

const IndustrySidebar = () => {
  const navItems = [
    { path: '/industry', icon: PlusCircle, label: 'Post Internship' },
    { path: '/industry/applicants', icon: Users, label: 'Applicants' },
    { path: '/industry/mentorship', icon: UserCheck, label: 'Mentorship' },
    { path: '/industry/certificates', icon: Award, label: 'Certificates' },
  ];

  return (
    <nav className="h-full p-4">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-sidebar-foreground px-3">Industry Portal</h2>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/industry'}
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

export default IndustrySidebar;
