import { useState } from 'react';
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
  const [requests, setRequests] = useState<Request[]>([
    { id: 1, studentName: 'Ankit Kumar', internship: 'Data Scientist Intern', company: 'DataCorp', status: 'pending' },
    { id: 2, studentName: 'Neha Gupta', internship: 'UI/UX Designer', company: 'DesignHub', status: 'pending' },
    { id: 3, studentName: 'Rohit Verma', internship: 'Cloud Engineer', company: 'CloudTech', status: 'pending' },
  ]);

  const handleApprove = (id: number) => {
    setRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: 'approved' as const } : req)
    );
    toast.success('Internship request approved!');
  };

  const handleReject = (id: number) => {
    setRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: 'rejected' as const } : req)
    );
    toast.error('Internship request rejected');
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
