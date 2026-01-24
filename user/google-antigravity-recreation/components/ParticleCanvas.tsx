
import React, { useEffect, useRef } from 'react';
import { GOOGLE_COLORS, PARTICLE_COUNT, MOUSE_RADIUS, RETURN_FORCE, FRICTION, ATTRACTION_FORCE, ORBIT_FORCE } from '../constants';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

class Particle {
  x: number;
  y: number;
  curr3D: Point3D;
  target3D: Point3D;
  baseX: number;
  baseY: number;
  vx: number = 0;
  vy: number = 0;
  color: string;
  size: number;
  angle: number;

  constructor(x: number, y: number, color: string, size: number) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.curr3D = { x, y, z: 0 };
    this.target3D = { x, y, z: 0 };
    this.color = color;
    this.size = size;
    this.angle = Math.random() * Math.PI * 2;
  }

  project(p: Point3D, width: number, height: number): { x: number, y: number } {
    const centerX = width / 2;
    const centerY = height / 2;
    const radY = Math.PI / 4.5; 
    const radX = Math.PI / 9;

    const x1 = p.x * Math.cos(radY) + p.z * Math.sin(radY);
    const z1 = -p.x * Math.sin(radY) + p.z * Math.cos(radY);
    const y2 = p.y * Math.cos(radX) - z1 * Math.sin(radX);
    const zFinal = p.y * Math.sin(radX) + z1 * Math.cos(radX);

    const perspective = 1200;
    const scale = perspective / (perspective + zFinal);
    
    return {
      x: centerX + x1 * scale,
      y: centerY + y2 * scale
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(mouseX: number | null, mouseY: number | null, isSilhouette: boolean, width: number, height: number) {
    if (isSilhouette) {
      this.curr3D.x += (this.target3D.x - this.curr3D.x) * 0.12;
      this.curr3D.y += (this.target3D.y - this.curr3D.y) * 0.12;
      this.curr3D.z += (this.target3D.z - this.curr3D.z) * 0.12;

      const projected = this.project(this.curr3D, width, height);
      this.vx += (projected.x - this.x) * 0.22;
      this.vy += (projected.y - this.y) * 0.22;
    } else {
      if (mouseX !== null && mouseY !== null) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          this.vx += (dx / distance) * force * ATTRACTION_FORCE;
          this.vy += (dy / distance) * force * ATTRACTION_FORCE;
          this.vx += (dy / distance) * force * ORBIT_FORCE;
          this.vy -= (dx / distance) * force * ORBIT_FORCE;
          this.vx += (Math.random() - 0.5) * 0.5;
          this.vy += (Math.random() - 0.5) * 0.5;
        } else {
          this.vx += (this.baseX - this.x) * RETURN_FORCE;
          this.vy += (this.baseY - this.y) * RETURN_FORCE;
        }
      } else {
        this.vx += (this.baseX - this.x) * (RETURN_FORCE * 0.4);
        this.vy += (this.baseY - this.y) * (RETURN_FORCE * 0.4);
        this.vx += Math.sin(this.angle) * 0.08;
        this.vy += Math.cos(this.angle) * 0.08;
        this.angle += 0.02;
      }
    }

    this.vx *= FRICTION;
    this.vy *= FRICTION;
    this.x += this.vx;
    this.y += this.vy;
  }
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number | null, y: number | null }>({ x: null, y: null });
  const isSilhouetteActive = useRef(false);
  const silhouetteIndex = useRef(0);

  const generateLiDARScene = (type: number): Point3D[] => {
    const points: Point3D[] = [];
    
    const addPoints = (x: number, y: number, z: number, w: number, h: number, d: number, count: number, noise = 2) => {
      for (let i = 0; i < count; i++) {
        points.push({
          x: x + (Math.random() - 0.5) * w + (Math.random() - 0.5) * noise,
          y: y + (Math.random() - 0.5) * h + (Math.random() - 0.5) * noise,
          z: z + (Math.random() - 0.5) * d + (Math.random() - 0.5) * noise
        });
      }
    };

    const addCylinderPoints = (x: number, z: number, r: number, h: number, minY: number, count: number, hollow = true) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = hollow ? r + (Math.random() - 0.5) * 3 : Math.sqrt(Math.random()) * r;
        points.push({
          x: x + Math.cos(angle) * dist,
          y: minY + Math.random() * h,
          z: z + Math.sin(angle) * dist
        });
      }
    };

    switch (type) {
      case 0:
        addPoints(0, 0, 0, 1400, 4, 120, 10000);
        addPoints(0, 30, 0, 120, 4, 1400, 10000);
        for(let l=0; l<4; l++) {
          const angleOffset = (l * Math.PI) / 2;
          const cx = Math.cos(angleOffset + Math.PI/4) * 220;
          const cz = Math.sin(angleOffset + Math.PI/4) * 220;
          for(let i=0; i<3500; i++) {
            const a = Math.random() * Math.PI * 1.6 + angleOffset;
            const r = 120 + Math.random() * 40;
            const y = 15 + Math.random() * 8;
            points.push({ x: cx + Math.cos(a)*r, y: y, z: cz + Math.sin(a)*r });
          }
        }
        break;

      case 1:
        addPoints(0, 0, 0, 1000, 2, 300, 8000);
        addPoints(0, 0, 0, 300, 2, 1000, 8000);
        for(let i=0; i<12; i++) {
          addPoints(-400 + i*25, 2, 220, 10, 1, 120, 500);
          addPoints(-400 + i*25, 2, -220, 10, 1, 120, 500);
          addPoints(220, 2, -400 + i*25, 120, 1, 10, 500);
          addPoints(-220, 2, -400 + i*25, 120, 1, 10, 500);
        }
        addPoints(-300, 18, 100, 90, 40, 50, 2000); 
        addPoints(250, 18, -110, 90, 40, 50, 2000);
        const corners = [[-1, -1], [1, 1], [-1, 1], [1, -1]];
        corners.forEach(([sx, sz], idx) => {
          const x = sx * 260;
          const z = sz * 260;
          addCylinderPoints(x, z, 5, 200, 0, 1000);
          if (idx % 2 === 0) {
            for(let k=0; k<2000; k++) {
              const t = Math.random();
              const w = (1-t) * 120;
              points.push({ x: x + (Math.random()-0.5)*w, y: 200 + t*100, z: z + (Math.random()-0.5)*10 });
            }
          } else {
            addCylinderPoints(x, z, 50, 5, 220, 2000, false);
          }
        });
        break;

      case 2:
        for(let i=0; i<8; i++) {
          addPoints(-200, i*12 - 60, -80 - i*28, 250, 12, 28, 1500);
        }
        for(let i=0; i<10000; i++) {
          const t = Math.random();
          const rX = 150 + (Math.random()-0.5)*180;
          const rY = -60 + t * 80;
          const rZ = -300 + t * 500;
          points.push({ x: rX, y: rY, z: rZ });
        }
        addPoints(60, 25, -50, 4, 4, 600, 2000);
        addPoints(240, 25, -50, 4, 4, 600, 2000);
        for(let i=0; i<15; i++) {
          for(let j=0; j<15; j++) {
            addCylinderPoints(-150 + i*16, -250 + j*16, 4, 8, 20, 150, false);
          }
        }
        addPoints(-100, 100, -320, 300, 350, 10, 8000);
        break;

      case 3:
        addCylinderPoints(-300, 100, 120, 500, -400, 10000, true);
        addCylinderPoints(300, -100, 120, 500, -400, 10000, true);
        addCylinderPoints(0, 0, 150, 600, -500, 15000, true);
        for(let p=0; p<8000; p++) {
          const t = Math.random();
          const angle = Math.random() * Math.PI * 2;
          const r = 60;
          points.push({ x: -300 + t*300, y: -200 + Math.cos(angle)*r, z: 100 - t*100 });
        }
        for(let p=0; p<8000; p++) {
          const t = Math.random();
          const angle = Math.random() * Math.PI * 2;
          const r = 60;
          points.push({ x: 300 - t*300, y: -200 + Math.cos(angle)*r, z: -100 + t*100 });
        }
        break;
    }

    while (points.length < PARTICLE_COUNT) {
      points.push({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1500,
        z: (Math.random() - 0.5) * 1000
      });
    }

    return points.slice(0, PARTICLE_COUNT);
  };

  const cycleSilhouette = () => {
    isSilhouetteActive.current = !isSilhouetteActive.current;
    if (isSilhouetteActive.current) {
      const targets = generateLiDARScene(silhouetteIndex.current);
      const shuffled = targets.sort(() => Math.random() - 0.5);
      particles.current.forEach((p, i) => {
        p.target3D = shuffled[i] || { x: 0, y: 0, z: 0 };
      });
      silhouetteIndex.current = (silhouetteIndex.current + 1) % 4;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = GOOGLE_COLORS[Math.floor(Math.random() * GOOGLE_COLORS.length)];
        // Reduced size for a finer, more precise LiDAR feel
        const size = Math.random() * 0.5 + 0.35;
        particles.current.push(new Particle(x, y, color, size));
      }
    };

    const animate = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(p => {
        p.update(mouse.current.x, mouse.current.y, isSilhouetteActive.current, canvas.width, canvas.height);
        p.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: null, y: null };
    };

    const handleClick = () => {
      cycleSilhouette();
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleClick);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className="relative w-full h-full group">
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 bg-white"
        style={{ touchAction: 'none' }}
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-gray-400 text-sm font-medium tracking-widest uppercase text-center">
          Click anywhere to cycle 3D LiDAR scans
        </p>
      </div>
    </div>
  );
};
