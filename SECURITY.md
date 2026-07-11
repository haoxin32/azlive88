# Security

## Scope

This repository contains only the **frontend landing page** for AZLIVE88 — a static, client-rendered React/Vite build with no server, no database, and no authentication logic. Registration and login are external flows handled by `siteConfig.registerUrl` / `siteConfig.loginUrl` (see `src/config/site.ts`).

**A frontend cannot guarantee security on its own.** Nothing below substitutes for server-side validation, authentication, rate limiting, or abuse protection — those must live in the backend/auth systems this site links out to.

## What this frontend does NOT contain

- No secrets, API keys, private keys, admin credentials, or database URLs. Only public, non-sensitive config values live in `src/config/site.ts`.
- No authentication or session logic. No tokens are stored in `localStorage`/`sessionStorage`.
- No server-rendered HTML from user input. The only `dangerouslySetInnerHTML` usage is `SchemaMarkup.tsx`, which serializes static, developer-authored JSON-LD (Organization/WebSite/WebPage/FAQ schema) — never user input — with `<` escaped to prevent script-tag breakout.

## External links

All external links (`target="_blank"`) are paired with `rel="noopener noreferrer"` to prevent `window.opener` tab-nabbing. This is handled centrally in `src/components/ui/Button.tsx` (auto-detected via URL scheme) and applied manually on footer social links.

## Forms

This landing page has no data-collecting forms (registration/login happen on the external member system). If a form is added later:

- Validate and trim input client-side for UX, but **never trust client-side validation** — the backend must re-validate everything.
- Enforce max lengths on all text inputs.
- Rate-limit and spam-protect at the backend/API gateway, not in the browser.

## Recommended security headers

See [SECURITY_HEADERS.md](./SECURITY_HEADERS.md) for copy-paste server configs (Nginx / Cloudflare / Vercel). These are **deploy-time** configuration — they live on whatever server or edge platform serves the built `dist/` output, not in this codebase.

## Dependencies

- Dependencies are managed via `npm` (`package-lock.json` committed).
- Run `npm audit` periodically; do not auto-upgrade major versions without testing.
- Report any dependency you believe is compromised or vulnerable to the person maintaining this repository before attempting a fix, so the fix can be verified against a real advisory.

## Reporting a vulnerability

This is an internal project repository. If you find a security issue:

1. Do not open a public issue describing the exploit.
2. Report it directly to the repository owner / operations contact listed in `src/config/site.ts` (`contact.email`).
3. Include reproduction steps and affected URL/component.
