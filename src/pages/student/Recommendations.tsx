import DashboardLayout from '@/components/DashboardLayout';
import StudentSidebar from '@/components/student/StudentSidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

interface Recommendation {
  id: number;
  title: string;
  company: string;
  match: number;
  reason: string;
  skills: string[];
  applied?: boolean;
}

const StudentRecommendations = () => {
  const { user } = useAuth();
  // Move recommendations above first use to avoid temporal dead zone runtime error
  const recommendations: Recommendation[] = [
    {
      id: 1,
      title: 'UI/UX Designer Intern',
      company: 'DesignHub',
      match: 92,
      reason: 'Strong match with your design skills and portfolio',
      skills: ['Figma', 'Adobe XD', 'User Research'],
    },
    {
      id: 2,
      title: 'Machine Learning Intern',
      company: 'AI Labs',
      match: 85,
      reason: 'Your Python and data science skills align perfectly',
      skills: ['Python', 'TensorFlow', 'Data Analysis'],
    },
    {
      id: 3,
      title: 'Full Stack Developer Intern',
      company: 'StartupXYZ',
      match: 78,
      reason: 'Your web development experience is a great fit',
      skills: ['React', 'Node.js', 'MongoDB'],
    },
  ];

  const [recs, setRecs] = useState<Recommendation[]>(recommendations);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/student/recommendations');
        if (!res.ok) throw new Error(`Failed to load recommendations: ${res.status}`);
        const data = await res.json();
        setRecs(data);
      } catch (err) {
        console.error(err);
        if (!import.meta.env.PROD) {
          toast.error('Unable to load recommendations. Showing defaults.');
        }
        setRecs(recommendations);
      }
    })();
  }, []);

  const skillGaps = [
    { skill: 'Advanced SQL', importance: 'High', courses: 3 },
    { skill: 'Cloud Computing (AWS)', importance: 'Medium', courses: 5 },
    { skill: 'Docker & Kubernetes', importance: 'Medium', courses: 4 },
  ];

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-accent" />
            AI-Powered Recommendations
          </h1>
          <p className="text-muted-foreground">
            Personalized internship suggestions based on your profile
          </p>
        </div>

        <Card className="p-6 bg-gradient-card">
          <h3 className="text-lg font-semibold mb-4">Top Matches For You</h3>
          <div className="space-y-4">
            {recs.map((rec) => (
              <Card key={rec.id} className="p-4 border-2">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">{rec.title}</h4>
                    <p className="text-primary font-medium">{rec.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-success">{rec.match}%</div>
                    <p className="text-xs text-muted-foreground">Match</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                  {rec.reason}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {rec.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full"
                  disabled={rec.applied}
                  onClick={async () => {
                    try {
                      const applyRes = await fetch('/api/student/recommendations/apply', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: rec.id })
                      });
                      if (!applyRes.ok) throw new Error(`Apply failed: ${applyRes.status}`);
                      toast.success(`${user?.name || 'You'} applied to ${rec.title} at ${rec.company}`);
                      const res = await fetch('/api/student/recommendations');
                      if (!res.ok) throw new Error(`Reload failed: ${res.status}`);
                      const data = await res.json();
                      setRecs(data);
                    } catch (err) {
                      console.error(err);
                      if (!import.meta.env.PROD) {
                        toast.error('Action failed. Please try again.');
                      }
                    }
                  }}
                  variant={rec.applied ? 'outline' : 'default'}
                >
                  {rec.applied ? '✓ Applied' : 'Apply Now'}
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Skill Gap Analysis</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enhance these skills to unlock more opportunities
          </p>
          <div className="space-y-3">
            {skillGaps.map((gap) => (
              <div
                key={gap.skill}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{gap.skill}</p>
                  <p className="text-sm text-muted-foreground">
                    {gap.courses} recommended courses
                  </p>
                </div>
                <Badge
                  variant={gap.importance === 'High' ? 'default' : 'secondary'}
                >
                  {gap.importance} Priority
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentRecommendations;
