import { Globe } from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3.5 border-t border-border pt-6">
      <div className="flex gap-1.5">
        <a
          href="https://github.com/daylennguyen"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
        >
          <GitHubIcon className="h-4 w-4" />
        </a>
        <a
          href="https://itme.day/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website"
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
        >
          <Globe className="h-4 w-4" />
        </a>
      </div>
      <span className="font-mono text-[11.5px] text-muted-foreground">
        © 2026 · made with goblins
      </span>
    </footer>
  );
}
