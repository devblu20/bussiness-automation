import { useEffect, useRef } from "react";

/** Original procedural background. No video, external libraries, or image movement. */
export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const host = canvas.parentElement!;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1,
      height = 1,
      frame = 0,
      last = 0,
      phase = 0;
    let visible = true;
    let pointer = 0;
    let drift = 0;
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const light = document.documentElement.dataset.theme === "light";
      const colour = light ? "77,126,173" : "55,193,245";
      const columns = light ? (width < 700 ? 24 : 38) : width < 700 ? 26 : 42;
      const rows = light ? 11 : 13;
      const points: { x: number; y: number }[][] = [];
      for (let row = 0; row < rows; row++) {
        const depth = row / (rows - 1);
        const spread = 0.5 + depth * 0.95;
        points[row] = [];
        for (let col = 0; col < columns; col++) {
          const u = col / (columns - 1);
          const wave =
            Math.sin(u * 8 + phase + depth * 3) * 27 +
            Math.cos(u * 13 - phase * 0.65 + depth * 5) * 14;
          points[row][col] = {
            x: width * 0.5 + (u - 0.5) * width * spread + drift * depth * 22,
            y:
              height * (light ? 0.7 : 0.6) +
              Math.pow(depth, 1.65) * height * (light ? 0.34 : 0.43) +
              wave * (0.3 + depth) * (light ? 0.55 : 1),
          };
        }
      }
      for (let row = 0; row < rows; row++) {
        const depth = row / (rows - 1);
        for (let col = 0; col < columns; col++) {
          const point = points[row][col];
          context.strokeStyle = `rgba(${colour},${light ? 0.035 + depth * 0.075 : 0.045 + depth * 0.1})`;
          context.lineWidth = 0.7;
          context.beginPath();
          if (col) {
            context.moveTo(points[row][col - 1].x, points[row][col - 1].y);
            context.lineTo(point.x, point.y);
          }
          if (row) {
            context.moveTo(points[row - 1][col].x, points[row - 1][col].y);
            context.lineTo(point.x, point.y);
          }
          context.stroke();
          const pulse = Math.pow(
            Math.max(0, Math.sin(col * 0.37 + row * 0.54 - phase * 2)),
            14,
          );
          context.fillStyle = `rgba(${colour},${light ? ((col + row) % 3 === 0 ? 0.12 + pulse * 0.2 : 0) : 0.12 + pulse * 0.4})`;
          context.beginPath();
          context.arc(
            point.x,
            point.y,
            light ? 0.65 + pulse * 0.4 : 0.75 + pulse,
            0,
            Math.PI * 2,
          );
          context.fill();
        }
      }
      // Small light packets travel along the surface, independent of photographs.
      for (let trail = 0; trail < (light ? 3 : 5); trail++) {
        const row = 2 + trail * 2;
        const position = (phase * 3 + trail * 7.3) % (columns - 1);
        const index = Math.floor(position),
          blend = position - index;
        const a = points[row][index],
          b = points[row][index + 1];
        const x = a.x + (b.x - a.x) * blend,
          y = a.y + (b.y - a.y) * blend;
        if (light) {
          // Small, precise ink-blue points suit a bright background better than luminous blobs.
          context.beginPath();
          context.arc(x, y, 1.6, 0, Math.PI * 2);
          context.fillStyle = "rgba(54,125,177,.4)";
          context.fill();
          continue;
        }
        const glow = context.createRadialGradient(x, y, 0, x, y, 7);
        glow.addColorStop(0, `rgba(${colour},.65)`);
        glow.addColorStop(1, `rgba(${colour},0)`);
        context.fillStyle = glow;
        context.fillRect(x - 7, y - 7, 14, 14);
      }

      // Abstract signal contours: atmosphere only, with no axes, values, or process meaning.
      for (let contour = 0; contour < 2; contour++) {
        const curve = (u: number) => ({
          x: width * u,
          y:
            height * (0.86 + contour * 0.08) +
            Math.sin(u * 6.5 + phase * 0.35 + contour * 1.8) * height * 0.035 +
            Math.sin(u * 11 - phase * 0.2) * 8,
        });
        context.beginPath();
        for (let step = 0; step <= 80; step++) {
          const p = curve(step / 80);
          if (step === 0) context.moveTo(p.x, p.y);
          else context.lineTo(p.x, p.y);
        }
        context.lineWidth = 0.8;
        context.strokeStyle = light
          ? "rgba(65,129,174,.09)"
          : "rgba(92,180,225,.18)";
        context.stroke();
        const head = (phase * 0.055 + contour * 0.48) % 1;
        for (let segment = 0; segment < 10; segment++) {
          const u = head - segment * 0.004;
          if (u < 0.02 || u > 0.98) continue;
          const a = curve(u),
            b = curve(u - 0.004);
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = `rgba(${colour},${(1 - segment / 10) * (light ? 0.18 : 0.48)})`;
          context.lineWidth = 1.3;
          context.stroke();
        }
      }
    };
    const tick = (time: number) => {
      if (time - last > 32) {
        phase += Math.min((time - last) / 1000, 0.05) * 0.28;
        drift += (pointer - drift) * 0.04;
        last = time;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      draw();
      host.dataset.motion =
        visible && !document.hidden && !preference.matches
          ? "running"
          : "paused";
      if (visible && !document.hidden && !preference.matches) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      sync();
    };
    const move = (event: PointerEvent) => {
      pointer =
        (event.clientX - host.getBoundingClientRect().left) / width - 0.5;
    };
    const reset = () => {
      pointer = 0;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(host);
    const appearance = new MutationObserver(sync);
    appearance.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", reset);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      delete host.dataset.motion;
      resizeObserver.disconnect();
      intersection.disconnect();
      appearance.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", reset);
    };
  }, []);
  return (
    <canvas ref={canvasRef} className="network-background" aria-hidden="true" />
  );
}
