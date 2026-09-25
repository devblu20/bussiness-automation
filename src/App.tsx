import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Navbar } from "./Navbar";
import { services, examples, questions, trustPoints, industries } from "./content";
import "./styles.css";

function Brand() {
  return (
    <span className="business-brand">
      <span className="business-brand-symbol">
        <Icon name="Building" size={21} />
      </span>
      AutoFlow<span className="brand-dot">.</span>
    </span>
  );
}

export function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("af-theme") || "light",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("af-theme", theme);
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
  return (
    <div className="business-site">
      <Navbar
        brand={<Brand />}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <main>
        <section className="business-hero" id="home">
          <div className="shell hero-layout">
            <div className="hero-copy">
              <p className="business-kicker">Business automation, worldwide</p>
              <h1>
                Everyday automation.
                <br />
                <span>For business, everywhere.</span>
              </h1>
              <p className="business-intro">
                Less time on enquiries, invoices, reminders, and reports. More
                time for your customers and the business you are building.
              </p>
              <p className="hero-support">
                Explore practical ways AI and automation can help teams across
                industries and time zones manage their everyday work.
              </p>
              <div className="hero-actions">
                <a className="business-button" href="#examples">
                  See practical examples <Icon name="ArrowRight" size={17} />
                </a>
                <a className="business-button business-button-outline" href="#approach">
                  How it works
                </a>
              </div>
              <ul className="hero-trust">
                {trustPoints.map((t) => (
                  <li key={t.text}>
                    <Icon name={t.icon as any} size={16} />
                    {t.text}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="hero-photo">
              <img
                src="/business-team.jpg"
                alt="Four colleagues working together at a computer in an office"
                width="1600"
                height="1067"
                fetchPriority="high"
              />
              <figcaption>
                <span className="photo-marker" />
                More time for the work that brings people together.
              </figcaption>
              <div className="hero-photo-badge">
                <Icon name="ShieldCheck" size={18} />
                <div>
                  <strong>Human-reviewed</strong>
                  <span>Always a person in the loop</span>
                </div>
              </div>
            </figure>
          </div>
        </section>
        <section className="industries-strip">
          <div className="shell industries-row">
            <span className="industries-label">Industries featured on this site</span>
            <ul>
              {industries.map((i) => (
                <li key={i.label}>
                  <Icon name={i.icon as any} size={16} />
                  {i.label}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="business-section shell" id="services">
          <div className="business-section-heading">
            <div>
              <p className="business-kicker">What can be automated</p>
              <h2>
                Everyday activities.
                <br />
                Across your business.
              </h2>
            </div>
            <p>
              Focus on the repeatable work that takes up time. Keep your team
              involved where judgement, relationships, and approvals matter.
            </p>
          </div>
          <div className="service-text-grid">
            {services.map((s) => (
              <article key={s.number} className="service-card">
                <div className="service-card-top">
                  <span className="service-icon">
                    <Icon name={s.icon as any} size={19} />
                  </span>
                  <span className="service-number">{s.number}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="business-examples business-section" id="examples">
          <div className="shell">
            <div className="business-section-heading">
              <div>
                <p className="business-kicker">Practical examples</p>
                <h2>
                  Familiar tasks.
                  <br />
                  Across industries.
                </h2>
              </div>
              <p>
                From a local business to an international team, the opportunity
                starts with everyday work. These examples are illustrative, not
                customer case studies.
              </p>
            </div>
            <div className="business-example-grid">
              {examples.map((e) => (
                <article className="business-example" key={e.title}>
                  <div className="example-category">
                    <span>{e.category}</span>
                  </div>
                  <h3>{e.title}</h3>
                  <p className="example-business">{e.business}</p>
                  <div className="example-description">
                    <h4>The everyday task</h4>
                    <p>{e.task}</p>
                    <h4>With automation</h4>
                    <p>{e.automation}</p>
                  </div>
                  <p className="example-benefit">
                    <Icon name="Check" size={17} />
                    {e.benefit}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="business-perspective">
          <div className="shell perspective-layout">
            <div>
              <p className="business-kicker">AI with a clear purpose</p>
              <h2>
                Useful assistance.
                <br />
                Human judgement.
              </h2>
            </div>
            <div>
              <p>
                AI can help make sense of an incoming message, extract details
                from a document, or prepare a first draft. Automation can take
                care of the routine administration around it.
              </p>
              <p>
                Your people remain responsible for important decisions, customer
                relationships, and final approvals.
              </p>
            </div>
          </div>
        </section>
        <section className="business-section shell" id="approach">
          <div className="business-section-heading">
            <div>
              <p className="business-kicker">A practical approach</p>
              <h2>
                Start with one task.
                <br />
                Make a useful difference.
              </h2>
            </div>
            <p>
              A clear business need is the best starting point. Start with the
              tools your team already uses, and keep the changes easy to adopt.
            </p>
          </div>
          <div className="approach-text-grid">
            {[
              [
                "01",
                "Understand the activity",
                "Identify a task that happens often, who handles it, and where time is lost.",
              ],
              [
                "02",
                "Define the right assistance",
                "Decide what can be automated, what information is needed, and where a person should review the result.",
              ],
              [
                "03",
                "Test and refine",
                "Try a small, clearly defined use case. Check accuracy, usefulness, and time saved before expanding.",
              ],
            ].map(([n, title, text]) => (
              <article key={n} className="approach-card">
                <span className="approach-step-badge">{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="business-questions business-section">
          <div className="shell questions-layout">
            <div>
              <p className="business-kicker">A little more context</p>
              <h2>Common questions.</h2>
            </div>
            <div className="faq-list">
              {questions.map(([q, a]) => (
                <details className="faq-item" key={q}>
                  <summary>
                    <span>{q}</span>
                    <Icon name="ChevronDown" size={18} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="business-close shell">
          <div>
            <p className="business-kicker">Make time for what matters</p>
            <h2>
              Which everyday task
              <br />
              would you simplify first?
            </h2>
            <p>
              Start with your most frequent manual activity and consider what a
              better way of working could look like.
            </p>
          </div>
          <a className="business-button" href="#examples">
            Revisit the examples <Icon name="ArrowUpRight" size={17} />
          </a>
        </section>
      </main>
      <footer className="business-footer">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <a href="#home" aria-label="AutoFlow home">
              <Brand />
            </a>
            <p>Automation for everyday business activities.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <nav aria-label="Footer navigation">
              <a href="#services">Services</a>
              <a href="#examples">Examples</a>
              <a href="#approach">Our approach</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4>About this site</h4>
            <p>
              Informational only — no accounts, dashboards, or live
              integrations. Every example is illustrative.
            </p>
          </div>
        </div>
        <div className="shell footer-small">
          <span>© {new Date().getFullYear()} AutoFlow</span>
          <span>Everyday automation. Worldwide.</span>
        </div>
      </footer>
    </div>
  );
}
