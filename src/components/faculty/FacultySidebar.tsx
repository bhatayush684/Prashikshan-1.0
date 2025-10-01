import { NavLink } from 'react-router-dom';
import { Users, CheckSquare, UserCheck, FileText } from 'lucide-react';

const FacultySidebar = () => {
  const navItems = [
    { path: '/faculty', icon: Users, label: 'Students' },
    { path: '/faculty/approvals', icon: CheckSquare, label: 'Approvals' },
    { path: '/faculty/mentorship', icon: UserCheck, label: 'Mentorship' },
    { path: '/faculty/reports', icon: FileText, label: 'Reports' },
  ];

  return (
    <nav className="h-full p-4">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-sidebar-foreground px-3">Faculty Portal</h2>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/faculty'}
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

export default FacultySidebar;
