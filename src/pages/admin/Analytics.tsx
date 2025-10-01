import DashboardLayout from '@/components/DashboardLayout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/card';
import StatCard from '@/components/StatCard';
import { Users, Building2, Briefcase, TrendingUp, GraduationCap, Target } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Area, AreaChart } from 'recharts';

const AdminAnalytics = () => {
  const skillsData = [
    { name: 'Python', value: 520, growth: '+15%' },
    { name: 'React', value: 480, growth: '+22%' },
    { name: 'SQL', value: 450, growth: '+10%' },
    { name: 'Data Science', value: 380, growth: '+28%' },
    { name: 'Cloud (AWS)', value: 290, growth: '+35%' },
    { name: 'Machine Learning', value: 245, growth: '+42%' },
  ];

  const growthData = [
    { month: 'Jan', internships: 52, students: 180, companies: 12 },
    { month: 'Feb', internships: 68, students: 220, companies: 15 },
    { month: 'Mar', internships: 85, students: 280, companies: 18 },
    { month: 'Apr', internships: 102, students: 340, companies: 22 },
    { month: 'May', internships: 128, students: 420, companies: 28 },
    { month: 'Jun', internships: 156, students: 510, companies: 34 },
  ];

  const industryData = [
    { name: 'IT & Software', value: 245, color: 'hsl(217, 91%, 60%)' },
    { name: 'Finance', value: 156, color: 'hsl(142, 71%, 45%)' },
    { name: 'Healthcare', value: 98, color: 'hsl(262, 83%, 58%)' },
    { name: 'Manufacturing', value: 72, color: 'hsl(38, 92%, 50%)' },
    { name: 'Education', value: 65, color: 'hsl(48, 96%, 53%)' },
    { name: 'Others', value: 56, color: 'hsl(0, 84%, 60%)' },
  ];

  const engagementData = [
    { week: 'Week 1', active: 420, applications: 156 },
    { week: 'Week 2', active: 580, applications: 198 },
    { week: 'Week 3', active: 680, applications: 234 },
    { week: 'Week 4', active: 820, applications: 289 },
  ];

  const COLORS = ['hsl(217, 91%, 60%)', 'hsl(142, 71%, 45%)', 'hsl(262, 83%, 58%)', 'hsl(38, 92%, 50%)', 'hsl(48, 96%, 53%)', 'hsl(0, 84%, 60%)'];

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gradient-primary">Platform Analytics</h1>
          <p className="text-muted-foreground text-lg">Comprehensive insights into the ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Students" 
            value="1,548" 
            icon={Users} 
            gradient 
            trend={{ value: '+12% this month', isPositive: true }}
          />
          <StatCard 
            title="Active Colleges" 
            value="52" 
            icon={GraduationCap} 
            gradient 
            trend={{ value: '+8 new', isPositive: true }}
          />
          <StatCard 
            title="Industry Partners" 
            value="184" 
            icon={Building2} 
            gradient 
            trend={{ value: '+15% growth', isPositive: true }}
          />
          <StatCard 
            title="Total Internships" 
            value="1,092" 
            icon={Briefcase} 
            gradient 
            trend={{ value: '+22% increase', isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 card-gradient border-2 hover-lift">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Growth Trends
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorInternships" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="internships" stroke="hsl(217, 91%, 60%)" fillOpacity={1} fill="url(#colorInternships)" strokeWidth={2} />
                <Area type="monotone" dataKey="students" stroke="hsl(142, 71%, 45%)" fillOpacity={1} fill="url(#colorStudents)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 card-gradient border-2 hover-lift">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              Top Skills Demand
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={skillsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {skillsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 card-gradient border-2 hover-lift">
            <h3 className="text-xl font-bold mb-6">Industry Distribution</h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 card-gradient border-2 hover-lift">
            <h3 className="text-xl font-bold mb-6">Weekly Engagement</h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="hsl(217, 91%, 60%)" strokeWidth={3} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="applications" stroke="hsl(142, 71%, 45%)" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-8 card-gradient border-2">
          <h3 className="text-xl font-bold mb-6">Key Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 hover-lift">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Avg Internship Duration</p>
              <p className="text-4xl font-bold text-gradient-primary mb-1">4.8</p>
              <p className="text-xs text-muted-foreground">months</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-success/10 to-emerald-500/10 rounded-xl border-2 hover-lift">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Completion Rate</p>
              <p className="text-4xl font-bold text-success mb-1">92%</p>
              <p className="text-xs text-success">↑ 5% from last month</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-xl border-2 hover-lift">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Student Satisfaction</p>
              <p className="text-4xl font-bold text-accent mb-1">4.7</p>
              <p className="text-xs text-muted-foreground">out of 5.0</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gold/10 to-yellow-500/10 rounded-xl border-2 hover-lift">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Industry Engagement</p>
              <p className="text-4xl font-bold text-gold mb-1">94%</p>
              <p className="text-xs text-gold">↑ 8% growth</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 card-gradient border-2 hover-lift">
            <h4 className="font-semibold mb-4 text-lg">Top Performing Colleges</h4>
            <div className="space-y-3">
              {['XYZ Govt College', 'ABC Skill Center', 'PQR University'].map((college, i) => (
                <div key={college} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{college}</span>
                  <span className="text-success font-bold">{95 - i * 3}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 card-gradient border-2 hover-lift">
            <h4 className="font-semibold mb-4 text-lg">Top Hiring Companies</h4>
            <div className="space-y-3">
              {['FinCorp', 'WebWorks', 'TechFlow'].map((company, i) => (
                <div key={company} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{company}</span>
                  <span className="text-primary font-bold">{45 - i * 8} interns</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 card-gradient border-2 hover-lift">
            <h4 className="font-semibold mb-4 text-lg">Trending Skills</h4>
            <div className="space-y-3">
              {['AI/ML', 'Cloud Computing', 'Blockchain'].map((skill, i) => (
                <div key={skill} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{skill}</span>
                  <span className="text-accent font-bold">+{42 - i * 8}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAnalytics;
