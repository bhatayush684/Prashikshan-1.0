import DashboardLayout from '@/components/DashboardLayout';
import StudentSidebar from '@/components/student/StudentSidebar';
import StatCard from '@/components/StatCard';
import { Briefcase, Clock, Award, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const StudentDashboard = () => {
  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Ayush!</h1>
          <p className="text-muted-foreground">Here's your internship journey overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Applied Internships" value="5" icon={Briefcase} gradient />
          <StatCard title="Ongoing Internship" value="1" icon={Clock} gradient />
          <StatCard title="Credits Earned" value="12" icon={Award} gradient />
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Current Internship Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Data Analyst Intern @ FinCorp</span>
                <span className="text-sm text-muted-foreground">Week 6 of 12</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">8</p>
                <p className="text-xs text-muted-foreground">Tasks Completed</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">4</p>
                <p className="text-xs text-muted-foreground">Reports Submitted</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground">Skills Learned</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-success">95%</p>
                <p className="text-xs text-muted-foreground">Attendance</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Tasks</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Submit weekly logbook entry</p>
                  <p className="text-xs text-muted-foreground">Due: Today</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Complete Python module</p>
                  <p className="text-xs text-muted-foreground">Due: Tomorrow</p>
                </div>
              </li>
              <li className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Mentor meeting</p>
                  <p className="text-xs text-muted-foreground">Due: Friday</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Applied to Marketing Intern</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">Completed SQL certification</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Mentor session completed</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
