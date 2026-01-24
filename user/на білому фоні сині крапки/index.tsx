import React from 'react';

// Константи для налаштування анімації
const PARTICLE_COUNT = 2800; 
const MOUSE_RADIUS = 130;
const RETURN_SPEED = 0.1; 
const FRICTION = 0.93;

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseColor: string;
  alpha: number;
  pulseSpeed: number;
  noise: number;

  constructor(x: number, y: number, r: number, g: number, b: number) {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.originX = x;
    this.originY = y;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;
    this.size = Math.random() * 1.8 + 0.4;
    // Використовуємо наданий колір RGB(21, 76, 113) як основу
    this.baseColor = `rgba(${r}, ${g}, ${b}, ALPHA)`;
    this.alpha = Math.random();
    this.pulseSpeed = 0.04 + Math.random() * 0.08;
    this.noise = (Math.random() - 0.5) * 1.5;
  }

  update(mouseX: number, mouseY: number, isAssembling: boolean) {
    if (isAssembling) {
      const dx = (this.originX + this.noise) - this.x;
      const dy = (this.originY + this.noise) - this.y;
      
      this.vx += dx * RETURN_SPEED;
      this.vy += dy * RETURN_SPEED;
      
      this.vx *= 0.78; 
      this.vy *= 0.78;
    } else {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        this.vx -= dx * force * 0.25; 
        this.vy -= dy * force * 0.25;
      }

      this.vx += (Math.random() - 0.5) * 0.15;
      this.vy += (Math.random() - 0.5) * 0.15;

      this.vx *= FRICTION;
      this.vy *= FRICTION;
    }

    this.x += this.vx;
    this.y += this.vy;

    this.alpha = 0.35 + Math.abs(Math.sin(Date.now() * this.pulseSpeed * 0.02)) * 0.65;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.baseColor.replace('ALPHA', this.alpha.toFixed(2));
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

function initApp() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const trigger = document.getElementById('trigger');
  
  if (!ctx || !canvas) return;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles: Particle[] = [];
  let mouse = { x: -2000, y: -2000 };
  let isAssembling = false;

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createSilhouettePoints();
  };

  const createSilhouettePoints = () => {
    particles = [];
    const tempCanvas = document.createElement('canvas');
    const tCtx = tempCanvas.getContext('2d');
    if (!tCtx) return;

    tempCanvas.width = width;
    tempCanvas.height = height;

    tCtx.fillStyle = 'white';
    tCtx.font = `900 ${Math.min(width * 0.18, 220)}px "Inter", sans-serif`;
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText('VIA PRO', width / 2, height / 2);

    const imageData = tCtx.getImageData(0, 0, width, height).data;
    const step = 3; 

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        if (imageData[index + 3] > 140) {
          // Основний колір: RGB(21, 76, 113)
          const variation = (y / height) * 30;
          particles.push(new Particle(x, y, 21, 76 + variation, 113 + variation));
        }
      }
    }

    const remaining = PARTICLE_COUNT - particles.length;
    if (remaining > 0) {
      for (let i = 0; i < remaining; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height, 21, 76, 113));
      }
    }
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', resize);
  
  trigger?.addEventListener('mouseenter', () => isAssembling = true);
  trigger?.addEventListener('mouseleave', () => isAssembling = false);

  const animate = () => {
    // Очищення Canvas білим кольором
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Технічна сітка стала дещо м'якшою для білого фону
    ctx.strokeStyle = 'rgba(21, 76, 113, 0.08)';
    ctx.lineWidth = 0.5;
    const gridSize = 60;
    for (let i = 0; i < width; i += gridSize) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
    }
    for (let i = 0; i < height; i += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
    }

    particles.forEach(p => {
      p.update(mouse.x, mouse.y, isAssembling);
      p.draw(ctx);
    });

    requestAnimationFrame(animate);
  };

  resize();
  animate();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}