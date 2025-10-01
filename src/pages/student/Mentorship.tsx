import { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StudentSidebar from '@/components/student/StudentSidebar';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, CheckCircle2, Circle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const StudentMentorship = () => {
  const messagesKey = 'student_mentorship_messages';
  const tasksKey = 'student_mentorship_tasks';

  const [messages, setMessages] = useState<Array<{ id: number; sender: string; text: string; time: string; isMentor: boolean }>>(() => {
    const saved = localStorage.getItem(messagesKey);
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, sender: 'Dr. Ramesh Kumar', text: 'How is your data analysis project going?', time: '10:30 AM', isMentor: true },
      { id: 2, sender: 'You', text: 'Going well! Completed the initial data cleaning phase.', time: '10:35 AM', isMentor: false },
      { id: 3, sender: 'Dr. Ramesh Kumar', text: 'Great! Make sure to document your findings in the logbook.', time: '10:40 AM', isMentor: true },
    ];
  });

  const [tasks, setTasks] = useState<Array<{ id: number; task: string; completed: boolean }>>(() => {
    const saved = localStorage.getItem(tasksKey);
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, task: 'Complete Python certification', completed: true },
      { id: 2, task: 'Submit mid-term internship report', completed: true },
      { id: 3, task: 'Practice SQL queries daily', completed: false },
      { id: 4, task: 'Prepare presentation for final review', completed: false },
    ];
  });

  const [draft, setDraft] = useState('');

  useEffect(() => {
    localStorage.setItem(messagesKey, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
  }, [tasks]);

  const sendMessage = async () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    await fetch('/api/student/mentorship/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sender: 'You', text, time, isMentor: false }) });
    const res = await fetch('/api/student/mentorship');
    const data = await res.json();
    setMessages(data.messages);
    setDraft('');
  };

  const toggleTask = async (id: number) => {
    await fetch('/api/student/mentorship/tasks/toggle', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const res = await fetch('/api/student/mentorship');
    const data = await res.json();
    setTasks(data.tasks);
  };

  return (
    <DashboardLayout sidebar={<StudentSidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mentorship</h1>
          <p className="text-muted-foreground">Connect with your mentor and track your goals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Your Mentor</h3>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">RK</AvatarFallback>
              </Avatar>
              <h4 className="text-xl font-semibold mb-1">Dr. Ramesh Kumar</h4>
              <p className="text-sm text-muted-foreground mb-4">Associate Professor, Computer Science</p>
              
              <div className="w-full space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>ramesh.k@university.edu</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+91 98765 43210</span>
                </div>
              </div>

              <Button className="w-full" onClick={() => toast.success('Meeting request sent to your mentor!')}>Schedule Meeting</Button>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Messages</h3>
            <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMentor ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.isMentor
                        ? 'bg-muted'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <p className="text-sm mb-1">{message.text}</p>
                    <p className="text-xs opacity-70">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type your message..." value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } }} />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Task Checklist</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                  {task.task}
                </span>
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-success ml-auto" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground ml-auto" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentMentorship;
