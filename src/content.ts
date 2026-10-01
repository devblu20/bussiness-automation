export const services = [
  {
    number: "01",
    id: "trading",
    icon: "Trading",
    label: "FINANCIAL MARKETS",
    title: "Trading intelligence.",
    text: "Custom tools for stocks, forex, and crypto. Bring market data, research, alerts, and trade records into a clearer working day.",
    tags: ["Market monitoring", "Strategy research", "Trade journals"],
    example: "From scattered market data to a focused daily brief.",
  },
  {
    number: "02",
    id: "ecommerce",
    icon: "Commerce",
    label: "ECOMMERCE",
    title: "Commerce that keeps up.",
    text: "Connect the work behind your storefront. Simplify product information, order updates, stock checks, and customer enquiries.",
    tags: ["Order operations", "Product data", "Customer support"],
    example: "From repeated order enquiries to timely customer updates.",
  },
  {
    number: "03",
    id: "marketing",
    icon: "Marketing",
    label: "ONLINE MARKETING",
    title: "More focus. Less admin.",
    text: "Support your marketing team with AI-assisted content, lead follow-ups, and reporting across campaigns and channels.",
    tags: ["Content assistance", "Lead nurturing", "Campaign reporting"],
    example: "From separate campaign exports to one useful summary.",
  },
  {
    number: "04",
    id: "operations",
    icon: "Operations",
    label: "BUSINESS OPERATIONS",
    title: "A better everyday.",
    text: "Take repetitive work off your team’s plate. Organise documents, prepare invoices, send reminders, and keep information moving.",
    tags: ["Document processing", "Internal approvals", "Management reports"],
    example: "From manual document entry to records ready for review.",
  },
] as const;

export const examples = [
  {
    category: "TRADING",
    title: "Start the day with the relevant market context.",
    business: "For traders and market research teams",
    task: "Reviewing watchlists, market updates, and yesterday’s trade notes across several tools.",
    automation:
      "Collect data from authorised sources, flag predefined conditions, and prepare a research brief and trade-journal summary for review.",
    benefit:
      "A more organised research process. Trading decisions remain yours.",
  },
  {
    category: "ECOMMERCE",
    title: "Keep customers informed after checkout.",
    business: "For online stores and commerce teams",
    task: "Checking order statuses and repeatedly answering delivery and return enquiries.",
    automation:
      "Use order data to prepare timely status updates, draft answers to common questions, and route exceptions to the right person.",
    benefit:
      "Less repetitive support work. More attention to customers who need it.",
  },
  {
    category: "ONLINE MARKETING",
    title: "Turn campaign data into a useful next step.",
    business: "For marketing teams and agencies",
    task: "Exporting results from different channels and assembling a weekly performance report.",
    automation:
      "Bring agreed metrics together, highlight changes, and draft a summary for the team to review before making campaign decisions.",
    benefit:
      "More time to improve campaigns. Less time compiling spreadsheets.",
  },
  {
    category: "BUSINESS OPERATIONS",
    title: "Move invoices forward with less manual entry.",
    business: "For finance and administration teams",
    task: "Copying invoice details into records and following up with colleagues for approval.",
    automation:
      "Extract key fields, flag missing information, and prepare a record and approval reminder for the responsible person.",
    benefit:
      "A clearer review process, with people responsible for final approval.",
  },
];

export const questions = [
  [
    "What do you build?",
    "We create custom AI tools and automations for financial trading, ecommerce, online marketing, and everyday business operations. The starting point is a specific business task, the tools you use, and the outcome you need.",
  ],
  [
    "What does trading automation include?",
    "Examples include market monitoring, rule-based alerts, research assistance, strategy testing tools, and trade journals for stocks, forex, or crypto. Scope depends on available data and platform access. These tools do not guarantee returns; research and trading decisions require your own review.",
  ],
  [
    "Can you work with our existing tools?",
    "We start with your current systems. Where APIs, approved integrations, or suitable data exports are available, we can connect them to reduce duplicate work. Compatibility and access are confirmed before a project begins.",
  ],
  [
    "Will AI send messages or make decisions on its own?",
    "That depends on the agreed design. We define review points and permissions with your team, so important customer communication, financial decisions, and approvals stay under appropriate human control.",
  ],
  [
    "How does a project start?",
    "Choose one recurring task and describe how it works today. We assess the information and tools involved, agree a small initial scope, and test the result with your team before expanding.",
  ],
];

export const productVisuals = [
  {
    id: "trading",
    label: "TRADING INTELLIGENCE",
    shortName: "Trading",
    linkLabel: "trading",
    image: "/images/trading.jpg",
    alt: "Financial market analysis displayed on trading screens",
    headline: "A clearer view of the markets.",
    description:
      "Research tools, market monitoring, and trade records. Built for the way you work across stocks, forex, and crypto.",
  },
  {
    id: "ecommerce",
    label: "ECOMMERCE AUTOMATION",
    shortName: "Ecommerce",
    linkLabel: "ecommerce",
    image: "/images/ecommerce-shopping.jpg",
    alt: "A customer shopping online with a laptop and payment card",
    headline: "Behind every order. Ahead of the routine.",
    description:
      "Connect product information, customer updates, and order operations so your team can focus on the customer.",
  },
  {
    id: "marketing",
    label: "ONLINE MARKETING",
    shortName: "Marketing",
    linkLabel: "marketing",
    image: "/images/marketing.jpg",
    alt: "A professional team discussing digital marketing work",
    headline: "More insight. More room to create.",
    description:
      "Bring campaign information together, prepare useful reports, and support content creation with AI.",
  },
  {
    id: "operations",
    label: "BUSINESS OPERATIONS",
    shortName: "Operations",
    linkLabel: "operations",
    image: "/business-team.jpg",
    alt: "Colleagues collaborating at a computer in an office",
    headline: "Make the everyday work better.",
    description:
      "Organise documents, simplify administration, and keep approvals moving with people in control.",
  },
] as const;
