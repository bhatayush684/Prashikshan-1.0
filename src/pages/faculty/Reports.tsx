import DashboardLayout from '@/components/DashboardLayout';
import FacultySidebar from '@/components/faculty/FacultySidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const FacultyReports = () => {
  const reports = [
    { id: 1, student: 'Ayush Sharma', internship: 'Data Analyst @ FinCorp', status: 'Completed', credits: null },
    { id: 2, student: 'Priya Mehta', internship: 'Frontend Developer @ WebWorks', status: 'In Progress', credits: null },
    { id: 3, student: 'Sneha Patel', internship: 'Backend Developer @ TechFlow', status: 'Completed', credits: 15 },
  ];

  const handleExport = () => {
    toast.success('Report exported successfully!');
  };

  const handleAssignCredits = () => {
    toast.success('NEP credits assigned!');
  };

  return (
    <DashboardLayout sidebar={<FacultySidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Student Reports</h1>
          <p className="text-muted-foreground">Generate reports and assign NEP credits</p>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{report.student}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{report.internship}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={report.status === 'Completed' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                    {report.credits && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {report.credits} NEP Credits
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {report.status === 'Completed' && !report.credits && (
                    <Select onValueChange={handleAssignCredits}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Credits" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 Credits</SelectItem>
                        <SelectItem value="15">15 Credits</SelectItem>
                        <SelectItem value="20">20 Credits</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <Button onClick={handleExport} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyReports;
