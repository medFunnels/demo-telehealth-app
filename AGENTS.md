<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent guide: Tidewell (medFunnels demo telehealth app)

Next.js 16 App Router, React 19, TypeScript (strict). Read README.md for setup and deployment.

## Commands
- `npm run dev`: runs `medfunnels pull` first (needs `.env.local`; copy `.env.example`), then `next dev`.
- `npm run typecheck`: must pass before you finish any change.
- `npm run build`: run it for changes to routing, config, or server/client boundaries.
- Don't run `npm run configure` unless asked. It rewrites `medfunnels.config.json`.

## Layout
- `app/(site)/`: marketing pages, sharing the site header and footer. New public pages (blog, about, legal) go here.
- `app/start/[slug]/`: the intake flow (questionnaire → plans → welcome / not-eligible). Minimal layout, no site nav.
- `app/medfunnels/[slug]/`: route handlers for the questionnaire frame, submit, and events. Keep them thin.
- `components/`: presentational components only, with no data fetching.
- `lib/`: data and domain logic, one module per concern (`programs`, `catalog`, `plans`, `brand`).
- `medfunnels.server.ts`: the server-only medFunnels instance.
- Generated, never edit or commit: `.medfunnels/`, `.next/`, `next-env.d.ts`, `*.tsbuildinfo`.

## Conventions
- Components are Server Components by default. Add `"use client"` only for state, effects, or browser APIs, and on the smallest component that needs it.
- Never import `medfunnels.server.ts`, or any `lib/` module that imports it (`programs`, `catalog`), from a client component.
- Server Actions go in an `actions.ts` file next to the page that uses them, with `"use server"` at the top. Validate every `FormData` field.
- `params` and `searchParams` are Promises: `await` them. Use `notFound()` for unknown slugs.
- Use the Metadata API (`metadata` / `generateMetadata`) for titles, not `<head>` tags.
- Import with the `@/` alias (e.g. `@/lib/plans`), not deep relative paths.
- Match the existing style: 4-space indent, double quotes, semicolons, named exports (except where Next requires a default export).
- Styles live in `app/globals.css` with plain class names. Don't add a CSS framework without asking.
- Keep comments short, and only where the "why" isn't obvious.

## Health data and secrets (non-negotiable)
- Treat questionnaire answers as PHI. Never log them, never send them to analytics or third parties, never put them in URLs.
- medFunnels never receives answers. Conversions carry only a name and an amount, with nothing about the patient. Keep it that way.
- Secrets are server-only env vars. Never prefix them with `NEXT_PUBLIC_`, never commit `.env*` (except `.env.example`).
- Add every new env var to `.env.example` and the README's "Environment variables" section.

## Boundaries
- Ask before adding dependencies, changing `next.config.ts` or `medfunnels.config.json`, or upgrading packages.
- Don't make large refactors or reformat code you weren't asked to touch.
- This is a demo with a fictional clinic: keep the "demo" disclaimers and don't present it as a real provider.

## Before you finish
1. `npm run typecheck` passes.
2. `npm run build` passes, if you touched routes, config, or client/server boundaries.
3. Summarize what changed and anything you couldn't verify.
