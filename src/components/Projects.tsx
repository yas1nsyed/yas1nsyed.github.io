import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { GLTFViewer } from './GLTFViewer';

const projects = [
  {
    title: "CADomatic",
    description: "Revolutionary LLM-powered CAD automation tool. Converts natural language prompts into fully editable, parametric FreeCAD models with modular Python script generation for customizable parts.",
    tech: ["Python", "LLM", "FreeCAD", "Parametric Design", "Automation"],
    github: "https://github.com/yas1nsyed/CADomatic",
    date: "Jul 2025",
    category: "AI/CAD",
    featured: true
  },
  {
    title: "Carbon Footprint Analyzer",
    description: "Python-based tool for automated carbon footprint calculation from CATIA part files and CAM documents. Extended with AI-driven module and LLM recommendations for emission reduction.",
    tech: ["Python", "CATIA", "AI/LLM", "CAM", "Sustainability"],
    github: "https://github.com/suhail-mohd-aamir/Carbon_footprint",
    date: "Sep 2025",
    category: "CAE/Sustainability",
    featured: true
  },
  {
    title: "Mülltrenner9000",
    description: "AI-powered waste segregation system using Detectron2 for German Mülltrennung. Outputs masked images of trash classified by recycling bin type.",
    tech: ["PyTorch", "YOLOv11", "OpenCV", "Instance Segmentation"],
    github: "https://github.com/yas1nsyed/mulltrenner9000",
    date: "Jun 2025",
    category: "Computer Vision"
  },
  {
    title: "Autonomous Driving CNN",
    description: "Edge-processed CNN for autonomous vehicle control. Trained on edge-detected CarRacing frames to predict steering, acceleration, and braking actions.",
    tech: ["CNN", "OpenAI Gym", "Edge Detection", "Autonomous Systems"],
    date: "Jun 2025",
    category: "Autonomous Driving"
  },
  {
    title: "Car Semantic Segmentation",
    description: "Built a U-Net-based semantic segmentation model using the Cityscapes dataset to segment urban scene elements. Implemented custom data loading and training in TensorFlow/Keras.",
    tech: ["Computer Vision", "Segmentation", "OpenCV", "TensorFlow"],
    date: "May 2025",
    category: "Autonomous Driving"
  }
];

const Projects = () => {
  const [cadomaticOpen, setCadomaticOpen] = useState(false);

  const cadomaticModels = [
    { name: 'Flange', url: '/assets/Flange.gltf' },
    { name: 'Bearing', url: '/assets/Bearing.gltf' },
    { name: 'Teapot', url: '/assets/Teapot.gltf' },
    { name: 'Herringbone Gear', url: '/assets/HerringboneGear.gltf' },
  ];

  return (
    <section id="projects" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">My Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-Driven CAD Automation | Engineering Intelligent and Sustainable Mobility Systems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-[var(--shadow-card)] transition-all duration-300 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm ${
                project.featured ? 'md:col-span-2 border-primary/30' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-accent/50 text-accent">
                      {project.category}
                    </Badge>
                    {project.featured && (
                      <Badge className="bg-primary/20 text-primary border-primary/50">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{project.date}</span>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {project.github && (
                    <Button 
                      variant="ghost" 
                      className="w-full gap-2 hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        View on GitHub
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>

                {/* Only for CADomatic */}
                {project.title === "CADomatic" && (
                  <div className="mt-8 space-y-10">

                    {/* CAD Models */}
                    <Collapsible open={cadomaticOpen} onOpenChange={setCadomaticOpen}>
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="outline"
                          className="gap-2 border-primary/50 hover:border-primary"
                        >
                          Show CAD Models
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform ${
                              cadomaticOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {cadomaticModels.map((model, modelIndex) => (
                            <div key={modelIndex} className="space-y-2">
                              <h4 className="font-semibold text-sm">{model.name}</h4>
                              <GLTFViewer modelUrl={model.url} />
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Supporting Projects */}
                    <div className="bg-secondary/40 border border-primary/20 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-3">Supporting Projects</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Core datasets and tools powering CADomatic’s parametric CAD automation.
                      </p>

                      <div className="space-y-4">

                        {/* Dataset */}
                        <a 
                          href="https://huggingface.co/datasets/Yas1n/FreeCAD_Sketches"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-primary">🧩 FreeCAD Sketch Python Dataset</h4>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="text-sm mt-1 text-muted-foreground">
                            Dataset of <strong>3,000 parametric sketch Python files</strong> for training LLMs to generate geometric CAD code.
                          </p>
                        </a>

                        {/* Parser Macro */}
                        <a 
                          href="https://github.com/yas1nsyed/freecad_sketch_paser"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-primary">🔧 FreeCAD Sketch Parser Macro</h4>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="text-sm mt-1 text-muted-foreground">
                            FreeCAD macro that auto-generates Python scripts for every sketch in a model — perfect for dataset creation.
                          </p>
                        </a>

                      </div>
                    </div>

                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
