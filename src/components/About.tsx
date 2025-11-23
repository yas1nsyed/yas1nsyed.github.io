import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Cog, Zap, Leaf } from "lucide-react";
// import MechanicalModel from "./MechanicalModel";

const About = () => {
  const specializations = [
    {
      icon: Bot,
      title: "AI-Powered CAD",
      description: "Developing LLM-based tools to automate parametric modeling and generate CAD from natural language"
    },
    {
      icon: Cog,
      title: "CAE Simulation",
      description: "FEA, CFD analysis using Ansys, Altair HyperWorks for structural and thermal optimization"
    },
    {
      icon: Zap,
      title: "Autonomous Systems",
      description: "Computer vision and deep learning for perception in robotics and autonomous vehicles"
    },
    {
      icon: Leaf,
      title: "Sustainable Design",
      description: "Carbon footprint analysis and AI-driven recommendations for emission reduction in manufacturing"
    }
  ];

  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Engineering Meets Intelligence</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridging traditional mechanical engineering with cutting-edge AI to create intelligent design automation systems

          </p>
        </div>

        {/* Specializations Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {specializations.map((spec, index) => (
            <Card 
              key={index}
              className="group hover:shadow-[var(--shadow-card)] transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <spec.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {spec.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CAD Platforms */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-6">CAD/CAE Expertise</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {["CATIA V5", "SolidWorks", "Siemens NX", "Creo", "FreeCAD", "Ansys", "Altair HyperWorks", "CFD"].map((tool) => (
              <Badge key={tool} variant="secondary" className="text-base px-4 py-2">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
