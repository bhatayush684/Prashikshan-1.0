import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StudentSidebar from '@/components/student/StudentSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

interface Internship {
  id: number;
  title: string;
  company: string;
  duration: string;
  mode: string;
  skills: string[];
  applied: boolean;
}

const StudentInternships = () => {
  const [internships, setInternships] = useState<Internship[]>([
    {
      id: 1,
      title: 'Data Analyst Intern',
      company: 'FinCorp',
      duration: '3 months',
      mode: 'Remote',
      skills: ['Python', 'SQL', 'Excel'],
      applied: true,
    },
    {
      id: 2,
      title: 'Frontend Developer Intern',
      company: 'WebWorks',
      duration: '6 months',
      mode: 'Onsite',
      skills: ['React', 'CSS', 'JavaScript'],
      applied: false,
    },
    {
      id: 3,
      title: 'Marketing Intern',
      company: 'BrandX',
      duration: '4 months',
      mode: 'Remote',
      skills: ['Social Media', 'Content Writing', 'SEO'],
      applied: false,
    },
    {
      id: 4,
      title: 'Backend Developer Intern',
      company: 'TechFlow',
      duration: '6 months',
      mode: 'Hybrid',
      skills: ['Node.js', 'MongoDB', 'REST API'],
      applied: false,
    },
  ]);

  const handleApply = (id: number) => {
    setInternships(prev =>
      prev.map(internship =>
        internship.id === id ? { ...internship, applied: true } : internship
      )
    );
    toast.success('Application submitted successfully!');
  };

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Available Internships</h1>
          <p className="text-muted-foreground">Browse and apply to internship opportunities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internships.map((internship) => (
            <Card key={internship.id} className="p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{internship.title}</h3>
                  <p className="text-primary font-medium">{internship.company}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{internship.mode}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Required Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                disabled={internship.applied}
                onClick={() => handleApply(internship.id)}
                variant={internship.applied ? 'outline' : 'default'}
              >
                {internship.applied ? 'Applied' : 'Apply Now'}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentInternships;
