// Icons.jsx — Lucide icon wrapper.
// Renders lucide SVGs imperatively into a ref so React never owns their
// children (avoids the React-vs-createIcons DOM tug-of-war).
function Ico({ name, size = 16, color, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = `<i data-lucide="${name}"></i>`;
    window.lucide.createIcons();
  });
  return (
    <span
      ref={ref}
      className="ico"
      style={{ width: size, height: size, color, ...style }}
    />
  );
}

window.Ico = Ico;

// Reveal — fade + rise on mount. Defaults to VISIBLE; only plays the hidden→shown
// transition when the document is actually visible. If the page is offscreen or
// throttled, content stays visible (never stuck invisible).
function Reveal({ children, delay = 0, as = "div", className, style }) {
  const [state, setState] = React.useState("idle"); // idle = visible at rest
  React.useEffect(() => {
    if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
    setState("hidden");
    const id = setTimeout(() => setState("shown"), 30);
    return () => clearTimeout(id);
  }, []);
  const hidden = state === "hidden";
  const Tag = as;
  return (
    <Tag
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(14px)" : "none",
        transition: `opacity .5s cubic-bezier(.2,.7,.3,1) ${delay}s, transform .5s cubic-bezier(.2,.7,.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

window.Reveal = Reveal;

// Stat — a labelled mono stat used in every console header.
function Stat({ icon, iconColor, label, value, valueColor }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#71717a", display: "flex", alignItems: "center", gap: 5 }}>
        <Ico name={icon} size={13} color={iconColor} /> {label}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 18, lineHeight: 1, letterSpacing: "-0.02em", color: valueColor || "#d4d4d8" }}>{value}</span>
    </div>
  );
}

// ConsoleHeader — title + the four-stat row shared across games.
function ConsoleHeader({ icon, iconColor, title, stats }) {
  const ratio = stats.wins + stats.losses === 0 ? "0.00" : (stats.wins / (stats.wins + stats.losses) * 100).toFixed(2);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, borderBottom: "1px solid rgba(39,39,42,0.6)", paddingBottom: 18, marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700, letterSpacing: "0.02em", color: "#d4d4d8" }}>
        <Ico name={icon} size={18} color={iconColor} /> {title}
      </div>
      <div style={{ display: "flex", gap: 22 }}>
        <Stat icon="trophy" iconColor="#34d399" label="Wins" value={stats.wins} valueColor="#34d399" />
        <Stat icon="x-circle" iconColor="#fb7185" label="Losses" value={stats.losses} valueColor="#fb7185" />
        <Stat icon="percent" iconColor="#34d399" label="Win Ratio" value={ratio + "%"} valueColor="#34d399" />
        <Stat icon="flame" iconColor="#fb923c" label="Streak" value={stats.streak} />
      </div>
    </div>
  );
}

// consolePanel — shared glass card style for a game body.
const consolePanelStyle = {
  background: "rgba(24,24,27,0.5)", border: "1px solid rgba(39,39,42,0.8)",
  borderRadius: 16, padding: 24, boxShadow: "0 4px 30px rgba(99,102,241,0.05), 0 4px 20px rgba(0,0,0,0.4)",
};

window.Stat = Stat;
window.ConsoleHeader = ConsoleHeader;
window.consolePanelStyle = consolePanelStyle;
