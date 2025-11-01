import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Calendar, Users, TrendingUp, Brain, Zap } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Event Discovery
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Never Miss a{" "}
              <span className="gradient-accent bg-clip-text text-transparent">
                Campus Event
              </span>
              {" "}Again
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Campus Unite uses AI to recommend events tailored to your interests. 
              Discover workshops, hackathons, and activities that matter to you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="gradient-primary text-lg px-8 py-6 rounded-2xl hover:scale-105 transition-transform shadow-glow"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 rounded-2xl hover:scale-105 transition-transform border-2"
                onClick={() => navigate("/select-role")}
              >
                Explore Events
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            {[
              { label: "Active Events", value: "500+", icon: Calendar },
              { label: "Students", value: "10K+", icon: Users },
              { label: "Accuracy", value: "95%", icon: TrendingUp },
              { label: "AI Matches", value: "50K+", icon: Brain },
            ].map((stat, i) => (
              <div 
                key={i}
                className="bg-card p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powered by AI</h2>
            <p className="text-xl text-muted-foreground">Smart features that learn from you</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Brain,
                title: "Personalized Feed",
                description: "AI learns your interests and recommends events you'll love",
                color: "text-primary"
              },
              {
                icon: Zap,
                title: "Smart Notifications",
                description: "Get notified about events at the perfect time",
                color: "text-accent"
              },
              {
                icon: Sparkles,
                title: "Campus Buddy",
                description: "AI chatbot answers questions and helps you discover events",
                color: "text-primary"
              },
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-card p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 group"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-12 shadow-card-hover relative overflow-hidden">
            <div className="absolute inset-0 gradient-primary opacity-5" />
            <div className="relative text-center space-y-6">
              <h2 className="text-4xl font-bold">Ready to Transform Your Campus Experience?</h2>
              <p className="text-xl text-muted-foreground">Join thousands of students discovering events they love</p>
              <Button 
                size="lg"
                className="gradient-accent text-lg px-8 py-6 rounded-2xl hover:scale-105 transition-transform"
                onClick={() => navigate("/auth")}
              >
                Start Discovering Events
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;