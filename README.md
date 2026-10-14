# CASPA™ website

The CASPA™ landing page and marketing website: frontend only. It's built from the
*CASPA™ Landing Page & Marketing Website: Design Handoff* (14 Oct 2026).

CASPA™ is in pilot. The site has one primary action, **Request pilot access**,
and no pricing, sign-up or free-trial wording.

## Stack

- [Astro](https://astro.build) 7, static output: plain HTML and CSS, almost no JavaScript.
  The whole site is about 0.5 MB, well under the handoff's 1 MB-per-page target.
- DM Sans, self-hosted through `@fontsource/dm-sans` (no Google Fonts request).
- Hosted on Vercel; source on GitHub. Every push to `main` deploys to production;
  every pull request gets its own preview link.

## Run it locally

Requires Node 22.12 or later (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # builds to dist/ and runs the content-rules check
npm run preview    # serves the built site
```

## Where things live

```
src/
  content/home.md          Homepage copy (edit this to change wording)
  data/site.ts             Site name, navigation, footer, links
  data/sample-utility.ts   Fictional "Sample Water Utility" data for every mock screen
  data/pilot-form.ts       Form options: sectors, countries, staff ranges
  styles/tokens.css        Colours, type sizes and spacing from the handoff
  styles/global.css        Base styles, buttons, cards
  layouts/BaseLayout.astro Page shell: head, header, footer, closing pilot CTA
  components/              Header, footer, placeholders, pilot CTA
  components/home/         One file per homepage section
  components/screens/      Mock product screens built from the sample data
  pages/                   One file per page (the URL follows the file name)
scripts/check-content.mjs  Content-rules check, runs after every build
brand/                     Logo masters and usage notes (see brand/README.md)
public/brand/              Web-sized logo files used by the header and footer
```

### Editing copy

Homepage wording lives in `src/content/home.md`. It can be edited directly on
GitHub (open the file, click the pencil icon, commit), and Vercel redeploys
within a minute or two. Text in `[square brackets]` is shown on the page as a
dashed placeholder box, so unconfirmed content is always visible as such.

All copy is draft until approved. Framework wording (7Cs, 4Q, SLI, 6Ps,
friction signals) must come from *Business Beyond the Strategic Plan* or
Elijah's confirmed input.

### Sample data

Every mock screen reads from `src/data/sample-utility.ts`, so the figures
agree with each other everywhere. Never use a pilot organisation's real
name, goals or figures.

## Content-rules check

`npm run build` finishes by running `scripts/check-content.mjs` over the built
pages. The build fails if it finds:

- retired or discontinued names (Karis Strategy, Karis Cascade, Cascade Engine,
  Karis Plan, Karis Performance, KarisLearning, Karis D'Cesion)
- general-availability wording (sign up, start free, free trial, no credit card, per-seat pricing)
- unverifiable claims (trusted by, deployed globally, certified practitioners)
- "AI-powered"
- a 7th C other than Controlling

It also reports how many placeholders remain. It can't tell whether a pilot
organisation is identifiable from a description, so the handoff's acceptance
checklist still needs a human review before each page is approved.

## Deploy: GitHub and Vercel

1. **Create the GitHub repository.** On GitHub, create an empty private repository
   (for example `caspa-website`) with no README or .gitignore. Then, in this folder:

   ```bash
   git remote add origin https://github.com/<your-account>/caspa-website.git
   git push -u origin main
   ```

   (The folder already has an initial commit on `main`.)

2. **Import it into Vercel.** In Vercel, choose *Add New → Project*, pick the
   repository and accept the detected settings (Astro; build `npm run build`;
   output `dist`). `vercel.json` already sets security headers, long caching for
   built assets and clean URLs.

3. **Set environment variables** in *Project → Settings → Environment Variables*
   (see `.env.example`):

   | Variable | What it is |
   | --- | --- |
   | `PUBLIC_SITE_URL` | The live address, e.g. `https://caspa.karismind.com`. Used for the sitemap and canonical links. |
   | `PUBLIC_PILOT_FORM_ENDPOINT` | Where the pilot form posts. Leave empty until chosen; the form then says it isn't connected and can't be submitted. |

4. **Add the domain** in *Project → Settings → Domains* once you've decided where
   the site lives (an open question in the handoff).

GitHub Actions (`.github/workflows/ci.yml`) builds every push and pull request,
so a content-rules failure shows up on GitHub before anything is merged.

## The pilot form (frontend only)

This repository has no backend. The form at `/request-pilot-access` posts its
fields to `PUBLIC_PILOT_FORM_ENDPOINT` and, on success, sends the visitor to
`/request-pilot-access/thank-you`. Point it at a hosted form service or a
separate API you control. Whichever you choose, its data storage and the
privacy notice must meet Zambia's Data Protection Act and the law of the other
target markets: confirm with a qualified adviser before launch.

Fields posted: `name`, `email`, `job_title`, `organisation`, `sector`, `country`,
`staff`, `strategic_plan` (`yes` / `no` / `renewing`), `want_to_fix`, `consent`.

## Analytics

None are installed. The handoff asks for privacy-respecting, cookie-light
analytics (visits, form starts, completions) with no advertising trackers.
Add them once a provider is chosen and the privacy notice covers it.

## Still open (from the handoff)

Where the site lives; pilot terms and response promise; the 7Cs story; Balanced
Scorecard perspectives; final Plan and Performance colours; the facilitator
offer; how prominent the author section is; launch markets and languages.
Each one shows as a placeholder on the relevant page.
