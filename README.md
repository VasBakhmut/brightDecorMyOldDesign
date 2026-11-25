# Bright Decor

Painting and property maintenance website for Bright Decor, Brisbane. Next.js App Router, React and TypeScript.

## Development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Copy `.env.example` to `.env.local` to configure email delivery. Keep credentials out of Git.

```sh
npm test
npm run typecheck
npm run build
npm start
```

## GitHub

Create an empty repository, then run from the project root:

```sh
git init
git branch -M main
git add .
git diff --cached --stat
git commit -m "Initial website release"
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Review staged files before committing. `.gitignore` excludes secrets, dependencies, builds, local editor state, original reference material and review screenshots. Commit `package-lock.json` for reproducible installs. The GitHub workflow runs tests, type checking and a production build on pushes to `main` and pull requests.

## Vercel

Import the GitHub repository as a Vercel project.

| Setting          | Value                            |
| ---------------- | -------------------------------- |
| Framework        | Next.js                          |
| Root directory   | Repository root                  |
| Node.js          | 24.x                             |
| Install command  | `npm ci`                         |
| Build command    | `npm run build`                  |
| Output directory | Next.js default; leave unchanged |

`vercel.json` supplies the framework and commands. Email uses a Node.js route handler; do not configure a static export.

Add environment variables in Vercel Project Settings:

| Variable    | Value                                                         |
| ----------- | ------------------------------------------------------------- |
| `SITE_URL`  | `https://www.brightdecor.com.au` (canonical public origin)    |
| `SMTP_HOST` | SMTP host from your email provider                            |
| `SMTP_PORT` | `587` for STARTTLS or `465` for implicit TLS                  |
| `SMTP_USER` | SMTP username                                                 |
| `SMTP_PASS` | SMTP password                                                 |
| `SMTP_FROM` | Verified sender, e.g. `Bright Decor <max@brightdecor.com.au>` |

Use production credentials for Production. Only enable email in Preview if preview submissions should send real enquiries. Without SMTP configuration, visitors receive a message with phone and email alternatives. Preview deployments return `X-Robots-Tag: noindex, nofollow`. Redeploy after changing environment variables.

All enquiries go to `max@brightdecor.com.au`; replies go to the visitor. Verify the sender with your provider and test delivery before launch. The form includes validation, consent, a honeypot, request-size limits and process-local rate limiting. For cross-instance throttling on Vercel, configure Firewall rate limiting or a shared rate-limit store.

## Domain and launch

1. Add the chosen domain in Vercel and apply the DNS records it provides. Preserve existing MX, SPF, DKIM and DMARC records for business email.
2. Redirect alternate domains and hostnames to the chosen `SITE_URL`.
3. Test email delivery, mobile navigation, service pages and policy links.
4. Confirm contact details, licence information and guarantee conditions with Max. Review policies against the final hosting and email setup.
5. Submit `/sitemap.xml` in Search Console. Keep Google Business Profile details and its logo consistent with the website.

## Content and assets

- `src/lib/content.ts`: homepage services, projects and FAQs.
- `src/lib/service-pages.ts`: six service pages and project descriptions.
- `src/lib/seo.ts`: shared business details and metadata.
- `src/lib/policies.ts`: terms, cookies and accessibility content.
- `src/components/site-shell.tsx`: shared header and footer.
- `public/`: production logos, icons and optimized photographs.

Original photos and the specification remain local and are excluded from Git and Vercel uploads. Runtime assets are already in `public/`. `.vercelignore` also excludes review screenshots, tests, scripts and documentation from direct uploads.

Service pages have canonical URLs, social metadata, linked Service schema, breadcrumbs and related service links. All 12 content pages are in the sitemap. Logos and icons use the Bright Decor artwork.

To verify a running production build:

```sh
npm run build
npm start -- --hostname 127.0.0.1 --port 3002
# In a second terminal:
TEST_BASE_URL=http://127.0.0.1:3002 node scripts/verify-site.mjs
```

In PowerShell, set `$env:TEST_BASE_URL = 'http://127.0.0.1:3002'` before running the verification script.
