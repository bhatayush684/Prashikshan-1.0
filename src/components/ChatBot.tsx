import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your AI assistant. Ask me anything about Prashiskshan!", isBot: true }
  ]);
  const [input, setInput] = useState('');

  // Normalize user input for matching
  const normalize = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

  // Keyword-driven FAQs for fuzzy matching (add as many intents as needed)
  const faqs: Array<{ keywords: string[]; answer: string }> = [
    {
      keywords: ['apply', 'internship'],
      answer:
        "Go to Student → Internships. Browse the list and click 'Apply' on an internship card. You can track applications in your dashboard.",
    },
    {
      keywords: ['logbook', 'fill'],
      answer:
        "Open Student → Logbook, click 'Add Entry', and record your weekly tasks, learnings, and progress. Submit regularly for mentor/faculty review.",
    },
    {
      keywords: ['nep', 'credits'],
      answer:
        "NEP credits are awarded by faculty after a successful internship. They count toward your degree (typically 2–6 credits based on duration/performance).",
    },
    {
      keywords: ['faculty', 'approve', 'internship'],
      answer:
        "Faculty reviews requests in Faculty → Approvals, validates details, and approves if aligned with academic goals. You'll be notified after approval.",
    },
    {
      keywords: ['blockchain', 'certificate'],
      answer:
        "Completed internships can get a blockchain-verified certificate—tamper-proof and instantly verifiable. Check Industry → Certificates after completion.",
    },
    {
      keywords: ['contact', 'mentor'],
      answer:
        "Visit Student → Mentorship to see mentor details. You can message, schedule meetings, and track mentorship tasks from there.",
    },
    {
      keywords: ['skill', 'gap', 'analysis'],
      answer:
        "We compare your skills with industry needs and highlight gaps. You’ll get recommended courses/modules to improve your match for internships.",
    },
    {
      keywords: ['recommendation', 'ai', 'match'],
      answer:
        "AI recommendations use your skills, interests, and goals to rank internships. See Student → AI Recommendations. The match % helps you prioritize.",
    },
    {
      keywords: ['help', 'commands', 'what can you do'],
      answer:
        "Try asking about: applying to internships, filling logbooks, NEP credits, contacting mentors, blockchain certificates, skill gap analysis, or AI recommendations.",
    },
    {
      keywords: ['hello', 'hi', 'hey'],
      answer:
        "Hello! How can I help? You can ask about internships, logbooks, mentors, certificates, NEP credits, skill gaps, or AI recommendations.",
    },
    // Student-specific
    {
      keywords: ['student', 'dashboard', 'overview'],
      answer:
        "Student Dashboard shows your overview: applications, ongoing internship status, progress, tasks, and recent activity.",
    },
    {
      keywords: ['profile', 'edit', 'update', 'student'],
      answer:
        "Open Student → Profile to edit your details, skills, and preferences. Save changes to update recommendations and visibility.",
    },
    {
      keywords: ['application', 'status', 'track'],
      answer:
        "Track your application status on Student → Dashboard or inside the Internships page after you apply.",
    },
    {
      keywords: ['eligibility', 'who can apply'],
      answer:
        "Eligibility depends on the internship. Check required skills and description on each internship card before applying.",
    },
    {
      keywords: ['stipend', 'salary', 'pay'],
      answer:
        "The stipend is shown on each internship card. Details vary by company and role.",
    },
    {
      keywords: ['remote', 'onsite', 'hybrid', 'mode'],
      answer:
        "Mode (Remote/Onsite/Hybrid) is listed on each internship. Filter or choose based on your preference.",
    },
    {
      keywords: ['duration', 'length', 'weeks', 'months'],
      answer:
        "Internship duration is mentioned on the card (e.g., 8–12 weeks). Confirm timelines in the description before applying.",
    },
    // Logbook & Mentorship
    {
      keywords: ['logbook', 'submit', 'weekly', 'entry'],
      answer:
        "Use Student → Logbook to submit weekly entries: tasks, learnings, and progress. Faculty/mentor can review them.",
    },
    {
      keywords: ['mentor', 'meeting', 'schedule'],
      answer:
        "Go to Student → Mentorship to message your mentor or schedule a meeting. You can also manage mentorship tasks there.",
    },
    // Faculty
    {
      keywords: ['faculty', 'approvals', 'approve', 'reject'],
      answer:
        "Faculty → Approvals lets faculty approve or reject internship requests with a single click. Status updates notify students.",
    },
    {
      keywords: ['faculty', 'mentorship', 'assign', 'students'],
      answer:
        "Faculty → Mentorship allows assigning mentors to students, adding students, and managing mentorship details.",
    },
    {
      keywords: ['faculty', 'reports'],
      answer:
        "Faculty → Reports provides academic reports, summaries, and export options (varies by setup).",
    },
    // Industry
    {
      keywords: ['industry', 'post', 'internship', 'create'],
      answer:
        "Industry → Post Internship lets companies create new postings with title, description, duration, mode, and skills.",
    },
    {
      keywords: ['industry', 'applicants', 'shortlist', 'reject'],
      answer:
        "Industry → Applicants shows all applications. Use Shortlist/Reject to update candidate status and notify them.",
    },
    {
      keywords: ['industry', 'certificate', 'issue', 'blockchain'],
      answer:
        "Industry → Certificates enables issuing blockchain-verified completion certificates to successful interns.",
    },
    // Admin
    {
      keywords: ['admin', 'analytics', 'dashboard'],
      answer:
        "Admin → Analytics provides platform-level insights: applications, approvals, and engagement (varies by setup).",
    },
    {
      keywords: ['admin', 'colleges', 'institutions'],
      answer:
        "Admin → Colleges lets admins manage participating colleges and related metadata.",
    },
    {
      keywords: ['admin', 'industries', 'companies'],
      answer:
        "Admin → Industries manages connected companies and their onboarding details.",
    },
    {
      keywords: ['admin', 'skill', 'gaps'],
      answer:
        "Admin → Skill Gaps highlights aggregate gaps between student skills and industry needs to guide curriculum updates.",
    },
    // Accounts & navigation
    {
      keywords: ['login', 'sign in'],
      answer:
        "Use the Login page. Demo accounts: Student, Faculty, Industry, Admin. After login, you’ll be redirected to the relevant dashboard.",
    },
    {
      keywords: ['logout', 'sign out'],
      answer:
        "Use the top-right Logout button in the dashboard header to securely sign out.",
    },
    {
      keywords: ['navigation', 'where', 'find'],
      answer:
        "Use the left sidebar to navigate between sections (Dashboard, Internships, Logbook, Mentorship, etc.). On mobile, use the menu button.",
    },
    // Troubleshooting
    {
      keywords: ['not loading', 'blank', 'white screen'],
      answer:
        "Try a hard refresh (Ctrl+Shift+R). If the issue persists, the API may be unavailable; demo data will still load on most pages.",
    },
    {
      keywords: ['api', 'error', 'server'],
      answer:
        "If the API is down, the site shows demo data for key pages. For live data, ensure the API is running and the client is configured to reach it.",
    },
    {
      keywords: ['mobile', 'responsive', 'phone'],
      answer:
        "The UI is responsive. On small screens, use the floating menu to access the sidebar and features.",
    },
    {
      keywords: ['privacy', 'data', 'security'],
      answer:
        "Your profile and application data are used to personalize recommendations. Certificates use blockchain for authenticity.",
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    const user = normalize(input);
    let bestScore = 0;
    let response =
      "I'm here to help! Ask about internships, logbooks, NEP credits, mentors, blockchain certificates, skill gaps, or AI recommendations.";

    for (const faq of faqs) {
      const score = faq.keywords.reduce((acc, kw) => acc + (user.includes(kw) ? 1 : 0), 0);
      if (score > bestScore) {
        bestScore = score;
        response = faq.answer;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 500);

    setInput('');
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-glow hover:shadow-glow-accent hover:scale-110 transition-all z-50 bg-gradient-primary"
          size="icon"
        >
          <MessageCircle className="h-7 w-7 animate-bounce-subtle" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[550px] flex flex-col shadow-xl z-50 animate-scale-in border-2">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Assistant
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg shadow-sm ${
                    msg.isBot
                      ? 'bg-card text-card-foreground border'
                      : 'bg-gradient-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-card flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" className="bg-gradient-primary hover:shadow-glow">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
