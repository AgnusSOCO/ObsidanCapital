import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Cpu, Globe, Lock, Menu } from 'lucide-react';
import { Canvas } from '@/components/canvas';
import { MobileNav } from '@/components/mobile-nav';
import { ObsidianLogo } from '@/components/obsidian-logo';
import { HeroAssets } from '@/components/hero-assets';
import { GpuRaceDemo } from '@/components/gpu-race-demo';

function App() {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set document title dynamically
  useEffect(() => {
    document.title = "Obsidian Capital Collective | Building Brands in Emerging Markets";
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="obsidian-theme">
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Header */}
        <header 
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-background/90 backdrop-blur-md shadow-md' : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ObsidianLogo className="h-10 w-10 text-primary" />
              <span className="font-bold text-xl">Obsidian Capital</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">About</a>
              <a href="#ventures" className="text-foreground/80 hover:text-primary transition-colors">Ventures</a>
              <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors">Contact</a>
              <Button variant="outline" onClick={() => toast({ title: "Coming Soon", description: "Our investor portal is coming soon." })}>
                Investor Portal
              </Button>
            </nav>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>

        {/* Mobile Navigation */}
        <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Canvas />
          </div>
          
          {/* Animated Gradient Orbs */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute top-3/4 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-block mb-4 px-4 py-1 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
                  <span className="text-primary font-medium">Innovating in Emerging Markets</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 whitespace-normal leading-tight pb-1">
                  Building Brands in Emerging Markets
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-foreground/80">
                  We identify opportunities in automation, infosec, and security to create innovative ventures that disrupt industries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-0" onClick={() => document.getElementById('ventures')?.scrollIntoView({ behavior: 'smooth' })}>
                    Our Ventures <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Get in Touch
                  </Button>
                </div>
                
                <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
                  <div className="flex -space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                      <Cpu className="h-5 w-5 text-primary" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-sm flex items-center justify-center border border-purple-500/30">
                      <Lock className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 backdrop-blur-sm flex items-center justify-center border border-indigo-500/30">
                      <Globe className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>
                  <span className="text-sm text-foreground/60">Trusted by industry leaders</span>
                </div>
              </div>
              
              <div className="hidden lg:block relative">
                <HeroAssets />
              </div>
            </div>
          </div>
          
          {/* Animated scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-8 h-12 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-primary rounded-full animate-scroll-down"></div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">About Obsidian Capital Collective</h2>
              <p className="text-lg text-foreground/80">
                We are a forward-thinking company focused on building and scaling brands in emerging niche markets. Our expertise spans automation, information security, and specialized technology sectors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Automation</h3>
                  <p className="text-foreground/70">
                    Leveraging cutting-edge automation technologies to create efficient, scalable business models that outperform traditional approaches.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Information Security</h3>
                  <p className="text-foreground/70">
                    Developing innovative solutions to address the growing challenges in cybersecurity and information protection.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Emerging Markets</h3>
                  <p className="text-foreground/70">
                    Identifying and capitalizing on opportunities in nascent markets before they reach mainstream adoption.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Ventures Section */}
        <section id="ventures" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Our Ventures</h2>
              <p className="text-lg text-foreground/80">
                Explore our portfolio of innovative businesses disrupting traditional markets through technology and strategic vision.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden border-primary/20 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-background to-background/50">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 md:p-8 flex items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-3">BitBased</h3>
                      <p className="text-foreground/70 mb-4">
                        An innovative technology-driven business leveraging advanced botting technology to acquire high-demand GPUs and resell them on the secondary market.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">99.7% faster GPU acquisition than human buyers</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">Proprietary automation workflow</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">Strategic market analytics</span>
                        </li>
                      </ul>
                      <Button variant="default" size="sm" onClick={() => toast({ title: "Coming Soon", description: "BitBased website is under development." })}>
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-6 md:p-8 flex items-center justify-center">
                    <div className="relative w-full h-64 perspective">
                      <div className="gpu-model absolute inset-0 flex items-center justify-center">
                        <img 
                          src="https://computercity.com/wp-content/uploads/geforce-rtx-5090-founders-edition-photo-007-transparent-2880x2160.png" 
                          alt="NVIDIA RTX 5090 GPU" 
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Interactive GPU Race Demo */}
                <GpuRaceDemo />
              </Card>
              
              <div className="text-center mt-12">
                <p className="text-foreground/60 mb-4">More ventures coming soon...</p>
                <Button variant="outline" onClick={() => toast({ title: "Stay Updated", description: "Subscribe to our newsletter for updates on new ventures." })}>
                  Stay Updated
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Our Approach</h2>
              <p className="text-lg text-foreground/80">
                We combine strategic vision with technical expertise to build sustainable, high-growth businesses.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="identify" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="identify">Identify</TabsTrigger>
                  <TabsTrigger value="build">Build</TabsTrigger>
                  <TabsTrigger value="scale">Scale</TabsTrigger>
                </TabsList>
                <TabsContent value="identify" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4">Identifying Opportunities</h3>
                      <p className="mb-4">
                        We analyze emerging markets to identify inefficiencies and opportunities where technology can create significant value. Our research-driven approach allows us to spot trends before they become mainstream.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Market research and trend analysis</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Identifying supply chain inefficiencies</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Evaluating technological advantages</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="build" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4">Building Solutions</h3>
                      <p className="mb-4">
                        We develop proprietary technologies and systems that provide a competitive edge in the marketplace. Our focus on automation and efficiency creates scalable business models.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Custom automation development</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Proprietary workflow creation</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Ethical and legal compliance frameworks</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="scale" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4">Scaling Operations</h3>
                      <p className="mb-4">
                        We implement strategic growth plans to expand our ventures, optimize operations, and maximize profitability while maintaining quality and service excellence.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Infrastructure expansion</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Process optimization</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-1 bg-primary/20 rounded-full p-1">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                          <span>Strategic partnerships and market expansion</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Get in Touch</h2>
              <p className="text-lg text-foreground/80">
                Interested in learning more about our ventures or exploring partnership opportunities? Contact us today.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Message Received",
                      description: "Thank you for your message. We'll be in touch soon.",
                    });
                  }}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                          <input
                            id="firstName"
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                          <input
                            id="lastName"
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                          required
                        ></textarea>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <ObsidianLogo className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Obsidian Capital Collective</span>
              </div>
              
              <div className="flex gap-8">
                <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">About</a>
                <a href="#ventures" className="text-foreground/70 hover:text-primary transition-colors">Ventures</a>
                <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-foreground/60">
              &copy; {new Date().getFullYear()} Obsidian Capital Collective. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
