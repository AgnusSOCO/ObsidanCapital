import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, User, ShoppingCart, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export function GpuRaceDemo() {
  const [isRacing, setIsRacing] = useState(false);
  const [botProgress, setBotProgress] = useState(0);
  const [humanProgress, setHumanProgress] = useState(0);
  const [winner, setWinner] = useState<'bot' | 'human' | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [raceTime, setRaceTime] = useState({ bot: 0, human: 0 });
  const [botStageText, setBotStageText] = useState('');
  const [humanStageText, setHumanStageText] = useState('');
  
  const botInterval = useRef<number | null>(null);
  const humanInterval = useRef<number | null>(null);
  const humanFinishInterval = useRef<number | null>(null);
  const raceTimeRef = useRef<{ start: number, botEnd: number, humanEnd: number }>({ start: 0, botEnd: 0, humanEnd: 0 });
  
  const BOT_SPEED = 2; // Bot progresses 2% every interval
  const HUMAN_SPEED = 0.5; // Human progresses 0.5% every interval
  const INTERVAL_MS = 50; // Update every 50ms
  
  const stages = [
    { name: 'searching', threshold: 25, botText: 'Scanning inventory...', humanText: 'Browsing website...' },
    { name: 'adding', threshold: 50, botText: 'Adding to cart...', humanText: 'Found GPU! Adding to cart...' },
    { name: 'checkout', threshold: 75, botText: 'Processing payment...', humanText: 'Entering payment details...' },
    { name: 'complete', threshold: 100, botText: 'Purchase complete!', humanText: 'Almost there...' }
  ];

  const updateStageText = (progress: number, isBot: boolean) => {
    for (let i = stages.length - 1; i >= 0; i--) {
      if (progress >= stages[i].threshold) {
        return isBot ? stages[i].botText : stages[i].humanText;
      }
    }
    return isBot ? 'Initializing...' : 'Loading website...';
  };

  const startRace = () => {
    // Reset state
    setBotProgress(0);
    setHumanProgress(0);
    setWinner(null);
    setShowStats(false);
    setIsRacing(true);
    setBotStageText('Initializing...');
    setHumanStageText('Loading website...');
    
    // Clear any existing intervals
    if (botInterval.current) clearInterval(botInterval.current);
    if (humanInterval.current) clearInterval(humanInterval.current);
    if (humanFinishInterval.current) clearInterval(humanFinishInterval.current);
    
    // Record start time
    raceTimeRef.current = { start: Date.now(), botEnd: 0, humanEnd: 0 };
    
    // Start bot progress
    botInterval.current = window.setInterval(() => {
      setBotProgress(prev => {
        const newProgress = Math.min(prev + BOT_SPEED, 100);
        
        // Update stage based on progress
        for (const stage of stages) {
          if (prev < stage.threshold && newProgress >= stage.threshold) {
            setBotStageText(stage.botText);
            break;
          }
        }
        
        // Check if bot finished
        if (newProgress === 100 && !raceTimeRef.current.botEnd) {
          raceTimeRef.current.botEnd = Date.now();
          setBotStageText('Purchase complete!');
          if (!winner) {
            setWinner('bot');
          }
          
          // Force human to finish after bot completes
          ensureHumanFinishes();
        }
        
        return newProgress;
      });
    }, INTERVAL_MS);
    
    // Start human progress (slower)
    humanInterval.current = window.setInterval(() => {
      setHumanProgress(prev => {
        // Add some randomness to human speed (sometimes humans get stuck)
        const randomFactor = Math.random() > 0.8 ? 0 : 1; // 20% chance of getting stuck
        const newProgress = Math.min(prev + (HUMAN_SPEED * randomFactor), 100);
        
        // Update human stage text
        const stageText = updateStageText(newProgress, false);
        if (stageText !== humanStageText) {
          setHumanStageText(stageText);
        }
        
        // Check if human finished
        if (newProgress === 100 && !raceTimeRef.current.humanEnd) {
          raceTimeRef.current.humanEnd = Date.now();
          setHumanStageText('Purchase complete!');
          if (!winner) {
            setWinner('human');
          }
          
          // Show stats if both finished
          if (raceTimeRef.current.botEnd > 0) {
            showRaceStats();
          }
        }
        
        return newProgress;
      });
    }, INTERVAL_MS);
  };
  
  // Ensure human finishes the race
  const ensureHumanFinishes = () => {
    // Clear existing human interval
    if (humanInterval.current) {
      clearInterval(humanInterval.current);
      humanInterval.current = null;
    }
    
    // Create new interval to ensure human finishes
    humanFinishInterval.current = window.setInterval(() => {
      setHumanProgress(prev => {
        // Faster progress to ensure completion
        const newProgress = Math.min(prev + 1, 100);
        
        // Update human stage text
        const stageText = updateStageText(newProgress, false);
        if (stageText !== humanStageText) {
          setHumanStageText(stageText);
        }
        
        // Check if human finished
        if (newProgress === 100) {
          if (!raceTimeRef.current.humanEnd) {
            raceTimeRef.current.humanEnd = Date.now();
            setHumanStageText('Purchase complete!');
          }
          
          // Clear interval and show stats
          if (humanFinishInterval.current) {
            clearInterval(humanFinishInterval.current);
            humanFinishInterval.current = null;
          }
          
          showRaceStats();
        }
        
        return newProgress;
      });
    }, 100); // Faster interval for human catch-up
  };
  
  // Calculate and display race statistics
  const showRaceStats = () => {
    if (raceTimeRef.current.botEnd > 0 && raceTimeRef.current.humanEnd > 0) {
      const botTime = (raceTimeRef.current.botEnd - raceTimeRef.current.start) / 1000;
      const humanTime = (raceTimeRef.current.humanEnd - raceTimeRef.current.start) / 1000;
      
      setRaceTime({ bot: botTime, human: humanTime });
      setShowStats(true);
    }
  };
  
  // Clean up intervals when component unmounts
  useEffect(() => {
    return () => {
      if (botInterval.current) clearInterval(botInterval.current);
      if (humanInterval.current) clearInterval(humanInterval.current);
      if (humanFinishInterval.current) clearInterval(humanFinishInterval.current);
    };
  }, []);
  
  // Reset the demo
  const resetDemo = () => {
    if (botInterval.current) {
      clearInterval(botInterval.current);
      botInterval.current = null;
    }
    if (humanInterval.current) {
      clearInterval(humanInterval.current);
      humanInterval.current = null;
    }
    if (humanFinishInterval.current) {
      clearInterval(humanFinishInterval.current);
      humanFinishInterval.current = null;
    }
    
    setBotProgress(0);
    setHumanProgress(0);
    setWinner(null);
    setShowStats(false);
    setIsRacing(false);
    setBotStageText('');
    setHumanStageText('');
    raceTimeRef.current = { start: 0, botEnd: 0, humanEnd: 0 };
  };
  
  return (
    <div className="w-full bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 mt-8">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Bot className="mr-2 h-5 w-5 text-primary" />
        BitBased Bot vs Human Race
      </h3>
      
      <div className="space-y-6">
        {/* Bot progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">BitBased Bot</span>
            </div>
            <div className="text-sm text-foreground/70">
              {botProgress === 100 ? (
                <span className="flex items-center text-green-500">
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Purchase Complete
                </span>
              ) : (
                botStageText
              )}
            </div>
          </div>
          <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-100"
              style={{ width: `${botProgress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Human progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-foreground/70" />
              <span className="font-medium">Human Buyer</span>
            </div>
            <div className="text-sm text-foreground/70">
              {humanProgress === 100 ? (
                <span className="flex items-center text-green-500">
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Purchase Complete
                </span>
              ) : botProgress === 100 ? (
                <span className="flex items-center text-amber-500">
                  <AlertCircle className="mr-1 h-4 w-4" /> Too Late!
                </span>
              ) : (
                humanStageText
              )}
            </div>
          </div>
          <div className="h-3 bg-foreground/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground/70 transition-all duration-100"
              style={{ width: `${humanProgress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Race visualization */}
        <div className="relative h-16 bg-muted/30 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex">
            {/* Track markers */}
            <div className="w-1/4 border-r border-dashed border-foreground/20"></div>
            <div className="w-1/4 border-r border-dashed border-foreground/20"></div>
            <div className="w-1/4 border-r border-dashed border-foreground/20"></div>
            <div className="w-1/4"></div>
          </div>
          
          {/* Track labels */}
          <div className="absolute inset-x-0 bottom-0 flex text-xs text-foreground/50 font-medium">
            <div className="w-1/4 text-center">Search</div>
            <div className="w-1/4 text-center">Add to Cart</div>
            <div className="w-1/4 text-center">Checkout</div>
            <div className="w-1/4 text-center">Complete</div>
          </div>
          
          {/* Bot position */}
          <div 
            className="absolute top-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center transition-all duration-100 shadow-md shadow-primary/20"
            style={{ left: `calc(${botProgress}% - 12px)` }}
          >
            <Bot className="h-4 w-4 text-white" />
          </div>
          
          {/* Human position */}
          <div 
            className="absolute bottom-8 h-6 w-6 bg-foreground/70 rounded-full flex items-center justify-center transition-all duration-100"
            style={{ left: `calc(${humanProgress}% - 12px)` }}
          >
            <User className="h-4 w-4 text-background" />
          </div>
          
          {/* Finish line */}
          <div className="absolute top-0 bottom-0 right-0 w-1 bg-green-500"></div>
        </div>
        
        {/* Race stats */}
        {showStats && (
          <div className="bg-muted/30 rounded-lg p-4 mt-4">
            <h4 className="font-medium mb-2 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-primary" />
              Race Results
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-foreground/70">Bot Purchase Time</div>
                <div className="text-xl font-bold">{raceTime.bot.toFixed(2)}s</div>
              </div>
              <div>
                <div className="text-sm text-foreground/70">Human Purchase Time</div>
                <div className="text-xl font-bold">{raceTime.human.toFixed(2)}s</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-foreground/70">Bot Advantage</div>
                <div className="text-xl font-bold text-primary">
                  {((raceTime.human - raceTime.bot) / raceTime.human * 100).toFixed(1)}% Faster
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Controls */}
        <div className="flex justify-center">
          {!isRacing ? (
            <Button 
              onClick={startRace}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-0"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Start GPU Race
            </Button>
          ) : (
            <Button 
              onClick={resetDemo}
              variant="outline"
              className="border-primary/30 hover:border-primary/60"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Demo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
