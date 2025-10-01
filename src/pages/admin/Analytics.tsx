import DashboardLayout from '@/components/DashboardLayout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import { Users, Building2, Briefcase, TrendingUp } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const AdminAnalytics = () => {
  const skillsData = [
    { name: 'Python', value: 450 },
    { name: 'React', value: 380 },
    { name: 'SQL', value: 420 },
    { name: 'Data Science', value: 280 },
    { name: 'Cloud', value: 220 },
  ];

  const growthData = [
    { month: 'Jan', internships: 45 },
    { month: 'Feb', internships: 52 },
    { month: 'Mar', internships: 61 },
    { month: 'Apr', internships: 73 },
    { month: 'May', internships: 85 },
    { month: 'Jun', internships: 98 },
  ];

  const industryData = [
    { name: 'IT', value: 140 },
    { name: 'Finance', value: 85 },
    { name: 'Healthcare', value: 65 },
    { name: 'Manufacturing', value: 45 },
  ];

  const COLORS = ['hsl(217, 91%, 60%)', 'hsl(262, 83%, 58%)', 'hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)'];

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Platform Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into the ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Students" value="1,248" icon={Users} gradient />
          <StatCard title="Active Colleges" value="42" icon={Building2} gradient />
          <StatCard title="Industry Partners" value="156" icon={Briefcase} gradient />
          <StatCard title="Total Internships" value="892" icon={TrendingUp} gradient />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Internship Growth Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="internships" stroke="hsl(217, 91%, 60%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Skills Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="hsl(217, 91%, 60%)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Industry Participation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm">Average Internship Duration</span>
                <span className="font-bold text-primary">4.2 months</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm">Completion Rate</span>
                <span className="font-bold text-success">87%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm">Student Satisfaction</span>
                <span className="font-bold text-accent">4.6/5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm">Industry Engagement</span>
                <span className="font-bold text-primary">92%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
