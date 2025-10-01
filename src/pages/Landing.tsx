import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, Building2, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';

const Landing = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'Student',
      icon: GraduationCap,
      description: 'Find internships, track progress, and build your career',
      path: '/login?role=student'
    },
    {
      title: 'Faculty',
      icon: Users,
      description: 'Mentor students and manage internship approvals',
      path: '/login?role=faculty'
    },
    {
      title: 'Industry',
      icon: Building2,
      description: 'Post internships and discover talented students',
      path: '/login?role=industry'
    },
    {
      title: 'Admin',
      icon: Shield,
      description: 'Monitor analytics and manage the ecosystem',
      path: '/login?role=admin'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Bridging Academia & Industry
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Empowering students, faculty, and industry to collaborate seamlessly through internships and mentorship
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-glow hover:scale-105 transition-transform"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Choose Your Role</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Select how you'd like to access the platform
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <Card
                key={role.title}
                className="p-6 hover:shadow-lg transition-all hover:-translate-y-2 cursor-pointer bg-gradient-card animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(role.path)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <role.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {role.description}
                  </p>
                  <Button variant="outline" className="w-full">
                    Login as {role.title}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-gradient-card">
              <h3 className="text-xl font-semibold mb-3">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Smart recommendations match students with relevant internships based on skills and interests
              </p>
            </Card>
            <Card className="p-6 bg-gradient-card">
              <h3 className="text-xl font-semibold mb-3">Digital Logbook</h3>
              <p className="text-muted-foreground">
                Track internship progress with weekly entries and generate comprehensive reports
              </p>
            </Card>
            <Card className="p-6 bg-gradient-card">
              <h3 className="text-xl font-semibold mb-3">Mentorship System</h3>
              <p className="text-muted-foreground">
                Connect students with experienced mentors from academia and industry
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
