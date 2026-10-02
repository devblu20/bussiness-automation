import { services, productVisuals } from "./content";
import { Icon } from "./Icon";

export const servicePages = [
  {
    id: "trading",
    name: "Trading",
    headline: "A clearer view of the markets.",
    description:
      "Custom AI and automation tools for market research, monitoring, and trade records across stocks, forex, and crypto.",
    intro:
      "Turn fragmented market information into a research workflow your team can follow. We build around the sources you use and the decisions you want to prepare for.",
    capabilities: [
      [
        "Market monitoring",
        "Bring selected data feeds and watchlists together, with alerts based on criteria you define.",
      ],
      [
        "Research preparation",
        "Organise research notes and source material into briefs that your team can check before acting.",
      ],
      [
        "Trade journals",
        "Structure trade records and review recurring patterns with consistent reporting.",
      ],
    ],
    example:
      "A daily research brief gathers agreed market inputs, highlights watchlist changes, and links back to sources. Your team checks the information and decides what needs further investigation.",
    scope:
      "These are research and workflow tools. They do not provide investment advice or guarantee trading outcomes. Data availability and licensing shape the project scope.",
  },
  {
    id: "ecommerce",
    name: "Ecommerce",
    headline: "Keep the work behind every order moving.",
    description:
      "Practical ecommerce automation for product information, order updates, stock checks, and customer enquiries.",
    intro:
      "Give your team a more consistent way to handle recurring storefront tasks. We connect agreed tools and build clear handoffs for cases that need a person.",
    capabilities: [
      [
        "Product information",
        "Prepare and organise product details for review, helping your team keep listings consistent.",
      ],
      [
        "Order operations",
        "Bring order status and stock information into a useful workflow, with exceptions flagged for attention.",
      ],
      [
        "Customer enquiries",
        "Draft responses to common order questions using approved information and route unusual requests to your team.",
      ],
    ],
    example:
      "An order-status enquiry is matched to the available order record. A response is prepared from the latest agreed data, while missing details or delivery exceptions are sent to a team member.",
    scope:
      "Available integrations, store permissions, and the quality of order data determine what can be automated. Customer-facing actions and review rules are agreed before launch.",
  },
  {
    id: "marketing",
    name: "Marketing",
    headline: "More room for ideas. Less routine reporting.",
    description:
      "AI-assisted marketing workflows for content preparation, lead follow-ups, and campaign reporting.",
    intro:
      "Bring campaign information and repeatable marketing tasks into a clearer process. Your team keeps control of the message, the audience, and what gets published.",
    capabilities: [
      [
        "Content assistance",
        "Prepare draft content from approved briefs and brand guidance, ready for editorial review.",
      ],
      [
        "Lead follow-ups",
        "Organise incoming enquiries and prepare relevant next steps with agreed ownership and approval rules.",
      ],
      [
        "Campaign reporting",
        "Combine selected channel exports into consistent summaries, flagging gaps and changes worth reviewing.",
      ],
    ],
    example:
      "A weekly campaign summary brings agreed channel metrics together and prepares a first draft of the commentary. Your team checks the numbers, adds context, and chooses the next actions.",
    scope:
      "Workflows depend on channel access, agreed metric definitions, and available data. Content and outreach follow your team's review and consent requirements.",
  },
  {
    id: "operations",
    name: "Business Operations",
    headline: "Make everyday work flow better.",
    description:
      "Business operations automation for document processing, invoice preparation, reminders, approvals, and management reports.",
    intro:
      "Start with the recurring administration that slows your team down. We build focused workflows that keep information organised and make responsibilities clear.",
    capabilities: [
      [
        "Document processing",
        "Extract and organise agreed information from routine documents, with uncertain entries flagged for review.",
      ],
      [
        "Administration and approvals",
        "Prepare invoice details, route requests, and send agreed reminders so the next step has a clear owner.",
      ],
      [
        "Management reports",
        "Bring selected operational information together into a draft report your team can verify and use.",
      ],
    ],
    example:
      "An incoming document is checked for required details and turned into a draft record. Missing information is flagged, and a team member reviews the record before it moves to the next stage.",
    scope:
      "Document formats, system access, and approval responsibilities shape the solution. We agree which actions require review and how exceptions should be handled.",
  },
] as const;

export function getServicePage(pathname: string) {
  const path = pathname.replace(/\/+$/, "");
  return servicePages.find((page) => path === `/services/${page.id}`);
}

export function ServicePage({ page }: { page: (typeof servicePages)[number] }) {
  const visual = productVisuals.find((item) => item.id === page.id)!;
  return (
    <>
      <section className="hero service-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <a className="service-link" href="/#practices">
              ← All practices
            </a>
            <p className="eyebrow">{page.name} / AI & AUTOMATION</p>
            <h1>{page.headline}</h1>
            <p className="hero-description">{page.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Discuss your project <Icon name="ArrowUpRight" size={18} />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
              <img
                src={visual.image}
                alt={visual.alt}
                width="900"
                height="600"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section practices">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HOW WE CAN HELP</p>
              <h2>Built around your workflow.</h2>
            </div>
            <p>{page.intro}</p>
          </div>
          <div className="service-capabilities">
            {page.capabilities.map(([title, text], index) => (
              <article className="story-card" key={title}>
                <p className="eyebrow">0{index + 1}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container practice-story">
          <div className="story-intro">
            <p className="eyebrow">IN PRACTICE</p>
            <h2>One useful starting point.</h2>
            <p>{page.example}</p>
            <p className="fine-print">
              Illustrative workflow, not a customer result.
            </p>
          </div>
          <article className="story-card story-card-after">
            <p className="story-label">MAP / BUILD / REFINE</p>
            <h3>Start with a focused task.</h3>
            <p>
              We map your current process, agree the inputs and review points,
              then build a focused solution. Your team tests it in context
              before we refine or extend it.
            </p>
            <p className="service-scope">{page.scope}</p>
          </article>
        </div>
      </section>
      <section className="section practices">
        <div className="container">
          <p className="eyebrow">EXPLORE MORE</p>
          <h2>Our other practices</h2>
          <div className="service-related">
            {servicePages
              .filter((item) => item.id !== page.id)
              .map((item) => (
                <a
                  className="button button-glass"
                  href={`/services/${item.id}/`}
                  key={item.id}
                >
                  <Icon
                    name={
                      services.find((service) => service.id === item.id)!.icon
                    }
                    size={18}
                  />
                  {item.name}
                  <Icon name="ArrowRight" size={16} />
                </a>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
