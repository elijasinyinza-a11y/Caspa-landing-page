/**
 * Options for the "Request pilot access" form.
 * Markets are OPEN in the handoff: confirm countries and sectors before launch.
 */
export const sectors = [
  'Water and sanitation utility',
  'Energy utility',
  'Government ministry or department',
  'Local authority',
  'State-owned enterprise',
  'Health',
  'Education',
  'Financial services',
  'Non-profit or development organisation',
  'Private company',
  'Other',
];

export const countries = [
  'Zambia',
  'Botswana',
  'Kenya',
  'Malawi',
  'Mozambique',
  'Namibia',
  'South Africa',
  'Tanzania',
  'Uganda',
  'Zimbabwe',
  'Other',
];

export const staffRanges = ['Fewer than 50', '50 to 249', '250 to 999', '1,000 to 4,999', '5,000 or more'];

export const strategicPlanOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'renewing', label: 'Being renewed' },
];
