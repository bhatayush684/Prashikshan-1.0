import DashboardLayout from '@/components/DashboardLayout';
import FacultySidebar from '@/components/faculty/FacultySidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const FacultyMentorship = () => {
  const students = [
    { id: 1, name: 'Ayush Sharma', mentor: 'Dr. Ramesh Kumar', status: 'Assigned' },
    { id: 2, name: 'Priya Mehta', mentor: null, status: 'Unassigned' },
    { id: 3, name: 'Rahul Singh', mentor: 'Prof. Sarah Johnson', status: 'Assigned' },
  ];

  const handleAssign = () => {
    toast.success('Mentor assigned successfully!');
  };

  return (
    <DashboardLayout sidebar={<FacultySidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mentorship Management</h1>
          <p className="text-muted-foreground">Assign and manage student mentors</p>
        </div>

        <div className="space-y-4">
          {students.map((student) => (
            <Card key={student.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{student.name}</h3>
                  {student.mentor ? (
                    <p className="text-sm text-muted-foreground">Mentor: {student.mentor}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">No mentor assigned</p>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant={student.status === 'Assigned' ? 'default' : 'outline'}>
                    {student.status}
                  </Badge>
                  
                  <Select onValueChange={handleAssign}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Assign Mentor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ramesh">Dr. Ramesh Kumar</SelectItem>
                      <SelectItem value="sarah">Prof. Sarah Johnson</SelectItem>
                      <SelectItem value="amit">Dr. Amit Patel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyMentorship;
