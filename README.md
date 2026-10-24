# Tidewell Health: a medFunnels demo app

A fictional telehealth clinic built with Next.js (App Router) and [`@medfunnels/next`](https://www.npmjs.com/package/@medfunnels/next).
Copy any of it into your own app: it's MIT licensed.

It shows the complete integration:

- **Questionnaires** built in [medFunnels](https://www.medfunnels.app), downloaded and signature-checked at build time, and served from this app's own domain in a locked-down sandbox.
- **Answers** validated on this app's server, then handed to your code. They never go to medFunnels.
- **Stop screens** that send ineligible patients to their own page.
- **Funnel analytics (optional):** loads, starts, each screen, completions and conversions, sent as aggregate counts from this server. Never answers or anything that identifies a patient.
- **Conversions:** choosing a plan reports `purchased` with its amount.

> Demo only: not a real clinic. Don't enter real health information.

## Before you start

You need:

- Node.js 20.9 or later.
- A medFunnels workspace on a plan that includes **Integrations** (the Connect plan), with at least one published questionnaire.

## 1. Get your credential from medFunnels

A credential is a client ID and a client secret. This app uses it to download your questionnaires and, if you turn analytics on, to send funnel counts.

1. Sign in to medFunnels and open **Integrations**.
2. Under **Credentials**, click **New credential**.
   - **Name:** something you'll recognize, e.g. `demo-telehealth-app · render`. Use one credential per deployment so you can revoke each on its own.
   - **Scopes:** keep the ticked ones (`questionnaires:read`, `releases:read`, `artifacts:read`). Also tick **`analytics:write`** to try funnel analytics.
   - **Restrict to questionnaires:** leave empty, so every questionnaire shows up in the demo.
3. Click **Create credential**. Copy the **Client ID** (`mfc_…`) and the **client secret** (`mfs_…`).
   **The secret is shown only once.** Keep it in a password manager. If you lose it, revoke the credential and create another.

The secret is server-side only. Never commit it, and never put it in a variable starting with `NEXT_PUBLIC_`.

For analytics, also open **Analytics** in medFunnels, turn it on, and add a conversion named `purchased`.

## 2. Run it on your computer

```bash
npm install
cp .env.example .env.local
```

Open `.env.local` and paste your credential:

```bash
MEDFUNNELS_CLIENT_ID=mfc_…
MEDFUNNELS_CLIENT_SECRET=mfs_…
```

Then:

```bash
npm run configure   # fills medfunnels.config.json with your workspace ID and signing keys
npm run dev         # runs `medfunnels pull` first, then serves http://localhost:3000
```

Your questionnaires run on `localhost` without any website setup. `.env.local` is git-ignored.

**Commit `medfunnels.config.json`** after `npm run configure`. It has no secrets: just your workspace ID and the public keys that releases must be signed with. Before committing, compare the keys with **Integrations → Developer guide**. Your host needs this file, because it builds from your repository.

## 3. Deploy

Deploying takes three steps, in this order:

1. **Create the app on your host** with the two environment variables below. That gives you its web address.
2. **Add that address to your medFunnels websites, then publish again.** Every release is locked to your workspace's websites and won't run anywhere else (except `localhost`). Releases published before you added the address won't run on it.
3. **Redeploy the app** so it pulls the new release. The app only downloads questionnaires when it builds.

### Environment variables

| Variable | Value | Needed |
|---|---|---|
| `MEDFUNNELS_CLIENT_ID` | `mfc_…` from step 1 | Always |
| `MEDFUNNELS_CLIENT_SECRET` | `mfs_…` from step 1. Mark it secret if your host offers that. | Always |
| `MEDFUNNELS_CONVERSION` | Conversion name the plan page reports (default `purchased`) | Optional |
| `MEDFUNNELS_API` | Only if you use a medFunnels deployment other than www.medfunnels.app | Optional |
| `MEDFUNNELS_SITE_ORIGIN` | The website this deployment serves, if your workspace locks releases to its websites | Optional |

Both credential variables are used at **build time**, to download questionnaires, and at **runtime**, to send analytics. Make them available to both. On Render and Vercel they are by default.

### Render

1. In Render, click **New → Web Service** and connect your copy of this repository.
2. Settings:
   - **Language:** Node
   - **Build command:** `npm install && npm run build`. `npm run build` downloads your questionnaires first.
   - **Start command:** `npm start`
3. Under **Environment Variables**, add `MEDFUNNELS_CLIENT_ID` and `MEDFUNNELS_CLIENT_SECRET`. Render uses the Node version in `package.json` (`engines`).
4. Click **Deploy Web Service**. Your address is shown at the top, e.g. `https://tidewell-demo.onrender.com`.
5. In medFunnels → **Integrations → Websites**, add `tidewell-demo.onrender.com`, without `https://`, as your **Live** or **Staging** website. Then publish your questionnaires again in Studio.
6. Back in Render: **Manual Deploy → Deploy latest commit**.

On Render's free plan the app sleeps when idle, so the first visit after a while takes a few seconds.

### Vercel

1. In Vercel, click **Add New → Project** and import your copy of this repository. Vercel detects Next.js; keep the default build settings.
2. Under **Environment Variables**, add `MEDFUNNELS_CLIENT_ID` and `MEDFUNNELS_CLIENT_SECRET` for all environments.
3. Click **Deploy**. Your production address is shown on the project page, e.g. `https://tidewell-demo.vercel.app`.
4. In medFunnels → **Integrations → Websites**, add `tidewell-demo.vercel.app`, without `https://`, as your **Live** or **Staging** website. Then publish your questionnaires again in Studio.
5. Back in Vercel: **Deployments → ⋯ → Redeploy** on the latest production deployment.

Vercel's preview deployments each get their own random address, which isn't one of your websites. Questionnaires only run on the production address (or a custom domain you add as a website).

### When you publish a new version

Redeploy the app. On Render that's **Manual Deploy**; on Vercel it's **Redeploy**. Both hosts can also redeploy automatically from a deploy hook if you want.

### Troubleshooting

| What you see | Why, and what to do |
|---|---|
| Build fails with `Set MEDFUNNELS_CLIENT_ID and MEDFUNNELS_CLIENT_SECRET` | The variables aren't set on the host, or not for builds. |
| Build fails with `needs organizationId and signingKeys` | `medfunnels.config.json` still has placeholders. Run `npm run configure` locally and commit it. |
| Build fails with a signature or `untrusted_key` error | The keys in `medfunnels.config.json` don't match your workspace. Run `npm run configure` again. |
| The questionnaire area stays blank on the deployed site | The site's address isn't one of your medFunnels websites, or you haven't published since adding it. Add it, publish, then redeploy. |
| "No questionnaires yet" | Nothing is published, or the credential is restricted to other questionnaires. Publish, then redeploy. |
| Conversions don't show in medFunnels → Analytics | Turn analytics on there, add the `purchased` conversion, and use a credential with `analytics:write`. |

## Where things are

| File | What it does |
|---|---|
| `medfunnels.config.json` | Workspace ID, pinned signing keys, `"analytics": true`. No secrets. |
| `medfunnels.server.ts` | Creates the server helpers from the verified releases in `.medfunnels/` (written by `medfunnels pull`). |
| `app/medfunnels/[slug]/frame/route.ts` | Serves the questionnaire's sandboxed page. |
| `app/medfunnels/[slug]/submit/route.ts` | Receives validated answers. **This is where your app saves them.** |
| `app/medfunnels/[slug]/events/route.ts` | Forwards funnel counts to medFunnels when analytics is on. |
| `app/start/[slug]/page.tsx` | Renders `<MedFunnelsQuestionnaire>` in a focused visit layout, with redirects for completion and stop screens. |
| `app/start/[slug]/plans/actions.ts` | Reports the conversion with `medfunnels.recordConversion()`. |
| `lib/brand.ts` | The `theme` passed to the questionnaire so it matches the site's colors. |
| `lib/catalog.ts` | The demo treatments and prices; each category starts the questionnaire whose slug or title matches it. |

## License

MIT. See [LICENSE](LICENSE).
