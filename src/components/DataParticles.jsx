import React, { useEffect, useRef } from 'react';

// Neuron-like animated network background with glowing nodes, connections, and signal propagation
const DataParticles = ({
  count = 60,
  speed = 0.35,
  color = '#6D5FFD',            // brand indigo
  secondaryColor = '#41EAD4',    // brand mint
  opacity = 0.22,
  connectDistance = 170,
  maxLineWidth = 1.6,
  glow = true,
  pulse = true,
  // neural dynamics
  spawnRate = 2.0,               // pulses per second on average
  propagateProb = 0.3,           // chance to branch at a node
  pulseSpeed = 220,              // px per second along edge
  nodeGlowMs = 900               // node glow decay duration
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const nodes = [];
    let edges = [];
    let adjacency = [];
    let signals = [];
    let lastTime = performance.now();
    let active = true; // pause rendering when off-screen

    // Honor reduced motion preferences
    const reduceMotion = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Resize to CSS rect for crispness
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildGraph = () => {
      nodes.length = 0;
      edges = [];
      adjacency = [];
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          baseRadius: Math.random() * 2 + 0.9,
          phase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? color : secondaryColor,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          firedAt: 0
        });
        adjacency.push([]);
      }
      // Build undirected edges within distance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectDistance) {
            const e = { a: i, b: j, len: Math.max(1, dist) };
            edges.push(e);
            adjacency[i].push({ to: j, edge: e });
            adjacency[j].push({ to: i, edge: e });
          }
        }
      }
    };

    window.addEventListener('resize', () => {
      resizeCanvas();
      buildGraph();
    });
    resizeCanvas();
    buildGraph();

    // If reduced motion, draw a static scene and bail
    if (reduceMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw faint edges
      ctx.lineCap = 'round';
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        const t = 1 - Math.min(1, dist / connectDistance);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = a.color;
        ctx.globalAlpha = Math.max(0, t) * (opacity * 0.4);
        ctx.lineWidth = Math.max(0.2, t * (maxLineWidth * 0.6));
        ctx.stroke();
      }
      // Draw nodes on top
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = opacity * 0.8;
        ctx.fill();
      }
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }

    const drawNode = (n, now) => {
      const firedAgo = n.firedAt ? (now - n.firedAt) : Infinity;
      const glowT = Math.max(0, 1 - firedAgo / nodeGlowMs);
      const radius = (pulse ? n.baseRadius + Math.sin(n.phase) * 0.5 : n.baseRadius) + glowT * 1.2;

      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.globalAlpha = Math.min(1, opacity + 0.15 + glowT * 0.2);
      if (glow) {
        ctx.shadowBlur = 10 + glowT * 8;
        ctx.shadowColor = n.color;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const spawnFromNode = (idx) => {
      const outs = adjacency[idx];
      if (!outs || !outs.length) return;
      const { to, edge } = outs[(Math.random() * outs.length) | 0];
      const direction = Math.random() < 0.5 ? [idx, to] : [to, idx];
      const a = direction[0], b = direction[1];
      const dx = nodes[b].x - nodes[a].x;
      const dy = nodes[b].y - nodes[a].y;
      const len = Math.hypot(dx, dy) || 1;
      signals.push({ a, b, t: 0, len, speed: pulseSpeed, color: nodes[a].color });
      nodes[a].firedAt = performance.now();
    };

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      if (!active) {
        // Skip updates while off-screen to save CPU
        lastTime = now;
        return;
      }
      const dt = Math.min(0.05, (now - lastTime) / 1000); // clamp to 50ms
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move nodes
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (pulse) n.phase += 0.02 + Math.random() * 0.01;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Spawn new signals probabilistically
      if (Math.random() < spawnRate * dt) {
        const idx = (Math.random() * nodes.length) | 0;
        spawnFromNode(idx);
      }

      // Draw faint edges
      ctx.lineCap = 'round';
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        const a = nodes[e.a];
        const b = nodes[e.b];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        const t = 1 - Math.min(1, dist / connectDistance);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = a.color;
        ctx.globalAlpha = Math.max(0, t) * (opacity * 0.55);
        ctx.lineWidth = Math.max(0.2, t * (maxLineWidth * 0.8));
        if (glow) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = a.color;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Update and draw signals
      const nextSignals = [];
      for (let i = 0; i < signals.length; i++) {
        const s = signals[i];
        // advance t relative to current edge length
        const a = nodes[s.a];
        const b = nodes[s.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || s.len;
        s.t += (s.speed * dt) / len;
        if (s.t >= 1) {
          // Arrived at b
          nodes[s.b].firedAt = now;
          // Propagate
          if (Math.random() < propagateProb) {
            const outs = adjacency[s.b];
            if (outs && outs.length) {
              const choice = outs[(Math.random() * outs.length) | 0];
              const nb = choice.to;
              const ddx = nodes[nb].x - nodes[s.b].x;
              const ddy = nodes[nb].y - nodes[s.b].y;
              const llen = Math.hypot(ddx, ddy) || 1;
              nextSignals.push({ a: s.b, b: nb, t: 0, len: llen, speed: s.speed, color: nodes[s.b].color });
            }
          }
        } else {
          // Draw pulse dot and trailing segment
          const px = a.x + dx * s.t;
          const py = a.y + dy * s.t;
          // trailing segment
          ctx.beginPath();
          ctx.moveTo(a.x + dx * Math.max(0, s.t - 0.15), a.y + dy * Math.max(0, s.t - 0.15));
          ctx.lineTo(px, py);
          ctx.strokeStyle = s.color;
          ctx.globalAlpha = 0.7;
          ctx.lineWidth = 2;
          if (glow) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = s.color;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;

          // pulse node at a lightly
          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = 0.9;
          if (glow) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = s.color;
          }
          ctx.fill();
          ctx.shadowBlur = 0;

          nextSignals.push(s);
        }
      }
      signals = nextSignals;

      // Draw nodes on top
      for (let i = 0; i < nodes.length; i++) drawNode(nodes[i], now);
    };

    // Pause animation when canvas is off-screen to save CPU
    const io = new IntersectionObserver((entries) => {
      active = entries[0]?.isIntersecting ?? true;
    }, { threshold: 0.1 });
    io.observe(canvas);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [count, speed, color, secondaryColor, opacity, connectDistance, maxLineWidth, glow, pulse, spawnRate, propagateProb, pulseSpeed, nodeGlowMs]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};

export default DataParticles;
