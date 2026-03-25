'use client';

import { useEffect, useRef } from 'react';
import styles from './NetworkBackground.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const NODE_COUNT = 60;
const MAX_DISTANCE = 160;
const ORANGE = '235, 116, 38';

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initParticles = (w: number, h: number) => {
      const isMobile = w < 768;
      particlesRef.current = Array.from({ length: NODE_COUNT }, () => ({
        // Mobile: particule pe toata latimea; Desktop: concentrate dreapta-sus
        x: isMobile
          ? Math.random() * w
          : w * 0.35 + Math.random() * w * 0.65,
        y: isMobile
          ? Math.random() * h * 0.55
          : Math.random() * h * 0.65,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      }));
    };

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas.width = w;
      canvas.height = h;
      initParticles(w, h);
    };

    resize();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const isMobile = w < 768;

      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        const xMin = isMobile ? 0 : w * 0.3;
        const xMax = w;
        const yMin = 0;
        const yMax = isMobile ? h * 0.6 : h * 0.7;

        if (p.x < xMin || p.x > xMax) p.vx *= -1;
        if (p.y < yMin || p.y > yMax) p.vy *= -1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DISTANCE) {
            const alpha = (1 - dist / MAX_DISTANCE) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${ORANGE}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ORANGE}, ${p.opacity})`;
        ctx.fill();
      });

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    // ResizeObserver pentru mobile (mai fiabil decat window resize)
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement ?? canvas);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
