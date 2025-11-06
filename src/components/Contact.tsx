import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Get In Touch</h2>
          <p className="text-xl text-muted-foreground">
            Let's collaborate on innovative AI and engineering solutions
          </p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <a 
                href="mailto:yasin.m.syed@fau.de"
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-muted-foreground">yasin.m.syed@fau.de</div>
                </div>
              </a>

              <a 
                href="tel:+4915222056640"
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-sm text-muted-foreground">+49 15222056640</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                <div className="p-3 rounded-full bg-accent/10">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-sm text-muted-foreground">Nürnberg, Germany</div>
                </div>
              </div>

              <a 
                href="https://github.com/yas1nsyed"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">GitHub</div>
                  <div className="text-sm text-muted-foreground">@yas1nsyed</div>
                </div>
              </a>
            </div>

            <div className="mt-8 text-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-[var(--shadow-glow)] transition-all"
                asChild
              >
                <a href="mailto:yasin.m.syed@fau.de">
                  Send Message
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
