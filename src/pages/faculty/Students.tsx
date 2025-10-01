import DashboardLayout from '@/components/DashboardLayout';
import FacultySidebar from '@/components/faculty/FacultySidebar';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const FacultyStudents = () => {
  const students = [
    { id: 1, name: 'Ayush Sharma', internship: 'Data Analyst @ FinCorp', status: 'Ongoing', progress: 50 },
    { id: 2, name: 'Priya Mehta', internship: 'Frontend Developer @ WebWorks', status: 'Ongoing', progress: 75 },
    { id: 3, name: 'Rahul Singh', internship: 'Marketing @ BrandX', status: 'Pending', progress: 0 },
    { id: 4, name: 'Sneha Patel', internship: 'Backend Developer @ TechFlow', status: 'Completed', progress: 100 },
  ];

  return (
    <DashboardLayout sidebar={<FacultySidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Student Management</h1>
          <p className="text-muted-foreground">Monitor and track student internship progress</p>
        </div>

        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Student Name</th>
                  <th className="text-left p-3 font-semibold">Internship</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{student.name}</td>
                    <td className="p-3 text-sm text-muted-foreground">{student.internship}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          student.status === 'Completed'
                            ? 'default'
                            : student.status === 'Ongoing'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Progress value={student.progress} className="flex-1 h-2" />
                        <span className="text-sm text-muted-foreground w-12">{student.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Total Students</h3>
            <p className="text-3xl font-bold text-primary">24</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Active Internships</h3>
            <p className="text-3xl font-bold text-success">18</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-accent">87%</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyStudents;
