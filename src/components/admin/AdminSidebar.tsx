import { NavLink } from 'react-router-dom';
import { BarChart3, School, Building2, TrendingUp } from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    { path: '/admin', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/colleges', icon: School, label: 'Colleges' },
    { path: '/admin/industries', icon: Building2, label: 'Industries' },
    { path: '/admin/skill-gaps', icon: TrendingUp, label: 'Skill Gaps' },
  ];

  return (
    <nav className="h-full p-4">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-sidebar-foreground px-3">Admin Portal</h2>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/admin'}
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

export default AdminSidebar;
