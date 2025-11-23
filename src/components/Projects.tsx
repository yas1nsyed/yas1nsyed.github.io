import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { GLTFViewer } from './GLTFViewer';

const projects = [
  {
    title: "CADomatic",
    description: "Revolutionary LLM-powered CAD automation tool. Converts natural language prompts into fully editable, parametric FreeCAD models with modular Python script generation for customizable parts.",
    tech: ["Python", "LLM", "FreeCAD", "Parametric Design", "Automation"],
    github: "https://github.com/yas1nsyed/CADomatic",
    hf: "https://huggingface.co/spaces/Yas1n/CADomatic",
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
    hf: "https://huggingface.co/spaces/Yas1n/mulltrenner9000",
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

const cadomaticModels = [
  {
    name: "FLANGE",
    url: "/assets/Flange.gltf",
    prompt: `Prompt : Make a flange of OD 100mm, bore size 50mm, thickness 7.5mm. 
             The height of the middle hollow neck must be 15mm. 
             Make 6 M12 holes at PCD 75mm.`,
  },
  {
    name: "TEAPOT",
    url: "/assets/Teapot.gltf",
    prompt: `Prompt : Make a Utah teapot.`,
  },
  {
    name: "BEARING",
    url: "/assets/Bearing.gltf",
    prompt: `Prompt : Make a ball bearing of OD 32mm following standard convention.`,
  },
  {
    name: "HERRINGBONE GEAR",
    url: "/assets/HerringboneGear.gltf",
    prompt: `Prompt : Make a herringbone gear.`,
  },
];

const Projects = () => {
  const [cadomaticOpen, setCadomaticOpen] = useState(false);

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

                  {project.hf && project.title !== "CADomatic" && (
                    <Button
                      variant="outline"
                      className="w-full mt-2 gap-2 hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href={project.hf} target="_blank" rel="noopener noreferrer">
                        Go to Hugging Face Space
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>

                {/* CADomatic specific: collapsible GLTF models */}
                {project.title === "CADomatic" && (
                  <div className="mt-8 space-y-6">
                    <Collapsible open={cadomaticOpen} onOpenChange={setCadomaticOpen}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="outline"
                          className="gap-2 border-primary/50 hover:border-primary w-full"
                        >
                          Show Generated CAD Models
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${cadomaticOpen ? 'rotate-180' : ''}`}
                          />
                        </Button>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="mt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          {cadomaticModels.map((model, idx) => (
                            <div key={idx} className="p-4 bg-secondary/50 rounded-xl space-y-2">
                              <GLTFViewer modelUrl={model.url} />
                              <div className="font-bold text-lg">{model.name}</div>
                              <p className="text-sm text-muted-foreground">{model.prompt}</p>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Supporting Projects */}
                    <div className="mt-8 space-y-4">
                      <h3 className="text-2xl font-bold">Supporting Projects</h3>

                      <a
                        href="https://huggingface.co/datasets/Yas1n/FreeCAD_Sketches"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors flex justify-between items-start"
                      >
                        <div>
                          <div className="font-semibold text-lg">🧩 FreeCAD Sketch Python Dataset</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Dataset of 3,000 Python files representing parametric FreeCAD sketches.
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground mt-1" />
                      </a>

                      <a
                        href="https://github.com/yas1nsyed/freecad_sketch_paser"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors flex justify-between items-start"
                      >
                        <div>
                          <div className="font-semibold text-lg">📐 FreeCAD Sketch Parser Macro</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Macro to auto-generate Python code for all sketches in a model.
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground mt-1" />
                      </a>
                    </div>

                    {/* Create Your Own CAD Model Button */}
                    <div className="text-center mt-8">
                      <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-[var(--shadow-glow)] transition-all"
                        asChild
                      >
                        <a href="https://huggingface.co/spaces/Yas1n/CADomatic" target="_blank" rel="noopener noreferrer">
                          Create Your Own CAD Model
                        </a>
                      </Button>
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
