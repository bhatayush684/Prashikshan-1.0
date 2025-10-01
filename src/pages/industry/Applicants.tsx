import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import IndustrySidebar from '@/components/industry/IndustrySidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Applicant {
  id: number;
  name: string;
  skills: string[];
  status: 'pending' | 'shortlisted' | 'rejected';
  internship: string;
}

const IndustryApplicants = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    { id: 1, name: 'Ayush Sharma', skills: ['Python', 'SQL', 'Excel'], status: 'pending', internship: 'Data Analyst Intern' },
    { id: 2, name: 'Priya Mehta', skills: ['React', 'CSS', 'JavaScript'], status: 'pending', internship: 'Frontend Developer' },
    { id: 3, name: 'Rahul Singh', skills: ['Social Media', 'Content Writing'], status: 'shortlisted', internship: 'Marketing Intern' },
  ]);

  const handleShortlist = (id: number) => {
    setApplicants(prev =>
      prev.map(app => app.id === id ? { ...app, status: 'shortlisted' as const } : app)
    );
    toast.success('Applicant shortlisted!');
  };

  const handleReject = (id: number) => {
    setApplicants(prev =>
      prev.map(app => app.id === id ? { ...app, status: 'rejected' as const } : app)
    );
    toast.error('Applicant rejected');
  };

  return (
    <DashboardLayout sidebar={<IndustrySidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Internship Applicants</h1>
          <p className="text-muted-foreground">Review and manage student applications</p>
        </div>

        <div className="space-y-4">
          {applicants.map((applicant) => (
            <Card key={applicant.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{applicant.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{applicant.internship}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {applicant.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Badge
                    variant={
                      applicant.status === 'shortlisted'
                        ? 'default'
                        : applicant.status === 'rejected'
                        ? 'destructive'
                        : 'outline'
                    }
                  >
                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                  </Badge>
                </div>

                {applicant.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button onClick={() => handleShortlist(applicant.id)}>
                      Shortlist
                    </Button>
                    <Button
                      onClick={() => handleReject(applicant.id)}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IndustryApplicants;
