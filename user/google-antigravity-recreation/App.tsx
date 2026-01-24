
import React from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';

const App: React.FC = () => {
  return (
    <main className="relative w-screen h-screen bg-white overflow-hidden cursor-none">
      {/* Interactive Particle Swarm Background */}
      <ParticleCanvas />
    </main>
  );
};

export default App;
