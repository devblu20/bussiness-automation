import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";

const links = [
  ["Home", "home"],
  ["Services", "services"],
  ["Examples", "examples"],
  ["Our approach", "approach"],
];
export function Navbar({
  brand,
  theme,
  onToggleTheme,
}: {
  brand: ReactNode;
  theme: string;
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      let current = "home";
      for (const [, id] of links) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 160) current = id;
      }
      setActive(current);
    };
    const scroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 961px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", escape);
    desktop.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);
  const choose = (id: string) => {
    setActive(id);
    setOpen(false);
  };
  return (
    <>
      <header className="refined-header">
        <div className="refined-nav shell">
          <a
            className="refined-brand"
            href="#home"
            aria-label="AutoFlow home"
            onClick={() => choose("home")}
          >
            {brand}
            <span className="brand-descriptor">Business automation</span>
          </a>
          <nav
            id="business-navigation"
            className={"refined-links " + (open ? "expanded" : "")}
            aria-label="Main navigation"
          >
            {links.map(([label, id]) => (
              <a
                key={id}
                href={"#" + id}
                className={active === id ? "current" : ""}
                aria-current={active === id ? "location" : undefined}
                onClick={() => choose(id)}
              >
                <span>{label}</span>
                <Icon name="ArrowUpRight" size={17} />
              </a>
            ))}
            <div className="mobile-nav-action">
              <a href="#examples" onClick={() => choose("examples")}>
                Explore the examples <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          </nav>
          <div className="refined-actions">
            <button
              className="appearance-button"
              type="button"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              title={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              onClick={onToggleTheme}
            >
              <Icon name={theme === "light" ? "Moon" : "Sun"} size={18} />
            </button>
            <span className="nav-divider" />
            <a
              className="nav-primary"
              href="#examples"
              onClick={() => choose("examples")}
            >
              Explore examples <Icon name="ArrowUpRight" size={16} />
            </a>
            <button
              ref={toggle}
              type="button"
              className={"nav-menu-button " + (open ? "active" : "")}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="business-navigation"
              onClick={() => setOpen(!open)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <Icon name={open ? "X" : "Menu"} size={19} />
            </button>
          </div>
        </div>
      </header>
      {open && (
        <button
          className="nav-dismiss"
          type="button"
          aria-label="Dismiss navigation"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
