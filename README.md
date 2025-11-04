# BIGTABLET Frontend Template (Next.js) — User Guide

This project is a frontend template based on Next.js 16 + React 19 + TypeScript. It uses pnpm as the package manager. This guide is written with WebStorm as the IDE and macOS as the OS environment in mind.

[📘 한국어로 읽기](./README_KO.md)

**Key Dependencies:** `next 16.0.1`, `react 19.2.0`, `@tanstack/react-query`, `axios`, `zod`, `react-toastify`
**Development Tools:** `TypeScript`, `Biome` (lint/format)

---

## Quick Start

### 1) Requirements
-   **Recommended Node.js:** v20 LTS or higher (latest LTS recommended for Next.js 16 compatibility)
-   **Package Manager:** pnpm

```bash
# Install pnpm (if not already installed)
npm i -g pnpm

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Once the development server is running, open http://localhost:3000 in your browser.

### 2) Key Scripts
- `pnpm dev` — Run development server
- `pnpm build` — Create production build
- `pnpm start` — Run built app
- `pnpm lint` — Static code analysis with Biome
- `pnpm format` — Auto-format with Biome

---

## Directory Structure (Summary)

Root Essential Files:

- `next.config.ts`, `tsconfig.json`, `biome.json`, `pnpm-lock.yaml`
- `src/` — App Source
- `public/` — Static Assets

---

## Biome

Biome configuration is located in `biome.json`.

- Check: `pnpm lint`
- Format: `pnpm format`
  For WebStorm, one of the following integrations is recommended:

1) Register `pnpm lint` / `pnpm format` as a **Run Configuration** to execute regularly.
2) Use **File Watchers** to automatically run ``biome format --write`` on save.

Additionally, ensure type safety with TypeScript (Strict mode recommended).

---

## WebStorm (macOS) Recommended Settings
1. **Node Version Selection**: In *Preferences → Node.js*, specify Node 20 LTS.
2. **pnpm Usage Setup**: In *Preferences* → Languages & Frameworks → Node.js*, set the package manager to pnpm.
3. **Path Aliases (Optional)**: If using `paths` in tsconfig.json, confirm WebStorm's automatic recognition by checking *Preferences → TypeScript* for project tsconfig indexing.
4. **SCSS Support**: *In Preferences → Languages & Frameworks → Stylesheets*, verify SCSS recognition.
5. **Run/Debug**: Register pnpm dev as an npm run configuration for debugging.

---

## Build & Run
```bash
# Production build
pnpm build

# Run the built result
pnpm start
```
