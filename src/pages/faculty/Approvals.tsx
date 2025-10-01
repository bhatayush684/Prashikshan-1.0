import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import FacultySidebar from '@/components/faculty/FacultySidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Request {
  id: number;
  studentName: string;
  internship: string;
  company: string;
  status: 'pending' | 'approved' | 'rejected';
}

const FacultyApprovals = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  const MOCK_REQUESTS: Request[] = [
    { id: 1, studentName: 'Ayush Bhatt', internship: 'Data Analyst Intern', company: 'FinCorp', status: 'pending' },
    { id: 2, studentName: 'Neha Sharma', internship: 'Frontend Developer Intern', company: 'WebWorks', status: 'approved' },
    { id: 3, studentName: 'Rohit Kumar', internship: 'Marketing Intern', company: 'BrandX', status: 'rejected' },
  ];

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/faculty/approvals');
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
      if (!import.meta.env.PROD) {
        toast.error('API unavailable. Showing demo approvals.');
      }
      setRequests(MOCK_REQUESTS);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      const res = await fetch('/api/faculty/approvals/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'approved' }) });
      if (!res.ok) throw new Error(String(res.status));
      toast.success('Internship request approved!');
      fetchRequests();
    } catch (err) {
      console.error(err);
      if (!import.meta.env.PROD) {
        toast.error('Could not approve. Demo data shown.');
      }
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } as Request : r));
    }
  };

  const handleReject = async (id: number) => {
    try {
      const res = await fetch('/api/faculty/approvals/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'rejected' }) });
      if (!res.ok) throw new Error(String(res.status));
      toast.error('Internship request rejected');
      fetchRequests();
    } catch (err) {
      console.error(err);
      if (!import.meta.env.PROD) {
        toast.error('Could not reject. Demo data shown.');
      }
      setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } as Request : r));
    }
  };

  return (
    <DashboardLayout sidebar={<FacultySidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Internship Approvals</h1>
          <p className="text-muted-foreground">Review and approve student internship requests</p>
        </div>

        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{request.studentName}</h3>
                  <p className="text-primary font-medium mb-1">{request.internship}</p>
                  <p className="text-sm text-muted-foreground mb-3">{request.company}</p>
                  
                  {request.status !== 'pending' && (
                    <Badge variant={request.status === 'approved' ? 'default' : 'destructive'}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  )}
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApprove(request.id)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(request.id)}
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <XCircle className="h-4 w-4" />
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

export default FacultyApprovals;
