import { useEffect, useState } from 'react';
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
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const fetchApplicants = async () => {
    const res = await fetch('/api/industry/applicants');
    const data = await res.json();
    setApplicants(data);
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleShortlist = async (id: number) => {
    await fetch('/api/industry/applicants/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'shortlisted' }) });
    toast.success('Applicant shortlisted!');
    fetchApplicants();
  };

  const handleReject = async (id: number) => {
    await fetch('/api/industry/applicants/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'rejected' }) });
    toast.error('Applicant rejected');
    fetchApplicants();
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
