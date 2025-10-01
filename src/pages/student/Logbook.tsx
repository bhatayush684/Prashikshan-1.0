import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StudentSidebar from '@/components/student/StudentSidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Download, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface LogEntry {
  id: number;
  date: string;
  tasks: string;
  learning: string;
}

const StudentLogbook = () => {
  const [entries, setEntries] = useState<LogEntry[]>([
    {
      id: 1,
      date: '2025-09-22',
      tasks: 'Completed data cleaning module, Created visualization dashboard',
      learning: 'Learned advanced pandas techniques for handling missing data',
    },
    {
      id: 2,
      date: '2025-09-15',
      tasks: 'SQL query optimization, Database schema design',
      learning: 'Understanding of database indexing and query performance',
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    date: '',
    tasks: '',
    learning: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: LogEntry = {
      id: entries.length + 1,
      ...newEntry,
    };
    setEntries([entry, ...entries]);
    setNewEntry({ date: '', tasks: '', learning: '' });
    setShowForm(false);
    toast.success('Log entry added successfully!');
  };

  const handleExport = () => {
    toast.success('Logbook exported as PDF!');
  };

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Internship Logbook</h1>
            <p className="text-muted-foreground">Track your weekly progress and learnings</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </div>

        {showForm && (
          <Card className="p-6 animate-slide-up">
            <h3 className="text-lg font-semibold mb-4">New Log Entry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tasks">Tasks Completed</Label>
                <Textarea
                  id="tasks"
                  value={newEntry.tasks}
                  onChange={(e) => setNewEntry({ ...newEntry, tasks: e.target.value })}
                  placeholder="Describe what you worked on this week..."
                  required
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="learning">Key Learnings</Label>
                <Textarea
                  id="learning"
                  value={newEntry.learning}
                  onChange={(e) => setNewEntry({ ...newEntry, learning: e.target.value })}
                  placeholder="What did you learn this week..."
                  required
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit">Save Entry</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Week of {new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>
                <span className="text-sm text-muted-foreground">{entry.date}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Tasks Completed</h4>
                  <p className="text-sm">{entry.tasks}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Key Learnings</h4>
                  <p className="text-sm">{entry.learning}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentLogbook;
