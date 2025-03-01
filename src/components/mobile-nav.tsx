import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ObsidianLogo } from './obsidian-logo';
import { useEffect, useState } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [animationClass, setAnimationClass] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-in slide-in-from-right');
    } else {
      setAnimationClass('animate-out slide-out-to-right');
    }
  }, [isOpen]);
  
  if (!isOpen && animationClass !== 'animate-in slide-in-from-right') return null;

  return (
    <div className={`fixed inset-0 z-50 ${animationClass} duration-300`}>
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative h-full flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-border/30">
          <div className="flex items-center gap-2">
            <ObsidianLogo className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">Obsidian Capital</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-primary/10">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center flex-1 gap-10 text-2xl p-6">
          <a 
            href="#about" 
            className="relative text-foreground/80 hover:text-primary transition-colors group"
            onClick={onClose}
          >
            <span>About</span>
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#ventures" 
            className="relative text-foreground/80 hover:text-primary transition-colors group"
            onClick={onClose}
          >
            <span>Ventures</span>
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#contact" 
            className="relative text-foreground/80 hover:text-primary transition-colors group"
            onClick={onClose}
          >
            <span>Contact</span>
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          
          <Button 
            variant="outline" 
            size="lg"
            className="mt-6 border-primary/30 hover:border-primary/60 text-base"
            onClick={onClose}
          >
            Investor Portal
          </Button>
        </div>
        
        <div className="p-6 border-t border-border/30 text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Obsidian Capital Collective
        </div>
      </div>
    </div>
  );
}