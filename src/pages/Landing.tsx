import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, Building2, Users, Shield, TrendingUp, Award, Target, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';

const Landing = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: 'Student',
      icon: GraduationCap,
      description: 'Find internships, track progress, and build your career',
      path: '/login?role=student',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Faculty',
      icon: Users,
      description: 'Mentor students and manage internship approvals',
      path: '/login?role=faculty',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Industry',
      icon: Building2,
      description: 'Post internships and discover talented students',
      path: '/login?role=industry',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Admin',
      icon: Shield,
      description: 'Monitor analytics and manage the ecosystem',
      path: '/login?role=admin',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Matching',
      description: 'Smart recommendations match students with relevant internships based on skills and interests'
    },
    {
      icon: Target,
      title: 'Digital Logbook',
      description: 'Track internship progress with weekly entries and generate comprehensive reports'
    },
    {
      icon: Users,
      title: 'Mentorship System',
      description: 'Connect students with experienced mentors from academia and industry'
    },
    {
      icon: Award,
      title: 'NEP Credits',
      description: 'Earn academic credits for successful internship completion aligned with NEP guidelines'
    },
    {
      icon: Shield,
      title: 'Blockchain Certificates',
      description: 'Issue tamper-proof, blockchain-verified internship certificates'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Real-time insights into skills gaps, trends, and industry participation'
    }
  ];

  const stats = [
    { value: '1,200+', label: 'Active Students' },
    { value: '150+', label: 'Industry Partners' },
    { value: '800+', label: 'Internships Posted' },
    { value: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-[700px] flex items-center justify-center text-center px-4 py-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 max-w-5xl animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <p className="text-white text-sm font-medium">Empowering Future Professionals</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Bridging Academia <br />& Industry
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed">
            Seamlessly connect students, faculty, and industry through AI-powered internships, mentorship, and collaboration
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-glow hover:scale-105 hover:shadow-glow-accent transition-all bg-white text-primary hover:bg-white/90"
              onClick={() => navigate('/login')}
            >
              Get Started Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover-lift">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Role</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select how you'd like to access the platform and start your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <Card
                key={role.title}
                className="p-6 hover-lift cursor-pointer card-gradient group border-2 hover:border-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(role.path)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-glow transition-all`}>
                    <role.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{role.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {role.description}
                  </p>
                  <Button className="w-full bg-gradient-primary hover:shadow-glow">
                    Login as {role.title}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Platform Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need for a successful academia-industry collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 card-gradient hover-lift border-2 hover:border-primary/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-md">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Future?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Join thousands of students, faculty, and industry professionals already using Prashiskshan
          </p>
          <Button 
            size="lg" 
            className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 shadow-xl hover:scale-105 transition-all"
            onClick={() => navigate('/login')}
          >
            Start Your Journey Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
