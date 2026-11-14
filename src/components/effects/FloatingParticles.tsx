import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // This decorative canvas is loaded only on desktop and outside the first paint.
    const particleCount = 28;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const frameDuration = 1000 / 30;
    let lastFrameAt = 0;
    const animate = (timestamp: number) => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (timestamp - lastFrameAt < frameDuration) return;
      lastFrameAt = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseRadiusSquared = 150 * 150;
      ctx.fillStyle = "rgba(200, 160, 60, 0.3)";

      for (const particle of particles) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared > 0 && distanceSquared < mouseRadiusSquared) {
          const distance = Math.sqrt(distanceSquared);
          const force = (150 - distance) / 150;
          particle.vx -= (dx / distance) * force * 0.1;
          particle.vy -= (dy / distance) * force * 0.1;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.vx += (Math.random() - 0.5) * 0.1;
        particle.vy += (Math.random() - 0.5) * 0.1;

        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > 2) {
          particle.vx = (particle.vx / speed) * 2;
          particle.vy = (particle.vy / speed) * 2;
        }

        if (particle.x < 0) particle.x = canvas.width;
        else if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        else if (particle.y > canvas.height) particle.y = 0;

        ctx.globalAlpha = particle.opacity * 0.6;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw each connection once and batch all lines into one canvas stroke.
      ctx.globalAlpha = 1;
      ctx.beginPath();
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
          const other = particles[otherIndex];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          if (dx * dx + dy * dy < 10000) {
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
          }
        }
      }
      ctx.strokeStyle = "rgba(200, 160, 60, 0.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current !== undefined) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = undefined;
        }
      } else if (animationFrameRef.current === undefined) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (!document.hidden) animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};
