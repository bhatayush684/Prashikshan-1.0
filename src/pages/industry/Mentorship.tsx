import DashboardLayout from '@/components/DashboardLayout';
import IndustrySidebar from '@/components/industry/IndustrySidebar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const IndustryMentorship = () => {
  const mentees = [
    { id: 1, name: 'Ayush Sharma', role: 'Data Analyst Intern', progress: 'Week 6/12' },
    { id: 2, name: 'Priya Mehta', role: 'Frontend Developer Intern', progress: 'Week 9/12' },
  ];

  const messages = [
    { id: 1, from: 'Ayush Sharma', text: 'Need guidance on SQL optimization', time: '2h ago' },
    { id: 2, from: 'Priya Mehta', text: 'Completed React module successfully', time: '5h ago' },
  ];

  return (
    <DashboardLayout sidebar={<IndustrySidebar />}>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Industry Mentorship</h1>
          <p className="text-muted-foreground">Guide and support your interns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Your Mentees</h3>
            <div className="space-y-3">
              {mentees.map((mentee) => (
                <div key={mentee.id} className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold">{mentee.name}</h4>
                  <p className="text-sm text-muted-foreground">{mentee.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{mentee.progress}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-sm">{message.from}</span>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Input placeholder="Type your message..." />
              <Button>Send</Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IndustryMentorship;
