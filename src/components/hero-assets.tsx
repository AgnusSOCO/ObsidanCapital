import React, { useEffect, useRef } from 'react';

export function HeroAssets() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const elements = container.querySelectorAll('.parallax-element');
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '1');
        const rotateX = y * 10 * speed;
        const rotateY = -x * 10 * speed;
        (el as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[500px] w-full">
      {/* Floating elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central hexagon */}
        <div 
          className="parallax-element absolute w-64 h-64 bg-gradient-to-br from-primary/30 to-purple-500/30 backdrop-blur-sm rounded-xl border border-primary/30 shadow-lg flex items-center justify-center transform transition-transform duration-200"
          data-speed="0.5"
          style={{ transform: 'perspective(1000px)' }}
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary">
                <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Obsidian</h3>
            <p className="text-sm text-foreground/70">Building the future</p>
          </div>
        </div>
        
        {/* Floating cards */}
        <div 
          className="parallax-element absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg border border-indigo-500/30 shadow-lg flex items-center justify-center transform transition-transform duration-200"
          data-speed="1.2"
          style={{ transform: 'perspective(1000px)' }}
        >
          <div className="text-center p-4">
            <div className="w-10 h-10 mx-auto mb-2 bg-indigo-500/20 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400">
                <path fill="currentColor" d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6z"></path>
              </svg>
            </div>
            <h3 className="text-sm font-bold mb-1">Security</h3>
            <p className="text-xs text-foreground/70">Advanced protection</p>
          </div>
        </div>
        
        <div 
          className="parallax-element absolute -bottom-5 -left-5 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg border border-purple-500/30 shadow-lg flex items-center justify-center transform transition-transform duration-200"
          data-speed="0.8"
          style={{ transform: 'perspective(1000px)' }}
        >
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-2 bg-purple-500/20 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-400">
                <path fill="currentColor" d="M12 16a4 4 0 100-8 4 4 0 000 8z"></path>
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
              </svg>
            </div>
            <h3 className="text-sm font-bold mb-1">Automation</h3>
            <p className="text-xs text-foreground/70">Streamlined workflows</p>
          </div>
        </div>
        
        <div 
          className="parallax-element absolute top-20 -left-20 w-36 h-36 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-lg border border-green-500/30 shadow-lg flex items-center justify-center transform transition-transform duration-200"
          data-speed="1.5"
          style={{ transform: 'perspective(1000px)' }}
        >
          <div className="text-center p-3">
            <div className="w-10 h-10 mx-auto mb-2 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-400">
                <path fill="currentColor" d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"></path>
              </svg>
            </div>
            <h3 className="text-sm font-bold mb-1">Growth</h3>
            <p className="text-xs text-foreground/70">Scaling ventures</p>
          </div>
        </div>
        
        <div 
          className="parallax-element absolute bottom-10 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-lg border border-amber-500/30 shadow-lg flex items-center justify-center transform transition-transform duration-200"
          data-speed="1.3"
          style={{ transform: 'perspective(1000px)' }}
        >
          <div className="text-center p-3">
            <div className="w-8 h-8 mx-auto mb-2 bg-amber-500/20 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400">
                <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>
              </svg>
            </div>
            <h3 className="text-xs font-bold mb-1">Innovation</h3>
            <p className="text-xs text-foreground/70">Creative solutions</p>
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute h-2 w-2 rounded-full bg-primary/70 top-1/4 left-1/4 animate-float-slow"></div>
          <div className="absolute h-3 w-3 rounded-full bg-purple-500/70 bottom-1/3 right-1/3 animate-float-medium"></div>
          <div className="absolute h-1 w-1 rounded-full bg-indigo-500/70 top-1/2 right-1/4 animate-float-fast"></div>
          <div className="absolute h-2 w-2 rounded-full bg-green-500/70 bottom-1/4 left-1/3 animate-float-medium"></div>
          <div className="absolute h-1 w-1 rounded-full bg-amber-500/70 top-1/3 right-1/2 animate-float-slow"></div>
        </div>
      </div>
    </div>
  );
}