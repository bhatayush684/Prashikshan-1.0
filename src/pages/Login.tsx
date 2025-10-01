import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, Building2, Users, Shield } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const roleParam = searchParams.get('role');

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (roleParam) {
      setEmail(`${roleParam}@test.com`);
    }
  }, [roleParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    
    if (!success) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const roleIcons = {
    student: GraduationCap,
    faculty: Users,
    industry: Building2,
    admin: Shield
  };

  const Icon = roleParam ? roleIcons[roleParam as keyof typeof roleIcons] : GraduationCap;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4">
      <Card className="w-full max-w-md p-8 shadow-lg animate-scale-in">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Prashiskshan
          </h1>
          <p className="text-muted-foreground">
            {roleParam ? `Login as ${roleParam.charAt(0).toUpperCase() + roleParam.slice(1)}` : 'Login to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
          <div className="text-xs space-y-1">
            <p><strong>Student:</strong> student@test.com / 1234</p>
            <p><strong>Faculty:</strong> faculty@test.com / 1234</p>
            <p><strong>Industry:</strong> industry@test.com / 1234</p>
            <p><strong>Admin:</strong> admin@test.com / 1234</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button variant="link" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
