# AGENTS.md

## Project Setup

- Package manager: `pnpm`.
- Runtime: Next.js App Router with TypeScript and the `src/` directory.
- Styling: Tailwind CSS with shadcn-style UI primitives.
- Data layer: axios for HTTP calls and TanStack Query for server state.

## Commands

- `pnpm dev` - start the development server.
- `pnpm build` - create a production build.
- `pnpm start` - run the production server.
- `pnpm lint` - run ESLint.

## Repo Notes

- Keep new application code under `src/`.
- Prefer `pnpm add` and `pnpm add -D` for new dependencies.
- Do not reintroduce `package-lock.json`; use `pnpm-lock.yaml` instead.
- Reuse the existing aliases from `tsconfig.json`, especially `@/`.
- Place reusable UI components in `src/components/ui` and shared helpers in `src/lib`.