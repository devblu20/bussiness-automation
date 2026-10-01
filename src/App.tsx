import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Navbar } from "./Navbar";
import { NetworkBackground } from "./NetworkBackground";
import { services, examples, questions, productVisuals } from "./content";
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
      Aaliden
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
              { opacity: 0, transform: "translateY(14px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 720,
              delay: Number(
                (entry.target as HTMLElement).dataset.revealDelay || 0,
              ),
              fill: "backwards",
              easing: "cubic-bezier(.2,.65,.3,1)",
            },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal-children]").forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        (child as HTMLElement).dataset.revealDelay = String(index * 65);
        observer.observe(child);
      });
    });
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
      return localStorage.getItem("aaliden-theme") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("aaliden-theme", theme);
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
          <NetworkBackground />
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="shell hero-intro" data-reveal-children>
            <p className="business-kicker">
              <span /> INTELLIGENCE MEETS EXECUTION
            </p>
            <h1>
              AI that works.
              <br />
              <span>Business that moves.</span>
            </h1>
            <p className="hero-description">
              Custom AI and automation for financial trading, ecommerce, online
              marketing, and the everyday work that keeps your business moving.
            </p>
            <div className="hero-actions">
              <a className="business-button" href="#services">
                Explore our expertise <Icon name="ArrowUpRight" size={18} />
              </a>
              <a className="hero-secondary" href="#examples">
                See it in practice <Icon name="ArrowRight" size={18} />
              </a>
            </div>
            <div className="hero-specialisms" aria-label="Our expertise">
              {services.map((service) => (
                <a href={"#" + service.id} key={service.id}>
                  <Icon name={service.icon} size={17} />
                  {
                    productVisuals.find((item) => item.id === service.id)
                      ?.shortName
                  }
                </a>
              ))}
            </div>
          </div>
          <div className="hero-bottom shell">
            <span>CUSTOM SYSTEMS. CONNECTED POSSIBILITIES.</span>
            <span>
              Built for teams worldwide <Icon name="Globe" size={15} />
            </span>
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
            {services.map((s, index) => (
              <article
                className={"service-card service-" + s.id}
                id={s.id}
                key={s.id}
                data-reveal-delay={(index % 2) * 90}
                data-reveal
              >
                <div className="service-photo">
                  <img
                    src={productVisuals[index].image}
                    alt={productVisuals[index].alt}
                    width="1600"
                    height="1067"
                    loading="lazy"
                  />
                  <span className="service-photo-label">{s.label}</span>
                </div>
                <div className="service-content">
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
                </div>
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
            <a href="#home" aria-label="Aaliden home">
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
            <span>© {new Date().getFullYear()} Aaliden</span>
            <span>Trading · Ecommerce · Marketing · Operations</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
