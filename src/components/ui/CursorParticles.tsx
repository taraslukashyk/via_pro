import React, { useEffect, useRef } from 'react';

// Константи для налаштування анімації (адаптовано з референсу)
const PARTICLE_COUNT = 800; // Оптимальна кількість для Hero-секції
const MOUSE_RADIUS = 150;
const RETURN_SPEED = 0.05;
const FRICTION = 0.95;

class Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    pulseSpeed: number;

    constructor(x: number, y: number, r: number, g: number, b: number) {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.originX = x;
        this.originY = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 0.5;
        this.color = `rgba(${r}, ${g}, ${b}, ALPHA)`;
        this.alpha = Math.random();
        this.pulseSpeed = 0.02 + Math.random() * 0.05;
    }

    update(mouseX: number, mouseY: number) {
        const dxMouse = mouseX - this.x;
        const dyMouse = mouseY - this.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - distanceMouse) / MOUSE_RADIUS;

            // Притягання до курсора
            this.vx += dxMouse * force * 0.08;
            this.vy += dyMouse * force * 0.08;

            // Орбітальна сила (для ефекту роїння/закручування)
            this.vx += (dyMouse / distanceMouse) * force * 3.5;
            this.vy -= (dxMouse / distanceMouse) * force * 3.5;

            // Хаотичний шум
            this.vx += (Math.random() - 0.5) * 2.0;
            this.vy += (Math.random() - 0.5) * 2.0;
        }

        // М'яке повернення до початкової позиції (повільніше для рою)
        const dxOrigin = this.originX - this.x;
        const dyOrigin = this.originY - this.y;
        this.vx += dxOrigin * (RETURN_SPEED * 0.4);
        this.vy += dyOrigin * (RETURN_SPEED * 0.4);

        this.vx *= FRICTION;
        this.vy *= FRICTION;

        this.x += this.vx;
        this.y += this.vy;

        // Пульсація прозорості
        this.alpha = 0.2 + Math.abs(Math.sin(Date.now() * this.pulseSpeed * 0.01)) * 0.6;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color.replace('ALPHA', this.alpha.toFixed(2));
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

export const CursorParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: -2000, y: -2000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

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

                // Розподіл кольорів: ~70% синіх, ~30% жовтих
                const isYellow = Math.random() > 0.7;

                if (isYellow) {
                    // Жовтий/Золотий: RGB(255, 185, 0) - приклад акцентного
                    particles.current.push(new Particle(x, y, 255, 185, 0));
                } else {
                    // Синій: RGB(24, 76, 113) - акцентний колір компанії
                    particles.current.push(new Particle(x, y, 24, 76, 113));
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.current.x = -2000;
            mouse.current.y = -2000;
        };

        const animate = () => {
            // Очищення Canvas прозорим кольором, щоб зберегти фон сайту
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach(p => {
                p.update(mouse.current.x, mouse.current.y);
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ mixBlendMode: 'multiply', opacity: 0.8 }}
        />
    );
};
