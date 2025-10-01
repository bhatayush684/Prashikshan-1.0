import DashboardLayout from '@/components/DashboardLayout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { School } from 'lucide-react';

const AdminColleges = () => {
  const colleges = [
    { id: 1, name: 'XYZ Govt College', students: 120, activeInternships: 85, location: 'Delhi' },
    { id: 2, name: 'ABC Skill Center', students: 80, activeInternships: 62, location: 'Mumbai' },
    { id: 3, name: 'PQR University', students: 200, activeInternships: 145, location: 'Bangalore' },
    { id: 4, name: 'LMN Institute', students: 95, activeInternships: 71, location: 'Pune' },
  ];

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">College Management</h1>
          <p className="text-muted-foreground">Overview of registered educational institutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <Card key={college.id} className="p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{college.name}</h3>
                  <Badge variant="secondary">{college.location}</Badge>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <School className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Students</span>
                  <span className="font-medium">{college.students}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Internships</span>
                  <span className="font-medium text-success">{college.activeInternships}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Engagement Rate</span>
                  <span className="font-medium text-primary">
                    {Math.round((college.activeInternships / college.students) * 100)}%
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminColleges;
