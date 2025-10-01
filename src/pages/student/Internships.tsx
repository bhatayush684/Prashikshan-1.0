import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StudentSidebar from '@/components/student/StudentSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Briefcase, DollarSign, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface Internship {
  id: number;
  title: string;
  company: string;
  duration: string;
  mode: string;
  stipend: string;
  skills: string[];
  applied: boolean;
  spots: number;
  applicants: number;
  difficulty: string;
}

const StudentInternships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [internships, setInternships] = useState<Internship[]>([
    {
      id: 1,
      title: 'Data Analyst Intern',
      company: 'FinCorp',
      duration: '3 months',
      mode: 'Remote',
      stipend: '₹15,000/month',
      skills: ['Python', 'SQL', 'Excel', 'Data Visualization'],
      applied: true,
      spots: 5,
      applicants: 28,
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'Frontend Developer Intern',
      company: 'WebWorks',
      duration: '6 months',
      mode: 'Onsite - Bangalore',
      stipend: '₹20,000/month',
      skills: ['React', 'TypeScript', 'CSS', 'Tailwind'],
      applied: false,
      spots: 3,
      applicants: 45,
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Marketing Intern',
      company: 'BrandX',
      duration: '4 months',
      mode: 'Remote',
      stipend: '₹12,000/month',
      skills: ['Social Media', 'Content Writing', 'SEO', 'Analytics'],
      applied: false,
      spots: 4,
      applicants: 32,
      difficulty: 'Beginner'
    },
    {
      id: 4,
      title: 'Backend Developer Intern',
      company: 'TechFlow',
      duration: '6 months',
      mode: 'Hybrid - Delhi',
      stipend: '₹18,000/month',
      skills: ['Node.js', 'MongoDB', 'REST API', 'Docker'],
      applied: false,
      spots: 2,
      applicants: 56,
      difficulty: 'Advanced'
    },
    {
      id: 5,
      title: 'UI/UX Designer Intern',
      company: 'DesignHub',
      duration: '4 months',
      mode: 'Remote',
      stipend: '₹16,000/month',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      applied: false,
      spots: 3,
      applicants: 38,
      difficulty: 'Intermediate'
    },
    {
      id: 6,
      title: 'HR Intern',
      company: 'PeopleFirst',
      duration: '3 months',
      mode: 'Onsite - Mumbai',
      stipend: '₹10,000/month',
      skills: ['Recruitment', 'Communication', 'MS Office', 'HR Operations'],
      applied: false,
      spots: 5,
      applicants: 24,
      difficulty: 'Beginner'
    },
  ]);

  const handleApply = (id: number) => {
    setInternships(prev =>
      prev.map(internship =>
        internship.id === id ? { ...internship, applied: true, applicants: internship.applicants + 1 } : internship
      )
    );
    toast.success('Application submitted successfully! You\'ll hear back within 7 days.');
  };

  const filteredInternships = internships.filter(internship =>
    internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/10 text-success border-success/20';
      case 'Intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gradient-primary">Available Internships</h1>
            <p className="text-muted-foreground text-lg">Browse and apply to internship opportunities</p>
          </div>
          <Badge className="bg-gradient-primary text-lg px-4 py-2">{filteredInternships.length} Available</Badge>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by title, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base border-2"
          />
          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInternships.map((internship, index) => (
            <Card 
              key={internship.id} 
              className="p-6 hover-lift border-2 card-gradient"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{internship.title}</h3>
                  <p className="text-primary font-semibold text-lg">{internship.company}</p>
                </div>
                <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
                  <Briefcase className="h-7 w-7 text-white" />
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{internship.mode}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-success">{internship.stipend}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{internship.applicants} applicants • {internship.spots} spots</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">Required Skills:</p>
                  <Badge className={`${getDifficultyColor(internship.difficulty)} border`}>
                    {internship.difficulty}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className={`flex-1 ${internship.applied ? '' : 'bg-gradient-primary hover:shadow-glow'}`}
                  disabled={internship.applied}
                  onClick={() => handleApply(internship.id)}
                  variant={internship.applied ? 'outline' : 'default'}
                >
                  {internship.applied ? '✓ Applied' : 'Apply Now'}
                </Button>
                <Button variant="outline" size="icon" className="hover-scale">
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentInternships;
