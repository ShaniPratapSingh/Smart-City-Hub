import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, TrendingUp, Bell, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import heroBackground from '@/assets/hero-bg.jpg';
import featureGeotag from '@/assets/feature-geotag.png';
import featureTracking from '@/assets/feature-tracking.png';
import featureNotifications from '@/assets/feature-notifications.png';
import featureSecurity from '@/assets/feature-security.png';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: MapPin,
      image: featureGeotag,
      title: 'Geo-Tagged Complaints',
      description: 'Report issues with precise location tracking using interactive maps. Every complaint is automatically tagged with GPS coordinates for accurate identification and faster response times.',
    },
    {
      icon: TrendingUp,
      image: featureTracking,
      title: 'Real-Time Tracking',
      description: 'Monitor your complaint status from submission to resolution. Get detailed progress updates, view assigned officers, and track resolution timelines through an intuitive dashboard.',
    },
    {
      icon: Bell,
      image: featureNotifications,
      title: 'Instant Notifications',
      description: 'Get updates via email and SMS when your complaint status changes. Never miss important updates with multi-channel notifications keeping you informed at every step.',
    },
    {
      icon: Shield,
      image: featureSecurity,
      title: 'Secure & Transparent',
      description: 'Role-based access with complete audit trail for accountability. Your data is encrypted and protected with enterprise-grade security while maintaining full transparency.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Making Cities Smarter,
              <span className="block text-secondary mt-2">One Complaint at a Time</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed font-light">
              Empowering citizens to report civic issues, track resolutions in real-time, 
              and actively contribute to better urban governance through technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg" variant="secondary" className="shadow-elevated">
                    <Link to="/complaints/new">Report a Complaint</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <Link to="/dashboard">View Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" variant="secondary" className="shadow-elevated">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <Link to="/map">View Complaint Map</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              Why Choose SmartCityHub?
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive platform designed for transparent and efficient civic complaint management, 
              connecting citizens directly with city officials for faster resolutions
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-none shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-slide-up overflow-hidden" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold">{feature.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Trusted by Thousands of Citizens
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Real impact through data-driven civic engagement
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">10K+</div>
              <div className="text-base font-semibold mb-1">Complaints Resolved</div>
              <div className="text-sm text-muted-foreground">
                Successfully addressed issues across multiple categories
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">48hrs</div>
              <div className="text-base font-semibold mb-1">Avg Resolution Time</div>
              <div className="text-sm text-muted-foreground">
                Fast-track processing for urgent civic matters
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">95%</div>
              <div className="text-base font-semibold mb-1">Citizen Satisfaction</div>
              <div className="text-sm text-muted-foreground">
                High approval rating from our active user community
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              Ready to Make Your City Better?
            </h2>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              Join thousands of engaged citizens contributing to smarter, more responsive urban governance. 
              Your voice matters in building better communities.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/signup">Create Free Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/map">Explore Complaints</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-card">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 SmartCityHub. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
