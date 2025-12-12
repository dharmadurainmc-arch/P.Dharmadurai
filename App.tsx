import React, { useState } from 'react';
import StarField from './components/StarField';
import SolarSystemSimulation from './components/SolarSystemSimulation';
import AIChat from './components/AIChat';
import { ViewMode, SOLAR_SYSTEM_DATA } from './types';
import { Info, ExternalLink, Activity, BookOpen, Layers } from 'lucide-react';
import { generateAstronomyResponse } from './services/geminiService';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GEOGEBRA);
  
  // This is a dummy function to simulate "learning" about a planet if clicked in the React Sim
  // In a real app, this would open the chat with a specific prompt.
  const handlePlanetSelect = async (planetName: string) => {
    // We can't programmatically open the chat from here easily without context or lifting state up further,
    // but visually we can show feedback.
    console.log(`Selected ${planetName}`);
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-slate-300">
      <StarField />
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-space-900/70 border-b border-space-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-space-accent to-purple-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-display font-bold text-white tracking-tight">
              Cosmos<span className="text-space-accent">Learn</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#intro" className="hover:text-space-accent transition-colors">Introduction</a>
            <a href="#model" className="hover:text-space-accent transition-colors">Model</a>
            <a href="#outcomes" className="hover:text-space-accent transition-colors">Outcomes</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10 max-w-5xl">
        
        {/* Hero / Intro Section */}
        <section id="intro" className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-space-accent">
            Animated Solar System
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Explore the celestial dance of our neighborhood. Understand revolution, orbital mechanics, and the relative speeds of Mercury, Venus, and Earth.
          </p>
          
          <div className="bg-space-800/50 border border-space-700 rounded-xl p-6 text-left max-w-3xl mx-auto flex gap-4 items-start shadow-lg">
            <Info className="w-6 h-6 text-space-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-2">Project Overview</h3>
              <p className="text-sm leading-relaxed">
                This project demonstrates the <strong className="text-white">Solar System</strong> with planets moving in circular orbits around the Sun. 
                Whether you view the GeoGebra model or our custom React Simulation, you'll see how distance affects orbital velocity.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Model Section */}
        <section id="model" className="mb-16 scroll-mt-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
              <Layers className="text-space-accent" />
              Interactive Model
            </h2>
            
            {/* Toggle Switch */}
            <div className="bg-space-800 p-1 rounded-lg border border-space-700 flex">
              <button 
                onClick={() => setViewMode(ViewMode.GEOGEBRA)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === ViewMode.GEOGEBRA ? 'bg-space-accent text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                GeoGebra
              </button>
              <button 
                onClick={() => setViewMode(ViewMode.REACT_SIM)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === ViewMode.REACT_SIM ? 'bg-space-accent text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                React Sim
              </button>
            </div>
          </div>

          <div className="w-full aspect-[16/9] md:aspect-[2/1] lg:h-[600px] bg-black/40 rounded-2xl border border-space-700 shadow-[0_0_40px_rgba(0,170,255,0.15)] overflow-hidden relative group">
            
            {viewMode === ViewMode.GEOGEBRA ? (
              <iframe 
                src="https://www.geogebra.org/material/iframe/id/xwhu5t5j/width/1200/height/600/border/888888/sfsb/true/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/false/rc/false/ld/false/sdz/false/ctl/false" 
                className="w-full h-full border-0"
                allowFullScreen
                title="GeoGebra Solar System"
              />
            ) : (
              <SolarSystemSimulation onPlanetSelect={handlePlanetSelect} />
            )}
          </div>
          
          <p className="mt-4 text-center text-sm text-slate-500">
            {viewMode === ViewMode.GEOGEBRA 
              ? "Loading external GeoGebra resource..." 
              : "Running native React SVG animation engine."}
          </p>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Heliocentric Model", desc: "Sun positioned at the center of the system." },
              { title: "Inner Planets", desc: "Detailed motion of Mercury, Venus, and Earth." },
              { title: "Orbital Velocity", desc: "Planets rotate at scientifically relative speeds." },
              { title: "Visual Orbits", desc: "Circular orbital paths are clearly visible." },
              { title: "User Friendly", desc: "Designed for beginners and students." },
              { title: "Cross Platform", desc: "Works seamlessly on desktop and mobile." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-space-800/30 border border-space-700/50 p-6 rounded-xl hover:bg-space-800/60 hover:border-space-accent/50 transition-all duration-300 group">
                <div className="w-8 h-8 rounded-lg bg-space-accent/10 text-space-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Activity className="w-4 h-4" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Outcomes */}
        <section id="outcomes" className="mb-12 bg-gradient-to-br from-space-800 to-space-900 rounded-2xl p-8 border border-space-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-space-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="text-space-accent" />
                Learning Outcomes
              </h2>
              <ul className="space-y-4">
                {[
                  "Understand revolution and orbital motion mechanics",
                  "Learn about angular velocity differences between planets",
                  "Visualize the basic structure of the solar system",
                  "Improve understanding of digital animation tools"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-space-accent shadow-[0_0_10px_#00aaff]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Visual Decor for Learning Section */}
            <div className="w-full md:w-1/3 flex justify-center">
               <div className="relative w-48 h-48">
                 <div className="absolute inset-0 bg-space-accent/20 rounded-full blur-xl animate-pulse"></div>
                 <div className="relative z-10 w-full h-full border border-space-accent/30 rounded-full flex items-center justify-center bg-space-900/50 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">100%</div>
                      <div className="text-xs text-space-accent uppercase tracking-wider">Education</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-space-800 bg-space-900 py-8 mt-auto relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 mb-2">Created as a Beginner GeoGebra Project</p>
          <p className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} CosmosLearn. All orbits reserved.
          </p>
        </div>
      </footer>

      {/* AI Chat Component */}
      <AIChat />
    </div>
  );
};

export default App;