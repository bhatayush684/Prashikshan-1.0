import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import IndustrySidebar from '@/components/industry/IndustrySidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const IndustryPostInternship = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    mode: '',
    skills: '',
  });
  const [posted, setPosted] = useState<Array<{ id: number; title: string; description: string; duration: string; mode: string; skills: string[] }>>([]);

  const fetchPosted = async () => {
    const res = await fetch('/api/industry/posted');
    const data = await res.json();
    setPosted(data);
  };

  useEffect(() => {
    fetchPosted();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      mode: formData.mode,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
    };
    await fetch('/api/industry/posted', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    toast.success('Internship posted successfully!');
    setFormData({ title: '', description: '', duration: '', mode: '', skills: '' });
    fetchPosted();
  };

  return (
    <DashboardLayout sidebar={<IndustrySidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Post New Internship</h1>
          <p className="text-muted-foreground">Create internship opportunities for students</p>
        </div>

        <Card className="p-6 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Internship Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Data Analyst Intern"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the internship role and responsibilities..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 3 months"
                  required
                />
              </div>

              <div>
                <Label htmlFor="mode">Mode</Label>
                <Select value={formData.mode} onValueChange={(value) => setFormData({ ...formData, mode: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="onsite">Onsite</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="skills">Required Skills (comma separated)</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="e.g., Python, SQL, Data Analysis"
                required
              />
            </div>

            <Button type="submit" className="w-full">Post Internship</Button>
          </form>
        </Card>

        {posted.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Posted Internships</h2>
            {posted.map(p => (
              <Card key={p.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.skills.map((s, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-muted rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{p.duration} • {p.mode}</div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default IndustryPostInternship;
