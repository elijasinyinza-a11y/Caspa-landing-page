/**
 * Site-wide settings: names, navigation and links.
 * Product names follow the handoff: CASPA™ for the product; Strategy, Cascade,
 * Plan and Performance for its components. Never use retired names.
 */
export const site = {
  name: 'CASPA™',
  title: 'CASPA™ | Strategy execution, traced from goal to desk',
  description:
    'CASPA™ connects every budget line, KPI and staff objective to the strategic goal it serves, and flags where the chain breaks.',
  status: 'Pilot',
  primaryAction: { label: 'Request pilot access', href: '/request-pilot-access' },

  // OPEN in the handoff: links to the KarisMind™ site and the book.
  karisMindUrl: '#', // [KarisMind™ site URL, to be confirmed]
  bookUrl: '#', // [Where to buy or read Business Beyond the Strategic Plan]

  // OPEN in the handoff: legal entity name for the footer.
  legalEntity: '[Legal entity, to be confirmed]',
} as const;

export const mainNav = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Components', href: '/components' },
  { label: 'For your role', href: '/for-your-role' },
  { label: 'Integrity checker', href: '/integrity-checker' },
  { label: 'Security and data', href: '/security-and-data' },
  { label: 'About', href: '/about' },
] as const;

export const footerNav = [
  { label: 'Privacy notice', href: '/privacy' },
  { label: 'Terms of use', href: '/terms' },
  { label: 'Contact', href: '/request-pilot-access' },
] as const;

/** Component identity. Colours are for labels and top bars only. */
export const components = {
  strategy: { name: 'Strategy', color: 'var(--strategy)' },
  cascade: { name: 'Cascade', color: 'var(--cascade)' },
  plan: { name: 'Plan', color: 'var(--plan)' },
  performance: { name: 'Performance', color: 'var(--performance)' },
} as const;

export type ComponentKey = keyof typeof components;
