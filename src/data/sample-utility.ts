/**
 * Fictional sample organisation used in every product illustration.
 * Content rule: screenshots and mock screens use fictional data only, and the
 * figures must agree with each other. Change them here, not in components.
 *
 * Consistency checks:
 * - Activity A2.1.3-04 is 12 km = 6 km (Network Engineer) + 6 km (Works Supervisor).
 * - Progress 3.8 km overall = 3.8 km on the Network Engineer's objective.
 * - Budget lines total 1,850,000 + 420,000 = 2,270,000.
 * - Goal G4 has no funded activity, matching the advisory finding.
 */
import type { ComponentKey } from './site';

export const org = { name: 'Sample Water Utility', currency: 'ZMW', year: 'FY2027' };

export const goals = {
  G1: 'Expand access to safe water',
  G2: 'Reduce non-revenue water',
  G3: 'Strengthen financial sustainability',
  G4: 'Improve customer service',
} as const;

/** The hero's line of sight, top to bottom. */
export const lineOfSight: { component: ComponentKey; level: string; text: string }[] = [
  { component: 'strategy', level: 'Goal', text: 'G2 Reduce non-revenue water to 30% by 2028' },
  { component: 'cascade', level: 'Objective', text: 'O2.1 Cut physical losses in the distribution network' },
  { component: 'cascade', level: 'KPI', text: 'K2.1.3 Non-revenue water, 35% of system input in FY2027' },
  { component: 'cascade', level: 'Activity', text: 'A2.1.3-04 Replace 12 km of distribution mains, Zone B' },
  { component: 'plan', level: 'Budget line', text: 'B-0412 Pipes and fittings, Zone B: ZMW 1,850,000' },
  { component: 'performance', level: 'Contract objective', text: 'Network Engineer: replace 6 km of mains in Zone B by end of Q2' },
];

export const activity = {
  code: 'A2.1.3-04',
  title: 'Replace 12 km of distribution mains, Zone B',
  owner: 'Network Engineer',
  progress: '3.8 of 12 km',
  strategy: { goal: 'G2', goalName: goals.G2, objective: 'O2.1' },
  cascade: { kpi: 'K2.1.3, non-revenue water', baseline: '42%', target: '35%' },
  budgetLines: [
    { code: 'B-0412', name: 'Pipes and fittings', amount: 1_850_000 },
    { code: 'B-0413', name: 'Contract labour', amount: 420_000 },
  ],
  contracts: [
    { role: 'Network Engineer', text: '6 km by end of Q2, 3.8 km done' },
    { role: 'Works Supervisor', text: '6 km by end of Q4, not started' },
  ],
};

export type Severity = 'block' | 'advisory';

export const findings: { severity: Severity; title: string; detail: string }[] = [
  {
    severity: 'block',
    title: 'Budget line B-0431 Vehicle hire has no activity',
    detail: "The budget can't be submitted until this line is attached to an activity or removed.",
  },
  {
    severity: 'advisory',
    title: 'KPI K3.2.1 Collection efficiency has no owner',
    detail: 'Assign an owner before targets are cascaded to teams.',
  },
  {
    severity: 'advisory',
    title: `Goal G4 ${goals.G4} has no funded activity`,
    detail: 'Fund an existing activity or add one in this budget round.',
  },
];

export type Health = 'on-track' | 'at-risk' | 'unfunded';

export const goalHealth: { code: string; name: string; onSchedule: number | null; health: Health }[] = [
  { code: 'G1', name: goals.G1, onSchedule: 78, health: 'on-track' },
  { code: 'G2', name: goals.G2, onSchedule: 52, health: 'at-risk' },
  { code: 'G3', name: goals.G3, onSchedule: 71, health: 'on-track' },
  { code: 'G4', name: goals.G4, onSchedule: null, health: 'unfunded' },
];

export const team = {
  name: 'Zone B team',
  supervisor: 'Works Supervisor',
  members: [
    { role: 'Network Engineer', objectives: 3, review: 'Done' },
    { role: 'Plumber I', objectives: 2, review: 'Done' },
    { role: 'Plumber II', objectives: 2, review: 'Due 30 Oct' },
    { role: 'Meter Reader', objectives: 2, review: 'Done' },
  ],
};

export const employeeContract = {
  role: 'Network Engineer',
  objective: 'Replace 6 km of mains in Zone B by end of Q2',
  done: 3.8,
  target: 6,
  unit: 'km',
  trace: [
    { component: 'cascade' as ComponentKey, text: 'Activity A2.1.3-04, mains replacement' },
    { component: 'cascade' as ComponentKey, text: 'KPI K2.1.3, non-revenue water' },
    { component: 'cascade' as ComponentKey, text: 'Objective O2.1, cut physical losses' },
    { component: 'strategy' as ComponentKey, text: 'Goal G2, reduce non-revenue water' },
  ],
};

export const formatAmount = (n: number) => n.toLocaleString('en-GB');
