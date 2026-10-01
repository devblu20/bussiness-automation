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

export const productVisuals = [
  {
    id: "trading",
    label: "TRADING INTELLIGENCE",
    shortName: "Trading",
    linkLabel: "trading",
    image: "/images/trading-kinetic.png",
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
    image: "/images/ecommerce-kinetic.png",
    alt: "Order parcels in a blue-lit fulfilment centre",
    headline: "Behind every order. Ahead of the routine.",
    description:
      "Connect product information, customer updates, and order operations so your team can focus on the customer.",
  },
  {
    id: "marketing",
    label: "ONLINE MARKETING",
    shortName: "Marketing",
    linkLabel: "marketing",
    image: "/images/marketing-kinetic.png",
    alt: "Marketing analytics screens in a dark workspace",
    headline: "More insight. More room to create.",
    description:
      "Bring campaign information together, prepare useful reports, and support content creation with AI.",
  },
  {
    id: "operations",
    label: "BUSINESS OPERATIONS",
    shortName: "Operations",
    linkLabel: "operations",
    image: "/images/operations-kinetic.png",
    alt: "Colleagues discussing business operations in a modern office",
    headline: "Make the everyday work better.",
    description:
      "Organise documents, simplify administration, and keep approvals moving with people in control.",
  },
] as const;
