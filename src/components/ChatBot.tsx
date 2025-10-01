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

  const faqs = [
    {
      question: 'how do i apply for an internship',
      answer: "Navigate to the Internships page from your dashboard. Browse available internships and click the 'Apply' button on any internship card that interests you. You can track your applications in your dashboard."
    },
    {
      question: 'how do i fill logbook',
      answer: "Go to the Logbook section in your dashboard. Click 'Add Entry' and fill in your weekly tasks, learnings, and progress. Make sure to submit entries regularly as they're reviewed by your mentor and faculty."
    },
    {
      question: 'what are nep credits',
      answer: "NEP (National Education Policy) credits are assigned by faculty members after successful completion of your internship. They are academic credits that count towards your degree, typically ranging from 2-6 credits based on internship duration and performance."
    },
    {
      question: 'how do faculty approve internships',
      answer: "Faculty members review internship applications in their Approvals section. They verify the internship details, company credentials, and alignment with your academic goals before approving. You'll receive a notification once approved."
    },
    {
      question: 'how does the blockchain certificate work',
      answer: "After completing your internship, the company issues a digital certificate that's verified and stored on the blockchain. This ensures authenticity and prevents tampering. You can share this certificate with future employers, and they can verify its authenticity instantly."
    },
    {
      question: 'how to contact mentor',
      answer: "Visit the Mentorship page in your dashboard to view your assigned mentor's profile and contact details. You can send messages directly through the platform, schedule meetings, and track your mentorship tasks."
    },
    {
      question: 'what is skill gap analysis',
      answer: "Our AI analyzes your current skills against industry requirements and identifies gaps. Based on this, we recommend specific courses and training modules to help you become more competitive for internships."
    },
    {
      question: 'how do recommendations work',
      answer: "Our AI recommendation system analyzes your skills, interests, academic background, and career goals to match you with the most suitable internships. Each recommendation includes a percentage match score to help you prioritize applications."
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();
    let response = "I'm here to help! Try asking about internships, logbooks, NEP credits, mentorship, blockchain certificates, or skill gap analysis.";
    
    for (const faq of faqs) {
      if (lowerInput.includes(faq.question)) {
        response = faq.answer;
        break;
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
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
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
