import DashboardLayout from '@/components/DashboardLayout';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

const AdminSkillGaps = () => {
  const skillGaps = [
    { id: 1, skill: 'Advanced SQL', demand: 'High', students: 234, gap: 45, courses: 8 },
    { id: 2, skill: 'Cloud Computing (AWS)', demand: 'High', students: 189, gap: 38, courses: 12 },
    { id: 3, skill: 'Machine Learning', demand: 'Medium', students: 156, gap: 32, courses: 15 },
    { id: 4, skill: 'Docker & Kubernetes', demand: 'Medium', students: 98, gap: 28, courses: 6 },
    { id: 5, skill: 'Cybersecurity', demand: 'High', students: 145, gap: 42, courses: 9 },
  ];

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Skill Gap Analysis</h1>
          <p className="text-muted-foreground">Identify missing skills and training opportunities</p>
        </div>

        <Card className="p-6 bg-gradient-card">
          <div className="flex items-start gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-accent" />
            <div>
              <h3 className="text-lg font-semibold mb-1">Market Insights</h3>
              <p className="text-sm text-muted-foreground">
                Based on industry demand and student skill profiles, these are the top skill gaps to address
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {skillGaps.map((gap) => (
              <Card key={gap.id} className="p-4 border-2">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">{gap.skill}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={gap.demand === 'High' ? 'default' : 'secondary'}>
                        {gap.demand} Demand
                      </Badge>
                      <Badge variant="outline">
                        {gap.gap}% Skill Gap
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-2xl font-bold text-primary">{gap.students}</p>
                    <p className="text-xs text-muted-foreground">Students Need This</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-2xl font-bold text-accent">{gap.courses}</p>
                    <p className="text-xs text-muted-foreground">Training Modules</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-2xl font-bold text-success">{100 - gap.gap}%</p>
                    <p className="text-xs text-muted-foreground">Market Ready</p>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Suggest Training Programs
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSkillGaps;
