import React, { useState } from 'react';
import { SOLAR_SYSTEM_DATA, Planet } from '../types';

interface SolarSystemSimulationProps {
  onPlanetSelect: (planet: string) => void;
}

const SolarSystemSimulation: React.FC<SolarSystemSimulationProps> = ({ onPlanetSelect }) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  // Center of the SVG
  const cx = 300;
  const cy = 300;

  return (
    <div className="w-full h-full flex items-center justify-center bg-space-800/50 rounded-xl overflow-hidden relative shadow-inner shadow-black/50 border border-space-700">
      
      <div className="absolute top-4 left-4 z-10 text-xs text-space-accent font-mono bg-space-900/80 px-2 py-1 rounded border border-space-accent/20">
        React SVG Engine Active
      </div>

      <svg width="600" height="600" viewBox="0 0 600 600" className="w-full h-full max-w-[500px] max-h-[500px]">
        {/* Sun */}
        <g>
          <circle cx={cx} cy={cy} r={35} fill="url(#sunGradient)" className="animate-pulse shadow-yellow-500/50" />
          <defs>
            <radialGradient id="sunGradient">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="80%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </radialGradient>
          </defs>
          {/* Sun Glow */}
          <circle cx={cx} cy={cy} r={40} fill="orange" opacity="0.2" className="animate-ping" />
        </g>

        {/* Orbits and Planets */}
        {SOLAR_SYSTEM_DATA.map((planet: Planet, index) => (
          <g key={planet.name} className="group cursor-pointer"
             onMouseEnter={() => setHoveredPlanet(planet.name)}
             onMouseLeave={() => setHoveredPlanet(null)}
             onClick={() => onPlanetSelect(planet.name)}
          >
            {/* Orbit Path */}
            <circle 
              cx={cx} 
              cy={cy} 
              r={planet.orbitRadius} 
              fill="none" 
              stroke={hoveredPlanet === planet.name ? "#00aaff" : "#334155"} 
              strokeWidth={hoveredPlanet === planet.name ? 2 : 1}
              strokeDasharray="4 4"
              className="transition-colors duration-300"
            />
            
            {/* Rotating Group for Planet */}
            <g className={planet.orbitSpeed} style={{ transformOrigin: `${cx}px ${cy}px` }}>
              {/* The Planet itself */}
              {/* We need to offset the planet by its radius from the center cx, cy */}
              <circle 
                cx={cx + planet.orbitRadius} 
                cy={cy} 
                r={planet.size / 2} 
                className={`fill-current ${planet.color.replace('bg-', 'text-')} transition-all duration-300 ${hoveredPlanet === planet.name ? 'scale-150' : ''}`}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              {/* Planet Label (rotates with planet but needs counter-rotation to stay upright if we were perfect, but simple label next to it is fine) */}
            </g>
          </g>
        ))}
      </svg>
      
      {/* Tooltip Overlay */}
      {hoveredPlanet && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-space-900/90 border border-space-accent text-white px-4 py-2 rounded-lg text-sm shadow-xl backdrop-blur-sm transition-all animate-fade-in-up">
          Click to ask AI about <span className="text-space-accent font-bold">{hoveredPlanet}</span>
        </div>
      )}
    </div>
  );
};

export default SolarSystemSimulation;