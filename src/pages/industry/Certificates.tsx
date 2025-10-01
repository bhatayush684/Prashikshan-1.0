import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import IndustrySidebar from '@/components/industry/IndustrySidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Shield, Download, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const IndustryCertificates = () => {
  const [completedInterns, setCompletedInterns] = useState<Array<{ id: number; name: string; role: string; duration: string; certified: boolean; rating: number; completionDate: string; achievements: string[] }>>([]);

  const fetchCertificates = async () => {
    const res = await fetch('/api/industry/certificates');
    const data = await res.json();
    setCompletedInterns(data);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleIssueCertificate = async (name: string, id: number) => {
    await fetch('/api/industry/certificates/issue', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchCertificates();
    toast.success(
      <div className="flex items-start gap-3">
        <Award className="h-5 w-5 text-gold mt-0.5" />
        <div>
          <p className="font-semibold">Certificate Issued!</p>
          <p className="text-sm text-muted-foreground">Blockchain verification in progress for {name}</p>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout sidebar={<IndustrySidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gradient-primary">Internship Certificates</h1>
            <p className="text-muted-foreground text-lg">Issue blockchain-verified completion certificates</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-gold rounded-lg shadow-glow-gold">
            <Shield className="h-5 w-5 text-gold-foreground" />
            <span className="font-semibold text-gold-foreground">Blockchain Secured</span>
          </div>
        </div>

        <div className="space-y-4">
          {completedInterns.map((intern, index) => (
            <Card 
              key={intern.id} 
              className="p-6 card-gradient border-2 hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-md flex-shrink-0">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{intern.name}</h3>
                          <p className="text-muted-foreground font-medium">{intern.role}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-2xl font-bold text-gold">★</span>
                            <span className="text-xl font-bold">{intern.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          Duration: {intern.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Completed: {intern.completionDate}
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Key Achievements:</p>
                        <div className="flex flex-wrap gap-2">
                          {intern.achievements.map((achievement, i) => (
                            <Badge key={i} className="bg-success/10 text-success border-success/20 text-xs">
                              ✓ {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {intern.certified && (
                        <div className="flex items-center gap-2 p-3 bg-gradient-gold/10 border-2 border-gold/20 rounded-lg mb-4">
                          <Shield className="h-5 w-5 text-gold" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">Blockchain Verified Certificate</p>
                            <p className="text-xs text-muted-foreground">Certificate ID: #CERT{intern.id}2025{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {intern.certified ? (
                  <>
                    <Button className="flex-1 bg-gradient-primary hover:shadow-glow">
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificate
                    </Button>
                    <Button variant="outline" className="hover-scale">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Blockchain
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="flex-1 bg-gradient-gold hover:shadow-glow-gold"
                    onClick={() => handleIssueCertificate(intern.name, intern.id)}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Issue Blockchain Certificate
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-gold/5 border-2">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-glow-gold flex-shrink-0">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">About Blockchain Certificates</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Our blockchain-verified certificates provide tamper-proof, instantly verifiable credentials that employers can trust. 
                Each certificate is assigned a unique ID and stored on the blockchain, ensuring authenticity and preventing fraud.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Secure & Tamper-Proof</p>
                    <p className="text-xs text-muted-foreground">Blockchain-secured records</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Instant Verification</p>
                    <p className="text-xs text-muted-foreground">Verify in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ExternalLink className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Globally Recognized</p>
                    <p className="text-xs text-muted-foreground">Accepted worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default IndustryCertificates;
