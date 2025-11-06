import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import CV from "@/components/CV";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <CV />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 Yasin Syed Mohammed. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
