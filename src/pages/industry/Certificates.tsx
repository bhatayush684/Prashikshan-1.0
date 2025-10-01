import DashboardLayout from '@/components/DashboardLayout';
import IndustrySidebar from '@/components/industry/IndustrySidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Shield } from 'lucide-react';
import { toast } from 'sonner';

const IndustryCertificates = () => {
  const completedInterns = [
    { id: 1, name: 'Sneha Patel', role: 'Backend Developer Intern', duration: '6 months', certified: true },
    { id: 2, name: 'Rohit Verma', role: 'Cloud Engineer Intern', duration: '4 months', certified: false },
  ];

  const handleIssueCertificate = () => {
    toast.success('Certificate issued and blockchain verified!');
  };

  return (
    <DashboardLayout sidebar={<IndustrySidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Certificates</h1>
          <p className="text-muted-foreground">Issue completion certificates to interns</p>
        </div>

        <div className="space-y-4">
          {completedInterns.map((intern) => (
            <Card key={intern.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{intern.name}</h3>
                      <p className="text-sm text-muted-foreground">{intern.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">Duration: {intern.duration}</p>
                      
                      {intern.certified && (
                        <Badge className="mt-2 flex items-center gap-1 w-fit" variant="outline">
                          <Shield className="h-3 w-3" />
                          Blockchain Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  {intern.certified ? (
                    <Badge variant="default">Certified</Badge>
                  ) : (
                    <Button onClick={handleIssueCertificate}>
                      Issue Certificate
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IndustryCertificates;
