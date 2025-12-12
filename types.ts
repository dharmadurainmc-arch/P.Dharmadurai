export interface Planet {
  name: string;
  color: string;
  size: number; // relative size
  orbitRadius: number;
  orbitSpeed: string; // Tailwind animation class
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewMode {
  GEOGEBRA = 'GEOGEBRA',
  REACT_SIM = 'REACT_SIM'
}

export const SOLAR_SYSTEM_DATA: Planet[] = [
  {
    name: "Mercury",
    color: "bg-stone-400",
    size: 12,
    orbitRadius: 60,
    orbitSpeed: "animate-orbit-mercury",
    description: "The smallest planet in the Solar System and the closest to the Sun."
  },
  {
    name: "Venus",
    color: "bg-orange-300",
    size: 18,
    orbitRadius: 100,
    orbitSpeed: "animate-orbit-venus",
    description: "The second planet from the Sun. It is the hottest planet in our solar system."
  },
  {
    name: "Earth",
    color: "bg-blue-500",
    size: 20,
    orbitRadius: 150,
    orbitSpeed: "animate-orbit-earth",
    description: "Our home planet. The only place we know of so far that's inhabited by living things."
  }
];