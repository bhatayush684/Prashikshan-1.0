import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
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
    { text: "Hi! I'm here to help. Ask me anything!", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const responses: { [key: string]: string } = {
    'how do i apply for an internship': "Go to Internship Feed and click the 'Apply' button on any internship card.",
    'how do i fill logbook': "Go to Logbook → Click 'Add Entry' and fill in your weekly tasks and learnings.",
    'what are nep credits': "NEP credits are assigned by faculty after successful internship completion based on your performance.",
    'how to contact mentor': "Go to Mentorship page to view your mentor's contact details and send messages.",
    'default': "I'm here to help! Try asking about internships, logbooks, NEP credits, or mentorship."
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();
    let response = responses.default;
    
    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        response = value;
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
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow hover:scale-110 transition-transform z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] flex flex-col shadow-lg z-50 animate-scale-in">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              AI Assistant
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
