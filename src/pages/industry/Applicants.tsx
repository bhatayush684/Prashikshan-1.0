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

  const MOCK_APPLICANTS: Applicant[] = [
    { id: 1, name: 'Ananya Verma', skills: ['React', 'TypeScript'], status: 'pending', internship: 'Frontend Developer Intern' },
    { id: 2, name: 'Karan Mehta', skills: ['Python', 'SQL'], status: 'shortlisted', internship: 'Data Analyst Intern' },
    { id: 3, name: 'Priya Singh', skills: ['Design', 'Figma'], status: 'rejected', internship: 'UI/UX Designer Intern' },
  ];

  const fetchApplicants = async () => {
    try {
      const res = await fetch('/api/industry/applicants');
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setApplicants(data);
    } catch (err) {
      console.error(err);
      if (!import.meta.env.PROD) {
        toast.error('API unavailable. Showing demo applicants.');
      }
      setApplicants(MOCK_APPLICANTS);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleShortlist = async (id: number) => {
    try {
      const res = await fetch('/api/industry/applicants/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'shortlisted' }) });
      if (!res.ok) throw new Error(String(res.status));
      toast.success('Applicant shortlisted!');
      fetchApplicants();
    } catch (err) {
      console.error(err);
      if (!import.meta.env.PROD) {
        toast.success('Applicant shortlisted (demo)');
      }
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: 'shortlisted' } : a));
    }
  };

  const handleReject = async (id: number) => {
    try {
      const res = await fetch('/api/industry/applicants/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'rejected' }) });
      if (!res.ok) throw new Error(String(res.status));
      toast.error('Applicant rejected');
      fetchApplicants();
    } catch (err) {
      console.error(err);
      if (!import.meta.env.PROD) {
        toast.error('Applicant rejected (demo)');
      }
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a));
    }
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
