import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { services, productVisuals } from "./content";
import "./styles.css";

const links = [
  ["Practice", "services"],
  ["In practice", "story"],
  ["Approach", "approach"],
] as const;
const approach = [
  [
    "01",
    "Start with the work.",
    "We listen to your team, understand the recurring task, and identify where a little intelligence could make a meaningful difference.",
  ],
  [
    "02",
    "Build with intention.",
    "We connect the right tools and information, define clear boundaries, and make space for human review.",
  ],
  [
    "03",
    "Refine in the real world.",
    "Your team tests the solution in context. We improve what matters before extending it to more of your business.",
  ],
];
function useEditorialMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const picture = document.querySelector<HTMLElement>(".hero-photo");
    const hero = document.querySelector<HTMLElement>(".editorial-hero");
    let frame = 0,
      inView = true;
    const update = () => {
      frame = 0;
      if (!picture || !hero) return;
      const offset = preference.matches
        ? 0
        : Math.max(
            -24,
            Math.min(24, -hero.getBoundingClientRect().top * 0.045),
          );
      picture.style.setProperty("--parallax", `${offset}px`);
    };
    const scroll = () => {
      if (!preference.matches && inView && !frame)
        frame = requestAnimationFrame(update);
    };
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            reveal.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      if (
        !preference.matches &&
        element.getBoundingClientRect().top > window.innerHeight
      ) {
        element.classList.add("reveal-ready");
        reveal.observe(element);
      } else element.classList.add("is-visible");
    });
    const sync = () => {
      if (preference.matches) {
        elements.forEach((element) => element.classList.add("is-visible"));
        cancelAnimationFrame(frame);
        frame = 0;
        update();
      }
      if (hero)
        hero.dataset.motion =
          inView && !document.hidden && !preference.matches
            ? "running"
            : "paused";
    };
    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    if (hero) visibility.observe(hero);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("scroll", scroll, { passive: true });
    sync();
    return () => {
      reveal.disconnect();
      visibility.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
}
export function App() {
  const [menu, setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEditorialMotion();
  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 801px)");
    const resize = () => {
      if (wide.matches) setMenu(false);
    };
    window.addEventListener("keydown", close);
    wide.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", close);
      wide.removeEventListener("change", resize);
    };
  }, [menu]);
  return (
    <div className="editorial-page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#home" aria-label="Aaliden home">
            Aaliden
            <span className="wordmark-star" aria-hidden="true">
              ✳
            </span>
          </a>
          <span className="header-note">
            INDEPENDENT THINKING.
            <br />
            INTELLIGENT SYSTEMS.
          </span>
          <nav
            id="main-nav"
            className={menu ? "main-nav is-open" : "main-nav"}
            aria-label="Main navigation"
          >
            {links.map(([name, id]) => (
              <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
                {name}
              </a>
            ))}
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMenu(false)}
            >
              Let’s talk <Icon name="ArrowUpRight" size={15} />
            </a>
          </nav>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-expanded={menu}
            aria-controls="main-nav"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close menu" : "Open menu"}
          >
            <Icon name={menu ? "X" : "Menu"} size={23} />
          </button>
        </div>
      </header>
      <main id="main">
        <section className="editorial-hero shell" id="home">
          <div className="hero-heading" data-reveal>
            <p className="eyebrow">
              <span className="index">A / 01</span> PRACTICAL AI & AUTOMATION
            </p>
            <h1>
              Less busywork.
              <br />
              More <em>possibility.</em>
            </h1>
            <div className="hero-introduction">
              <p>
                Intelligent tools for the work that matters.
                <br />
                We build AI and automation around your business,
                <br className="desktop-break" /> so your people can get back to
                moving it forward.
              </p>
              <a className="button" href="#contact">
                Start a conversation <Icon name="ArrowUpRight" size={18} />
              </a>
            </div>
          </div>
          <div className="hero-scene" data-reveal>
            <figure className="hero-photo editorial-photo">
              <img
                src="/images/marketing.jpg"
                alt="An overhead view of a team reviewing documents and screens around a shared workspace"
                width="1600"
                height="1067"
                fetchPriority="high"
              />
              <figcaption>
                <span>THE WORK, RECONSIDERED.</span>
                <span>FIELD NOTES / AALIDEN</span>
              </figcaption>
            </figure>
            <span className="orbit-label orbit-one">Human judgement.</span>
            <span className="orbit-label orbit-two">Machine precision.</span>
            <aside
              className="approval-card"
              aria-label="Illustrative human approval"
            >
              <div className="approval-top">
                <span>THE HUMAN CHECKPOINT</span>
                <Icon name="Check" size={18} />
              </div>
              <p>
                Intelligence assists.
                <br />
                <em>You decide.</em>
              </p>
              <div className="approval-bottom">
                <span className="approval-dot" /> Built around your team
              </div>
            </aside>
          </div>
          <div className="hero-caption">
            <span>Thoughtful technology. Useful outcomes.</span>
            <a href="#services">
              Explore our practice <Icon name="ArrowRight" size={15} />
            </a>
          </div>
        </section>
        <div className="sector-strip">
          <div className="shell">
            <span className="eyebrow">OUR FOCUS</span>
            {[
              "Financial markets",
              "Ecommerce",
              "Online marketing",
              "Business operations",
            ].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
        <section className="section shell" id="services">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">
                <span className="index">01 / THE PRACTICE</span>
              </p>
              <h2>
                Four disciplines.
                <br />
                <em>One practical mindset.</em>
              </h2>
            </div>
            <p>
              From market research to the next customer order, we focus on the
              work behind the work. Clear problems. Thoughtful tools. A more
              useful working day.
            </p>
          </div>
          <div className="practice-grid">
            {services.map((service, index) => (
              <article
                className={"practice-card practice-" + service.id}
                id={service.id}
                key={service.id}
                data-reveal
              >
                <a
                  className="practice-image editorial-photo"
                  href="#story"
                  aria-label={
                    "Explore " +
                    productVisuals[index].shortName +
                    " automation examples"
                  }
                >
                  <img
                    src={productVisuals[index].image}
                    alt={productVisuals[index].alt}
                    width="1600"
                    height="1067"
                    loading="lazy"
                  />
                  <span className="practice-number">/{service.number}</span>
                  <div className="practice-image-title">
                    <h3>{productVisuals[index].shortName}</h3>
                    <span className="circle-arrow">
                      <Icon name="ArrowUpRight" size={23} />
                    </span>
                  </div>
                </a>
                <div className="practice-copy">
                  <p>{service.text}</p>
                  <ul>
                    {service.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section story-section" id="story">
          <div className="shell">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">
                  <span className="index">02 / IN PRACTICE</span>
                </p>
                <h2>
                  Same business.
                  <br />
                  <em>A different working day.</em>
                </h2>
              </div>
              <p>
                Take a familiar example: the weekly business report. The goal
                isn’t more software. It’s less time piecing things together.
              </p>
            </div>
            <div className="comparison" data-reveal>
              <article>
                <div className="comparison-label">
                  <span>BEFORE</span>
                  <span>01 — THE MANUAL WAY</span>
                </div>
                <h3>
                  A morning spent
                  <br />
                  chasing the numbers.
                </h3>
                <ul>
                  <li>Download reports from separate tools.</li>
                  <li>Copy figures into a spreadsheet.</li>
                  <li>Chase missing information.</li>
                  <li>Write the same summary again.</li>
                </ul>
                <p className="comparison-note">
                  Your team assembles the information.
                </p>
              </article>
              <article className="comparison-after">
                <div className="comparison-label">
                  <span>AFTER</span>
                  <span>02 — WITH AUTOMATION</span>
                </div>
                <h3>
                  A clear first draft.
                  <br />
                  Ready for your judgement.
                </h3>
                <ul>
                  <li>Agreed data brought together automatically.</li>
                  <li>Missing details flagged for attention.</li>
                  <li>A useful summary prepared for review.</li>
                  <li>Your team approves what gets shared.</li>
                </ul>
                <p className="comparison-note">
                  Your team focuses on what it means.
                </p>
              </article>
            </div>
            <p className="fine-print">
              An illustrative example. Capabilities depend on your tools, data
              access, and agreed project scope.
            </p>
          </div>
        </section>
        <section className="principle-section shell" data-reveal>
          <p className="eyebrow">
            <span className="index">OUR GUIDING PRINCIPLE</span>
          </p>
          <span className="editorial-asterisk" aria-hidden="true">
            ✳
          </span>
          <h2>
            Let technology
            <br />
            do the heavy lifting.
            <br />
            <em>Keep people in control.</em>
          </h2>
          <p>
            AI can organise, surface patterns, and prepare a first draft.
            <br />
            Your people bring context, judgement, and the final say.
          </p>
        </section>
        <section className="section shell approach-section" id="approach">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">
                <span className="index">03 / THE APPROACH</span>
              </p>
              <h2>
                Start small.
                <br />
                <em>Make it matter.</em>
              </h2>
            </div>
            <p>
              A focused partnership, from understanding the everyday problem to
              building something your team can actually use.
            </p>
          </div>
          <div className="approach-grid">
            {approach.map(([number, title, text]) => (
              <article key={number} data-reveal>
                <span className="approach-number">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="shell contact-layout" data-reveal>
            <div>
              <p className="eyebrow">
                <span className="index">04 / YOUR NEXT CHAPTER</span>
              </p>
              <h2>
                What could your
                <br />
                business do with
                <br />
                <em>a little more room?</em>
              </h2>
              <p>Tell us about the work you’d like to change.</p>
            </div>
            <address>
              <a
                href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=Siraj%40aaliden.com&amp;su=Project%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WRITE TO US</span>
                <strong>Siraj@aaliden.com</strong>
                <Icon name="ArrowUpRight" size={23} />
              </a>
              <a href="tel:+971586307552">
                <span>GIVE US A CALL</span>
                <strong>+971 58 630 7552</strong>
                <Icon name="ArrowUpRight" size={23} />
              </a>
              <p>A conversation is a good place to start.</p>
            </address>
          </div>
        </section>
      </main>
      <footer className="site-footer shell">
        <div>
          <a href="#home" className="wordmark">
            Aaliden
            <span className="wordmark-star" aria-hidden="true">
              ✳
            </span>
          </a>
          <p>
            Practical intelligence.
            <br />
            Built around your business.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#services">Practice</a>
          <a href="#story">In practice</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer-bottom">
          <span>© Aaliden {new Date().getFullYear()}</span>
          <span>INDEPENDENT THINKING. INTELLIGENT SYSTEMS.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
