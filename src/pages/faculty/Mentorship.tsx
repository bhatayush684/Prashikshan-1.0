import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import FacultySidebar from '@/components/faculty/FacultySidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const FacultyMentorship = () => {
  const [students, setStudents] = useState<Array<{ id: number; name: string; mentor: string | null; status: 'Assigned' | 'Unassigned' }>>([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/faculty/mentorship/students');
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      // Demo fallback
      setStudents([
        { id: 1, name: 'Ayush Sharma', mentor: 'Dr. Ramesh Kumar', status: 'Assigned' },
        { id: 2, name: 'Priya Mehta', mentor: null, status: 'Unassigned' },
      ]);
      if (!import.meta.env.PROD) {
        toast.error('API unavailable. Showing demo students.');
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const mentors: Record<string, string> = {
    ramesh: 'Dr. Ramesh Kumar',
    sarah: 'Prof. Sarah Johnson',
    amit: 'Dr. Amit Patel',
  };

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentDept, setNewStudentDept] = useState('');

  const handleAssign = async (studentId: number, mentorKey: string) => {
    const mentorName = mentors[mentorKey];
    if (!mentorName) return;
    try {
      const res = await fetch('/api/faculty/mentorship/assign', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentId, mentor: mentorName }) });
      if (!res.ok) throw new Error(String(res.status));
      toast.success('Mentor assigned successfully!');
      fetchStudents();
    } catch (err) {
      console.error(err);
      // Optimistic demo update
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, mentor: mentorName, status: 'Assigned' } : s));
      if (!import.meta.env.PROD) {
        toast.success('Mentor assigned (demo)');
      }
    }
  };

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = newStudentName.trim();
    if (!trimmedName) return;
    try {
      const res = await fetch('/api/faculty/mentorship/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: trimmedName }) });
      if (!res.ok) throw new Error(String(res.status));
      setNewStudentName('');
      setNewStudentEmail('');
      setNewStudentDept('');
      toast.success('Student added successfully!');
      fetchStudents();
    } catch (err) {
      console.error(err);
      // Demo optimistic add
      setStudents(prev => [{ id: Date.now(), name: trimmedName, mentor: null, status: 'Unassigned' }, ...prev]);
      setNewStudentName('');
      setNewStudentEmail('');
      setNewStudentDept('');
      if (!import.meta.env.PROD) {
        toast.success('Student added (demo)');
      }
    }
  };

  return (
    <DashboardLayout sidebar={<FacultySidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mentorship Management</h1>
          <p className="text-muted-foreground">Assign and manage student mentors</p>
        </div>

        <div className="flex items-center justify-between">
          <div />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Student</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleAddStudent}>
                <Input placeholder="Full Name" required value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} />
                <Input placeholder="Email" type="email" required value={newStudentEmail} onChange={(e) => setNewStudentEmail(e.target.value)} />
                <Input placeholder="Department" required value={newStudentDept} onChange={(e) => setNewStudentDept(e.target.value)} />
                <div className="flex justify-end">
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
                  
                  <Select onValueChange={(value) => handleAssign(student.id, value)}>
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
