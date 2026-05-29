# itme.day

Minimal **project link hub** for [itme.day](https://itme.day): one page listing outbound links to projects.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit links

Update [`src/data/projects.ts`](src/data/projects.ts) (`id`, `title`, `href`, optional `description`).

## Verify

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

## Deploy

Deploy to **Vercel** with the **repository root** as the project root (single Next.js app, not a monorepo).

- GitHub: https://github.com/daylennguyen/itme-day
- Vercel: https://itme-day.vercel.app

## Agents

- Prefer **`gh`** for GitHub (create repo, push, PRs).
- Use **GitHub MCP** only as a fallback and only when authenticated as **DaylenNguyen** (not `dnguyen1-godaddy`).
- Run `gh auth status` before any push or MCP GitHub operation.
