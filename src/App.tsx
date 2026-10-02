import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { services, productVisuals } from "./content";
import "./styles.css";
import { ServicePage, getServicePage } from "./ServicePage";

const links = [
  ["Practices", "practices"],
  ["In practice", "in-practice"],
  ["Approach", "approach"],
] as const;

const steps = [
  {
    number: "01",
    title: "Map",
    image: "/images/approach-map.jpg",
    alt: "Consultant reviewing business notes beside a laptop",
    text: "We start with a recurring task, the people involved, and the tools your team already uses.",
  },
  {
    number: "02",
    title: "Build",
    image: "/images/approach-build.jpg",
    alt: "Specialist working on a laptop in a dark workspace",
    text: "We create a focused solution with clear boundaries and review points where they matter.",
  },
  {
    number: "03",
    title: "Refine",
    image: "/images/approach-refine.jpg",
    alt: "Two colleagues reviewing work together on a laptop",
    text: "Your team tests it in context. We improve its usefulness before extending the work.",
  },
];

function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true">
        A
      </span>
      <span>Aaliden</span>
    </span>
  );
}

export function App({ pathname = "/" }: { pathname?: string }) {
  const servicePage = getServicePage(pathname);
  const home = servicePage ? "/" : "";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 821px)");
    const onResize = () => {
      if (wide.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            href={`${home}#home`}
            aria-label="Aaliden home"
            className="brand-link"
          >
            <Brand />
          </a>
          <nav
            id="site-navigation"
            className={menuOpen ? "site-nav is-open" : "site-nav"}
            aria-label="Main navigation"
          >
            {links.map(([label, id]) => (
              <a
                href={`${home}#${id}`}
                key={id}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact <Icon name="ArrowUpRight" size={15} />
            </a>
          </nav>
          <button
            ref={menuButton}
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={21} />
          </button>
        </div>
      </header>
      <main id="main">
        {servicePage ? (
          <ServicePage page={servicePage} />
        ) : (
          <>
            <section className="hero" id="home">
              <div className="ambient-grid" aria-hidden="true" />
              <div className="hero-sweep" aria-hidden="true" />
              <div className="container hero-grid">
                <div className="hero-copy rise-in">
                  <p className="eyebrow-badge">
                    <span className="signal-dot" /> HUMAN-LED INTELLIGENCE
                  </p>
                  <h1>
                    Less busywork.
                    <br />
                    <span>More possibility.</span>
                  </h1>
                  <p className="hero-description">
                    Aaliden is an AI and automation consultancy building
                    practical solutions for trading, ecommerce, online
                    marketing, and everyday business operations.
                  </p>
                  <div className="hero-actions">
                    <a className="button button-primary" href="#contact">
                      Start a conversation{" "}
                      <Icon name="ArrowUpRight" size={18} />
                    </a>
                    <a className="button button-glass" href="#practices">
                      Explore our practices <Icon name="ArrowRight" size={18} />
                    </a>
                  </div>
                  <p className="hero-aside">Practical AI. People in control.</p>
                </div>
                <div className="hero-visual rise-in">
                  <div className="hero-photo">
                    <img
                      src="/images/hero-business-team.jpg"
                      alt="Business team reviewing data and working together in a modern office"
                      width="1280"
                      height="720"
                      fetchPriority="high"
                    />
                  </div>
                  <p className="hero-image-caption">
                    Technology shaped around the people who use it.
                  </p>
                </div>
              </div>
            </section>
            <section className="section practices" id="practices">
              <div className="container">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">01 / THE PRACTICE</p>
                    <h2>
                      Built for the work
                      <br />
                      <span>that moves business.</span>
                    </h2>
                  </div>
                  <p>
                    Different sectors. The same practical aim: spend less time
                    on routine work and more time on decisions that matter.
                  </p>
                </div>
                <div className="practice-grid">
                  {services.map((service, index) => (
                    <article
                      className="practice-card"
                      id={service.id}
                      key={service.id}
                    >
                      <div className="practice-photo">
                        <img
                          src={productVisuals[index].image}
                          alt={productVisuals[index].alt}
                          width="900"
                          height="600"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="practice-body">
                        <div className="practice-meta">
                          <span className="practice-icon">
                            <Icon name={service.icon} size={17} />
                          </span>
                          <span>{service.label}</span>
                        </div>
                        <h3>{productVisuals[index].shortName}</h3>
                        <p>{service.text}</p>
                        <div className="practice-example">
                          <span>AN EXAMPLE</span>
                          <p>{service.example}</p>
                        </div>
                        <a
                          className="service-link"
                          href={`/services/${service.id}/`}
                        >
                          Explore{" "}
                          {service.id === "operations"
                            ? "Business Operations"
                            : productVisuals[index].shortName}{" "}
                          <Icon name="ArrowRight" size={16} />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            <section className="section in-practice" id="in-practice">
              <div className="container practice-story">
                <div className="story-intro">
                  <p className="eyebrow">02 / IN PRACTICE</p>
                  <h2>
                    From routine
                    <br />
                    <span>to room to think.</span>
                  </h2>
                  <p>
                    A weekly report is one example. The goal is a clearer first
                    draft, with your team still responsible for the final
                    decision.
                  </p>
                  <p className="fine-print">
                    Illustrative example. Capabilities depend on your tools,
                    data access, and agreed project scope.
                  </p>
                </div>
                <div className="story-pair">
                  <article className="story-card">
                    <p className="story-label">BEFORE / THE MANUAL WAY</p>
                    <h3>Assembling the picture.</h3>
                    <ul>
                      <li>Collect figures from separate tools.</li>
                      <li>Copy details into a spreadsheet.</li>
                      <li>Chase gaps and write the same summary again.</li>
                    </ul>
                  </article>
                  <article className="story-card story-card-after">
                    <p className="story-label">AFTER / WITH AUTOMATION</p>
                    <h3>Ready for your review.</h3>
                    <ul>
                      <li>Bring agreed data together.</li>
                      <li>Flag missing details for attention.</li>
                      <li>Prepare a useful draft for your team to approve.</li>
                    </ul>
                  </article>
                </div>
              </div>
            </section>
            <section className="section approach" id="approach">
              <div className="container">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">03 / THE APPROACH</p>
                    <h2>
                      Start small.
                      <br />
                      <span>Make it matter.</span>
                    </h2>
                  </div>
                  <p>
                    We build around real tasks, real constraints, and the people
                    who use the result.
                  </p>
                </div>
                <div className="approach-layout">
                  <div className="approach-photo">
                    <img
                      src="/images/approach-glass.jpg"
                      alt="Glass sphere refracting a delicate cyan grid"
                      width="900"
                      height="900"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="step-grid">
                    {steps.map((step) => (
                      <article className="step-card" key={step.number}>
                        <div className="step-image">
                          <img
                            src={step.image}
                            alt={step.alt}
                            width="900"
                            height="675"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="step-content">
                          <span className="step-number">{step.number}</span>
                          <h3>{step.title}</h3>
                          <p>{step.text}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        <section className="section contact" id="contact">
          <div className="ambient-grid" aria-hidden="true" />
          <div className="container contact-layout">
            <div>
              <p className="eyebrow">04 / YOUR NEXT CHAPTER</p>
              <h2>
                Tell us what
                <br />
                <span>could work better.</span>
              </h2>
              <p>One useful change can be a very good start.</p>
            </div>
            <div className="contact-actions">
              <a
                className="button button-primary"
                href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=Siraj%40aaliden.com&amp;su=Project%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-link-label">
                  <Icon name="Mail" size={18} />
                  Siraj@aaliden.com
                </span>
                <Icon name="ArrowUpRight" size={18} />
              </a>
              <a className="button button-glass" href="tel:+971586307552">
                <span className="contact-link-label">
                  <Icon name="Phone" size={18} />
                  +971 58 630 7552
                </span>
                <Icon name="ArrowUpRight" size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href={`${home}#home`} aria-label="Aaliden home">
                <Brand />
              </a>
              <p>
                Practical AI and automation for trading, ecommerce, marketing,
                and the work behind everyday business.
              </p>
              <span>Practical AI. People in control.</span>
            </div>
            <nav className="footer-column" aria-label="Footer navigation">
              <h2>Explore</h2>
              <a href={`${home}#practices`}>Our practices</a>
              <a href={`${home}#in-practice`}>In practice</a>
              <a href={`${home}#approach`}>Our approach</a>
            </nav>
            <nav className="footer-column" aria-label="Practice areas">
              <h2>Expertise</h2>
              <a href="/services/trading/">Trading</a>
              <a href="/services/ecommerce/">Ecommerce</a>
              <a href="/services/marketing/">Marketing</a>
              <a href="/services/operations/">Business Operations</a>
            </nav>
            <div className="footer-column footer-contact">
              <h2>Get in touch</h2>
              <a
                href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=Siraj%40aaliden.com&amp;su=Project%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="Mail" size={16} />
                Siraj@aaliden.com
              </a>
              <a href="tel:+971586307552">
                <Icon name="Phone" size={16} />
                +971 58 630 7552
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© Aaliden. Built around better work.</span>
            <a className="footer-top" href={servicePage ? "#main" : "#home"}>
              Back to top <Icon name="ArrowUpRight" size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
