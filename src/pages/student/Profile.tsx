import DashboardLayout from '@/components/DashboardLayout';
import StudentSidebar from '@/components/student/StudentSidebar';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Award } from 'lucide-react';

const StudentProfile = () => {
  const skills = ['Python', 'SQL', 'React', 'Data Analysis', 'Machine Learning', 'Excel'];
  
  const internshipHistory = [
    {
      id: 1,
      title: 'Data Analyst Intern',
      company: 'FinCorp',
      duration: 'Current',
      status: 'Ongoing',
    },
    {
      id: 2,
      title: 'Web Development Intern',
      company: 'TechStart',
      duration: 'Jan 2025 - Mar 2025',
      status: 'Completed',
    },
  ];

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and view your progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarFallback className="text-4xl bg-primary/10 text-primary">AS</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-1">Ayush Sharma</h2>
              <p className="text-muted-foreground mb-4">Computer Science Student</p>
              
              <div className="w-full space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>ayush.sharma@university.edu</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-muted-foreground">
                Third-year Computer Science student passionate about data analytics and machine learning. 
                Seeking opportunities to apply my skills in real-world projects and learn from industry experts.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Academic Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Institution</span>
                  <span className="font-medium">XYZ Govt College</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Program</span>
                  <span className="font-medium">B.Tech Computer Science</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium">Third Year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CGPA</span>
                  <span className="font-medium">8.5 / 10</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Internship History
          </h3>
          <div className="space-y-4">
            {internshipHistory.map((internship) => (
              <div key={internship.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-semibold">{internship.title}</h4>
                  <p className="text-sm text-muted-foreground">{internship.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{internship.duration}</p>
                </div>
                <Badge variant={internship.status === 'Ongoing' ? 'default' : 'secondary'}>
                  {internship.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
