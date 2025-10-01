import DashboardLayout from '@/components/DashboardLayout';
import StudentSidebar from '@/components/student/StudentSidebar';
import StatCard from '@/components/StatCard';
import { Briefcase, Clock, Award, Users, TrendingUp, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const StudentDashboard = () => {
  const upcomingTasks = [
    { id: 1, title: 'Submit weekly logbook entry', due: 'Today', priority: 'high', icon: Clock },
    { id: 2, title: 'Complete Python module assessment', due: 'Tomorrow', priority: 'medium', icon: Target },
    { id: 3, title: 'Mentor meeting scheduled', due: 'Friday, 3:00 PM', priority: 'medium', icon: Users },
    { id: 4, title: 'Mid-term project presentation', due: 'Next Week', priority: 'high', icon: TrendingUp },
  ];

  const recentActivity = [
    { id: 1, action: 'Applied to Marketing Intern position', company: 'BrandX', time: '2 hours ago', type: 'application' },
    { id: 2, action: 'Completed SQL certification', badge: 'Advanced SQL', time: '1 day ago', type: 'achievement' },
    { id: 3, action: 'Mentor session completed', topic: 'Career guidance', time: '3 days ago', type: 'mentorship' },
    { id: 4, action: 'Logbook entry approved', week: 'Week 5', time: '5 days ago', type: 'approval' },
  ];

  const skillProgress = [
    { skill: 'Python', progress: 85, level: 'Advanced' },
    { skill: 'Data Analysis', progress: 78, level: 'Intermediate' },
    { skill: 'SQL', progress: 92, level: 'Advanced' },
    { skill: 'Machine Learning', progress: 65, level: 'Intermediate' },
  ];

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gradient-primary">Welcome back, Ayush!</h1>
            <p className="text-muted-foreground text-lg">Here's your internship journey overview</p>
          </div>
          <Avatar className="h-16 w-16 border-4 border-primary/20">
            <AvatarFallback className="text-xl bg-gradient-primary text-white">AS</AvatarFallback>
          </Avatar>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Applied Internships" 
            value="7" 
            icon={Briefcase} 
            gradient 
            trend={{ value: '+2 this week', isPositive: true }}
          />
          <StatCard 
            title="Ongoing Internship" 
            value="1" 
            icon={Clock} 
            gradient 
            trend={{ value: '50% complete', isPositive: true }}
          />
          <StatCard 
            title="NEP Credits Earned" 
            value="15" 
            icon={Award} 
            gradient 
            trend={{ value: '+3 this month', isPositive: true }}
          />
        </div>

        {/* Current Internship Progress */}
        <Card className="p-8 card-gradient hover-lift border-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Current Internship Progress</h3>
              <p className="text-muted-foreground">Data Analyst Intern @ FinCorp</p>
            </div>
            <Badge className="bg-success text-success-foreground text-sm px-4 py-2">Active</Badge>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-lg">Overall Progress</span>
                <span className="text-muted-foreground font-medium">Week 6 of 12</span>
              </div>
              <Progress value={50} className="h-3 bg-muted" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border hover-lift">
              <p className="text-3xl font-bold text-gradient-primary mb-1">12</p>
              <p className="text-xs text-muted-foreground font-medium">Tasks Completed</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-success/10 to-emerald-500/10 rounded-xl border hover-lift">
              <p className="text-3xl font-bold text-success mb-1">6</p>
              <p className="text-xs text-muted-foreground font-medium">Reports Submitted</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-xl border hover-lift">
              <p className="text-3xl font-bold text-accent mb-1">18</p>
              <p className="text-xs text-muted-foreground font-medium">Skills Learned</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-gold/10 to-yellow-500/10 rounded-xl border hover-lift">
              <p className="text-3xl font-bold text-gold mb-1">97%</p>
              <p className="text-xs text-muted-foreground font-medium">Attendance</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Tasks */}
          <Card className="p-6 card-gradient border-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Upcoming Tasks</h3>
              <Badge variant="outline" className="text-xs">4 pending</Badge>
            </div>
            <ul className="space-y-3">
              {upcomingTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-3 p-4 bg-card rounded-lg border hover-lift cursor-pointer group">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    task.priority === 'high' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                  }`}>
                    <task.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:text-primary transition-colors">{task.title}</p>
                    <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${task.priority === 'high' ? 'bg-destructive' : 'bg-warning'}`} />
                </li>
              ))}
            </ul>
          </Card>

          {/* Recent Activities */}
          <Card className="p-6 card-gradient border-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recent Activities</h3>
              <Badge variant="outline" className="text-xs">This week</Badge>
            </div>
            <ul className="space-y-4">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-start gap-3 group">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'achievement' ? 'bg-gradient-gold' :
                    activity.type === 'approval' ? 'bg-gradient-secondary' :
                    activity.type === 'mentorship' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                    'bg-gradient-primary'
                  } shadow-md`}>
                    {activity.type === 'application' && <Briefcase className="h-5 w-5 text-white" />}
                    {activity.type === 'achievement' && <Award className="h-5 w-5 text-white" />}
                    {activity.type === 'mentorship' && <Users className="h-5 w-5 text-white" />}
                    {activity.type === 'approval' && <TrendingUp className="h-5 w-5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:text-primary transition-colors">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Skill Progress */}
        <Card className="p-8 card-gradient border-2">
          <h3 className="text-xl font-bold mb-6">Skill Development Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillProgress.map((item) => (
              <div key={item.skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.skill}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">{item.level}</Badge>
                    <span className="text-sm text-muted-foreground font-medium">{item.progress}%</span>
                  </div>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
