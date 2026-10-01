import { useEffect, useRef } from "react";

type Area = "trading" | "ecommerce" | "marketing" | "operations";

/** Decorative service signatures, separate from product or workflow demonstrations. */
export function ServiceAtmosphere({ area }: { area: Area }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const card = element?.closest<HTMLElement>(".service-card");
    if (!element || !card) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let visible = false,
      frame = 0,
      x = 0,
      y = 0;
    const sync = () => {
      element.dataset.active = String(
        visible && !document.hidden && !motion.matches,
      );
      if (motion.matches) card.removeAttribute("data-spotlight");
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    const move = (event: PointerEvent) => {
      if (motion.matches || !finePointer.matches) return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${x - box.left}px`);
        card.style.setProperty("--spot-y", `${y - box.top}px`);
        card.dataset.spotlight = "true";
        frame = 0;
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      card.removeAttribute("data-spotlight");
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      leave();
      card.style.removeProperty("--spot-x");
      card.style.removeProperty("--spot-y");
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`service-atmosphere atmosphere-${area}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 100" fill="none" focusable="false">
        {area === "trading" && (
          <>
            <path
              className="signature-grid"
              d="M10 25H150M10 50H150M10 75H150"
            />
            <path
              className="signature-line"
              d="M10 62C22 62 22 37 36 43S51 75 65 57 76 28 91 37 108 64 121 39 140 25 150 30"
            />
            <g className="signature-drift">
              <path d="M30 71V83M65 76V87M101 70V85M133 73V82" />
              <circle cx="91" cy="37" r="3" className="signature-point" />
            </g>
          </>
        )}
        {area === "ecommerce" && (
          <>
            <g className="signature-float">
              <rect
                x="28"
                y="24"
                width="42"
                height="54"
                rx="6"
                transform="rotate(-12 49 51)"
              />
              <path d="M35 63L57 59" />
            </g>
            <g className="signature-float signature-offset">
              <rect
                x="88"
                y="17"
                width="42"
                height="54"
                rx="6"
                transform="rotate(12 109 44)"
              />
              <path d="M98 55L120 60" />
            </g>
            <circle cx="80" cy="80" r="2" className="signature-point" />
          </>
        )}
        {area === "marketing" && (
          <>
            <g className="signature-breathe">
              <ellipse
                cx="80"
                cy="50"
                rx="57"
                ry="22"
                transform="rotate(-23 80 50)"
              />
              <ellipse
                cx="80"
                cy="50"
                rx="38"
                ry="14"
                transform="rotate(-23 80 50)"
              />
            </g>
            <path className="signature-grid" d="M25 78L133 21" />
            <circle cx="80" cy="50" r="3" className="signature-point" />
            <circle
              cx="126"
              cy="30"
              r="2"
              className="signature-point signature-drift"
            />
          </>
        )}
        {area === "operations" && (
          <>
            <g className="signature-drift">
              <path d="M28 32L82 20 131 34 78 46Z" />
              <path d="M28 48L78 62 131 50" />
            </g>
            <g className="signature-float signature-offset">
              <path d="M28 64L78 78 131 66" />
            </g>
            <circle cx="78" cy="46" r="2" className="signature-point" />
          </>
        )}
      </svg>
    </div>
  );
}
