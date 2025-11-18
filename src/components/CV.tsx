import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Briefcase, FileText, Award } from "lucide-react";

const CV = () => {
  const education = [
    {
      degree: "Master of Science – Electromobilität ACES",
      institution: "FAU Erlangen–Nürnberg",
      location: "Erlangen, Germany",
      period: "Oct 2024 – Present",
      grade: "1.7",
      highlights: [
        "Majors: AI and Autonomous Driving, Sustainable Production",
        "Skills: AI/ML, Computer Vision, CAD"
      ]
    },
    {
      degree: "Bachelor of Engineering – Mechanical Engineering",
      institution: "University College of Engineering – Osmania University",
      location: "Hyderabad, India",
      period: "Aug 2019 – May 2023",
      grade: "1.81",
      highlights: [
        "Skills: CAD/CAM/CAE, Mechanics"
      ]
    }
  ];

  const experience = [
    {
      role: "Product Designer (Part time)",
      company: "Miniture Life Retail Pvt. Ltd.",
      location: "Remote",
      period: "Jul 2024 - Sep 2024",
      highlights: [
        "Designed the product range using CATIA and made model prototypes",
        "Developed injection molds for material efficiency and cost-effectiveness"
      ]
    },
    {
      role: "Senior Engineer (Mechanical)",
      company: "Larsen & Toubro Ltd.",
      location: "Prayagraj, India",
      period: "July 2023 – Aug 2024",
      highlights: [
        "R&D, Machinery and QA/QC departments rotations",
        "FEA simulation for assembly of Precast concrete structures"
      ]
    },
    {
      role: "Vehicle Engineering Intern (CAD/CAE)",
      company: "Raptee Motors",
      location: "Chennai, India",
      period: "July 2022 - Nov 2022",
      highlights: [
        "Full-scale CAD modelling and CFD simulation for passive air-cooling system",
        "Designed pressure-relief safety valve for battery pack",
        "Eliminated need for external active cooling system"
      ]
    },
    {
      role: "3D Printing Intern",
      company: "Centre for Product Design, OU",
      location: "Hyderabad, India",
      period: "Apr 2022 - May 2022",
      highlights: [
        "Operated SLM, SLS, SLA, and FDM additive manufacturing technologies",
        "Applied Design for Additive Manufacturing (DfAM) concepts"
      ]
    }
  ];

  const skills = {
    "Programming": ["Python", "C", "MATLAB"],
    "AI/ML/CV": ["PyTorch", "TensorFlow", "Keras", "ScikitLearn", "OpenCV", "Computer Vision"],
    "CAD/CAE": ["CATIA V5", "SolidWorks", "SiemensNX", "Creo", "Ansys", "Altair HyperWorks CFD", "FreeCAD"],
    "Tools": ["Git", "CI/CD", "NumPy"]
  };

  const publications = [
    {
      title: "Design and Analysis of Wall-Climbing Robot",
      description: "Designed wall-climbing robot using reverse thrust and wheel-driven locomotion. Performed CFD simulation.",
      doi: "10.2991/978-94-6463-252-1_108",
      link: "https://www.atlantis-press.com/proceedings/icete-23/125994123"
    },
    {
      title: "Investigation of Tuned Mass-Damper System on Vehicle Vibrations",
      description: "Developed TMD system for vehicle suspension. Used MATLAB for optimization.",
      doi: "10.2991/978-94-6463-252-1_105",
      link: "https://www.atlantis-press.com/proceedings/icete-23/125994101"
    }
  ];


  return (
    <section id="cv" className="py-24 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Interactive CV</h2>
          <p className="text-xl text-muted-foreground">
            Explore my professional journey
          </p>
        </div>

        <Tabs defaultValue="education" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-secondary/50">
            <TabsTrigger value="education" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="publications" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Publications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="education" className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-2xl">{edu.degree}</CardTitle>
                    <Badge variant="outline" className="border-accent/50 text-accent">
                      Grade: {edu.grade}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    <div className="font-semibold text-foreground">{edu.institution}</div>
                    <div className="text-sm">{edu.location} • {edu.period}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            {experience.map((exp, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">{exp.role}</CardTitle>
                  <CardDescription className="text-base">
                    <div className="font-semibold text-foreground">{exp.company}</div>
                    <div className="text-sm">{exp.location} • {exp.period}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <Card key={category} className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="publications" className="space-y-6">
            {publications.map((pub, index) => (
              <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl">{pub.title}</CardTitle>
                  <CardDescription className="text-base">
                    {pub.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    DOI: {pub.doi}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CV;
