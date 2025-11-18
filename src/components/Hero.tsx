import { Button } from "@/components/ui/button";
import { Github, Mail, MapPin, Cpu } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import CADBackground from "./CADBackground";
import ThreeDName from "./ThreeDName";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D CAD Background */}
      <CADBackground />
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0" style={{ background: 'var(--gradient-hero)' }} />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-3 text-primary mb-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
              <Cpu className="w-4 h-4" />
              <span className="text-sm font-medium">AI Enthusiast • Mechanical Engineer</span>
            </div>
            <ThreeDName />
            <p className="text-xs text-muted-foreground/60 mt-2">
              Interactive 3D Model • Click and drag to rotate • Scroll to zoom
            </p>
            <p className="text-xl md:text-2xl text-foreground max-w-2xl mx-auto font-semibold">
              Artificial Intelligence × Mechanical Engineering 
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Automating CAD workflows with AI | Building intelligent design systems | 
              Specializing in electromobility, autonomous systems, and sustainable manufacturing
            </p>
            <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Nürnberg, Germany</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-[var(--shadow-glow)] transition-all"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 border-primary/50 hover:border-primary hover:bg-primary/10"
              onClick={() => document.getElementById('cv')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Interactive CV
            </Button>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <a 
              href="https://github.com/yas1nsyed" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="mailto:yasin.m.syed@fau.de"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(45deg) rotateZ(45deg); }
          50% { transform: translateY(-20px) rotateX(45deg) rotateZ(45deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotateY(45deg) rotateZ(30deg); }
          50% { transform: translateY(-30px) rotateY(45deg) rotateZ(30deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;
