import DashboardLayout from '@/components/DashboardLayout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';

const AdminIndustries = () => {
  const industries = [
    { id: 1, name: 'FinCorp', sector: 'Finance', internships: 15, active: 12 },
    { id: 2, name: 'WebWorks', sector: 'IT', internships: 22, active: 18 },
    { id: 3, name: 'BrandX', sector: 'Marketing', internships: 8, active: 6 },
    { id: 4, name: 'TechFlow', sector: 'IT', internships: 18, active: 14 },
    { id: 5, name: 'DataCorp', sector: 'Analytics', internships: 12, active: 10 },
  ];

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Industry Partners</h1>
          <p className="text-muted-foreground">Overview of registered industry partners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <Card key={industry.id} className="p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{industry.name}</h3>
                  <Badge variant="secondary">{industry.sector}</Badge>
                </div>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-accent" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Internships</span>
                  <span className="font-medium">{industry.internships}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Now</span>
                  <span className="font-medium text-success">{industry.active}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fill Rate</span>
                  <span className="font-medium text-primary">
                    {Math.round((industry.active / industry.internships) * 100)}%
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

export default AdminIndustries;
