import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Navbar } from "./Navbar";
import { services, examples, questions } from "./content";
import "./styles.css";

const approach = [
  [
    "01",
    "Understand the work.",
    "We map the task, the people involved, and the tools you already use. A clear business need comes first.",
  ],
  [
    "02",
    "Build with purpose.",
    "We define a focused solution, connect the right information, and put review points where they matter.",
  ],
  [
    "03",
    "Test. Refine. Expand.",
    "Your team tests the result in context. We refine accuracy and usefulness before extending it to more tasks.",
  ],
];
function Brand() {
  return (
    <span className="business-brand">
      <span className="business-brand-symbol">
        <Icon name="Layers" size={23} />
      </span>
      AutoFlow<span className="brand-dot">.</span>
    </span>
  );
}

// Progressive enhancement: content remains readable without animation or JavaScript motion support.
function useRevealMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (preference.matches || !entry.target.animate) continue;
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: "translateY(20px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 600, easing: "cubic-bezier(.2,.65,.3,1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (preference.matches)
        animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stop);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
}

export function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("af-theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("af-theme", theme);
    } catch {
      /* Appearance also works without storage. */
    }
  }, [theme]);
  useEffect(() => {
    const resetOldRoute = () => {
      if (location.hash.startsWith("#/")) {
        history.replaceState(
          null,
          "",
          location.pathname + location.search + "#home",
        );
        window.scrollTo(0, 0);
      }
    };
    resetOldRoute();
    window.addEventListener("hashchange", resetOldRoute);
    return () => window.removeEventListener("hashchange", resetOldRoute);
  }, []);
  useRevealMotion();
  return (
    <div className="business-site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar
        brand={<Brand />}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <main id="main">
        <section className="business-hero" id="home">
          <div className="shell hero-layout">
            <div className="hero-copy" data-reveal>
              <p className="business-kicker">
                <span className="eyebrow-line" /> INTELLIGENCE, PUT TO WORK
              </p>
              <h1>
                AI that works.
                <br />
                <span>For your business.</span>
              </h1>
              <p className="hero-support">
                We create AI tools and automations for trading, ecommerce,
                online marketing, and the work that keeps your business moving.
              </p>
              <div className="hero-actions">
                <a className="business-button" href="#services">
                  Explore our expertise <Icon name="ArrowUpRight" size={19} />
                </a>
                <a className="text-link" href="#examples">
                  See it in practice <Icon name="ArrowRight" size={17} />
                </a>
              </div>
              <div className="hero-note">
                <Icon name="Globe" size={17} />
                <span>Built around your business. Wherever you work.</span>
              </div>
            </div>
            <aside
              className="focus-panel"
              aria-label="Our four areas of expertise"
              data-reveal
            >
              <div className="focus-panel-heading">
                <span>FOUR AREAS. ONE FOCUS.</span>
                <Icon name="Layers" size={23} />
              </div>
              <p className="focus-panel-intro">
                Make technology
                <br />
                do the everyday work.
              </p>
              <div className="focus-list">
                {services.map((s) => (
                  <a href={"#" + s.id} key={s.id}>
                    <span className="focus-number">{s.number}</span>
                    <Icon name={s.icon} size={22} />
                    <span>
                      {s.label === "FINANCIAL MARKETS"
                        ? "Trading"
                        : s.label === "BUSINESS OPERATIONS"
                          ? "Business operations"
                          : s.label === "ONLINE MARKETING"
                            ? "Online marketing"
                            : "Ecommerce"}
                    </span>
                    <Icon name="ArrowUpRight" size={17} />
                  </a>
                ))}
              </div>
              <div className="focus-panel-footer">
                <span>YOUR TOOLS. YOUR PROCESSES.</span>
                <span>Connected.</span>
              </div>
            </aside>
          </div>
          <div className="hero-bottom shell">
            <span>BUILT FOR REAL BUSINESS</span>
            <div>
              <span>Custom AI solutions</span>
              <span>Practical automation</span>
              <span>Human oversight</span>
            </div>
          </div>
        </section>
        <section className="business-section shell" id="services">
          <div className="business-section-heading" data-reveal>
            <div>
              <p className="business-kicker">01 — OUR EXPERTISE</p>
              <h2>
                Four areas of focus.
                <br />
                <span>One smarter way to work.</span>
              </h2>
            </div>
            <p>
              From market research to your next customer order, we build around
              the tasks that take up your time and the systems your team relies
              on.
            </p>
          </div>
          <div className="service-grid">
            {services.map((s) => (
              <article
                className={"service-card service-" + s.id}
                id={s.id}
                key={s.id}
                data-reveal
              >
                <div className="service-top">
                  <span className="service-icon">
                    <Icon name={s.icon} size={27} />
                  </span>
                  <span className="service-number">/{s.number}</span>
                </div>
                <p className="service-label">{s.label}</p>
                <h3>{s.title}</h3>
                <p className="service-description">{s.text}</p>
                <ul className="service-tags">
                  {s.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a className="service-example" href={"#example-" + s.id}>
                  <span>{s.example}</span>
                  <Icon name="ArrowUpRight" size={20} />
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className="business-examples business-section" id="examples">
          <div className="shell">
            <div className="business-section-heading" data-reveal>
              <div>
                <p className="business-kicker">
                  02 — POSSIBILITIES IN PRACTICE
                </p>
                <h2>
                  Real tasks.
                  <br />
                  <span>A different working day.</span>
                </h2>
              </div>
              <p>
                You don’t need another complicated system. Start with a familiar
                task and a clear picture of how it could work better.
              </p>
            </div>
            <div className="example-list">
              {examples.map((e, i) => (
                <article
                  className="business-example"
                  id={"example-" + services[i].id}
                  key={e.title}
                  data-reveal
                >
                  <div className="example-heading">
                    <p className="example-category">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {e.category}
                    </p>
                    <h3>{e.title}</h3>
                    <p className="example-business">{e.business}</p>
                  </div>
                  <div className="example-description">
                    <div>
                      <h4>The everyday task</h4>
                      <p>{e.task}</p>
                    </div>
                    <div className="automated-description">
                      <h4>With AI & automation</h4>
                      <p>{e.automation}</p>
                    </div>
                    <p className="example-benefit">
                      <Icon name="Check" size={17} />
                      {e.benefit}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="examples-note">
              Illustrative use cases. Final capabilities depend on your tools,
              data access, and agreed project scope.
            </p>
          </div>
        </section>
        <section className="business-perspective">
          <div className="shell perspective-layout">
            <figure className="team-photo" data-reveal>
              <img
                src="/business-team.jpg"
                alt="Four colleagues working together at a computer"
                width="1600"
                height="1067"
                loading="lazy"
              />
              <figcaption>
                Technology should give people more room to think.
              </figcaption>
            </figure>
            <div className="perspective-copy" data-reveal>
              <p className="business-kicker">PURPOSE BEFORE COMPLEXITY</p>
              <h2>
                Powerful technology.
                <br />
                <span>People in control.</span>
              </h2>
              <p>
                AI can organise information, surface patterns, and prepare a
                first draft. Automation takes care of the repeated steps around
                it.
              </p>
              <p>
                We build in the review points your business needs. Your team
                keeps ownership of important decisions, customer relationships,
                and approvals.
              </p>
              <a className="text-link" href="#approach">
                Our approach <Icon name="ArrowRight" size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="business-section shell" id="approach">
          <div className="business-section-heading" data-reveal>
            <div>
              <p className="business-kicker">03 — HOW WE WORK</p>
              <h2>
                Start focused.
                <br />
                <span>Build on what works.</span>
              </h2>
            </div>
            <p>
              A practical partnership, from understanding the problem to
              building something your team can use.
            </p>
          </div>
          <div className="approach-grid">
            {approach.map(([n, title, text]) => (
              <article key={n} data-reveal>
                <span className="approach-number">{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="business-questions business-section">
          <div className="shell questions-layout">
            <div data-reveal>
              <p className="business-kicker">BEFORE YOU BEGIN</p>
              <h2>
                A little more
                <br />
                <span>clarity.</span>
              </h2>
            </div>
            <div className="faq-list">
              {questions.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span className="faq-plus">
                      <Icon name="Plus" size={20} />
                    </span>
                    <span className="faq-minus">
                      <Icon name="Minus" size={20} />
                    </span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="business-close">
          <div className="shell close-layout" data-reveal>
            <div>
              <p className="business-kicker">YOUR NEXT CHAPTER</p>
              <h2>
                Make more room
                <br />
                for <span>what’s next.</span>
              </h2>
              <p>One useful automation can be a very good start.</p>
            </div>
            <a className="business-button" href="#examples">
              Find your starting point <Icon name="ArrowUpRight" size={20} />
            </a>
          </div>
        </section>
      </main>
      <footer className="business-footer">
        <div className="shell">
          <div className="footer-main">
            <a href="#home" aria-label="AutoFlow home">
              <Brand />
            </a>
            <p>
              AI & automation.
              <br />
              Built around your business.
            </p>
            <nav aria-label="Footer navigation">
              <a href="#services">Expertise</a>
              <a href="#examples">Use cases</a>
              <a href="#approach">Our approach</a>
            </nav>
          </div>
          <div className="footer-small">
            <span>© {new Date().getFullYear()} AutoFlow</span>
            <span>Trading · Ecommerce · Marketing · Operations</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
