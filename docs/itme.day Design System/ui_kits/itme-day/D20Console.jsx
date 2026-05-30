// D20Console.jsx — the "RNG" tab. Recreates the RNG Probability Console:
// a neon game-selector nav + a fully interactive D20 roller. The other three
// games (dice slider, coin flip, wheel) ship in @itme.day/rng-react-components;
// here they show a faithful console shell with a disclaimer rather than a
// half-built reimplementation.
const { useState, useRef } = React;

const GAMES = [
  { id: "dice", label: "Dice Slider", icon: "activity" },
  { id: "coin", label: "Coin Flip", icon: "coins" },
  { id: "wheel", label: "RNG Wheel", icon: "flame", iconColor: "#f43f5e" },
  { id: "d20", label: "D20 Roll", icon: "dices", iconColor: "#a78bfa" },
];

function ConsoleNav({ active, onChange }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: 4, padding: 4, marginBottom: 16,
      background: "rgba(24,24,27,0.6)", border: "1px solid rgba(39,39,42,0.8)",
      borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
    }}>
      {GAMES.map((g) => {
        const on = g.id === active;
        return (
          <button key={g.id} type="button" onClick={() => onChange(g.id)}
            style={{
              flex: "1 1 7rem", minWidth: "7rem", padding: "12px 8px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em",
              borderRadius: 12, fontFamily: "var(--font-sans)", transition: "all .3s",
              border: on ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
              background: on ? "rgba(79,70,229,0.2)" : "transparent",
              color: on ? "#818cf8" : "#71717a",
              boxShadow: on ? "inset 0 1px 1px rgba(255,255,255,0.1), 0 0 10px rgba(99,102,241,0.2)" : "none",
            }}>
            <Ico name={g.icon} size={14} color={g.iconColor} />
            {g.label}
          </button>
        );
      })}
    </div>
  );
}

function D20Game() {
  const [dc, setDc] = useState(11);
  const [roll, setRoll] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [outcome, setOutcome] = useState(null); // {win, nat}
  const [stats, setStats] = useState({ wins: 0, losses: 0, streak: 0 });
  const timer = useRef(null);

  const winChance = ((21 - dc) / 20 * 100);
  const ratio = stats.wins + stats.losses === 0 ? "0.00" : (stats.wins / (stats.wins + stats.losses) * 100).toFixed(2);

  const doRoll = () => {
    if (rolling) return;
    setRolling(true);
    setOutcome(null);
    let ticks = 0;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setRoll(1 + Math.floor(Math.random() * 20));
      if (++ticks > 14) {
        clearInterval(timer.current);
        const final = 1 + Math.floor(Math.random() * 20);
        setRoll(final);
        const win = final >= dc;
        const nat = final === 20 ? "nat20" : final === 1 ? "nat1" : null;
        setOutcome({ win, nat });
        setStats((s) => ({
          wins: s.wins + (win ? 1 : 0),
          losses: s.losses + (win ? 0 : 1),
          streak: win ? s.streak + 1 : 0,
        }));
        setRolling(false);
      }
    }, 55);
  };

  const setDcSafe = (n) => setDc(Math.max(2, Math.min(20, n)));

  const badge = (() => {
    if (rolling || !outcome) return null;
    if (outcome.nat === "nat20") return { t: "NAT 20", c: "#a78bfa", bg: "rgba(139,92,246,0.18)", b: "rgba(139,92,246,0.5)", glow: "rgba(139,92,246,0.3)" };
    if (outcome.nat === "nat1") return { t: "NAT 1", c: "#a1a1aa", bg: "rgba(39,39,42,0.8)", b: "#3f3f46", glow: "transparent" };
    if (outcome.win) return { t: "WIN", c: "#34d399", bg: "rgba(16,185,129,0.15)", b: "rgba(16,185,129,0.4)", glow: "rgba(16,185,129,0.25)" };
    return { t: "MISS", c: "#fb7185", bg: "rgba(244,63,94,0.15)", b: "rgba(244,63,94,0.4)", glow: "rgba(244,63,94,0.25)" };
  })();

  return (
    <div style={consolePanelStyle}>
      <ConsoleHeader icon="dices" iconColor="#a78bfa" title="D20 ROLL CONSOLE" stats={stats} />

      {/* die stage */}
      <div style={{
        position: "relative", borderRadius: 12, background: "radial-gradient(ellipse at center, rgba(139,92,246,0.08), transparent 70%)",
        minHeight: 260, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
        border: "1px solid rgba(39,39,42,0.5)",
      }}>
        <div style={{ position: "relative", width: 150, height: 150, animation: rolling ? "d20shake .12s linear infinite" : "none", filter: "drop-shadow(0 0 26px rgba(139,92,246,0.5))" }}>
          <img src="../../assets/d20.svg" alt="D20" draggable={false} style={{ width: "100%", height: "100%" }} />
          <span style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            paddingTop: 18, fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 40,
            color: "#f5f3ff", textShadow: "0 2px 6px rgba(76,29,149,0.9)",
          }}>{roll}</span>
        </div>
        {badge && (
          <span style={{
            padding: "6px 18px", borderRadius: 999, fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em",
            color: badge.c, background: badge.bg, border: `1px solid ${badge.b}`, boxShadow: `0 0 16px ${badge.glow}`,
          }}>{badge.t}</span>
        )}
      </div>

      {/* controls */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "20px 0" }}>
        <div style={{ background: "rgba(10,10,12,0.6)", border: "1px solid #27272a", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "#d4d4d8" }}>Difficulty Class (DC)</div>
          <div style={{ fontSize: 10, color: "#71717a", marginTop: 2 }}>DC = Difficulty Class</div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setDcSafe(dc - 1)} className="dc-btn">−</button>
            <div style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 20, color: "#fafafa", background: "#0a0a0c", border: "1px solid #27272a", borderRadius: 8, padding: "8px 0" }}>{dc}</div>
            <button onClick={() => setDcSafe(dc + 1)} className="dc-btn">+</button>
          </div>
        </div>
        <div style={{ background: "rgba(10,10,12,0.6)", border: "1px solid #27272a", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "#d4d4d8" }}>Win Chance %</div>
          <div style={{ fontSize: 10, color: "#71717a", marginTop: 2 }}>roll ≥ DC on a d20</div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0a0a0c", border: "1px solid #27272a", borderRadius: 8, padding: "8px 14px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 20, color: "#34d399" }}>{winChance.toFixed(2)}</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "#71717a", fontSize: 14 }}>%</span>
          </div>
        </div>
      </div>

      {/* roll button */}
      <button onClick={doRoll} disabled={rolling} className="roll-btn">
        {rolling ? "ROLLING…" : "ROLL D20"}
      </button>

      <style>{`
        @keyframes d20shake { 0%{transform:translate(0,0) rotate(0)} 25%{transform:translate(-3px,2px) rotate(-4deg)} 50%{transform:translate(2px,-2px) rotate(3deg)} 75%{transform:translate(-2px,-1px) rotate(-2deg)} 100%{transform:translate(0,0) rotate(0)} }
        .dc-btn { width:34px; height:34px; border-radius:8px; border:1px solid #27272a; background:#18181b; color:#a78bfa; font-size:18px; font-weight:700; cursor:pointer; line-height:1; }
        .dc-btn:hover { background:#27272a; }
        .roll-btn { width:100%; height:52px; border:none; border-radius:12px; cursor:pointer; font-family:var(--font-sans); font-size:15px; font-weight:900; letter-spacing:0.08em; text-transform:uppercase; color:#fff; background:linear-gradient(180deg,#7c3aed,#6d28d9); box-shadow:0 8px 24px rgba(124,58,237,0.45), inset 0 1px 1px rgba(255,255,255,0.25); transition:filter .15s, transform .1s; }
        .roll-btn:hover:not(:disabled) { filter:brightness(1.1); }
        .roll-btn:active:not(:disabled) { transform:translateY(1px); }
        .roll-btn:disabled { opacity:.7; cursor:default; }
      `}</style>
    </div>
  );
}

function GamePlaceholder({ game }) {
  return (
    <div style={{
      background: "rgba(24,24,27,0.5)", border: "1px solid rgba(39,39,42,0.8)", borderRadius: 16,
      padding: "48px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
    }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}>
        <Ico name={game.icon} size={26} color={game.iconColor || "#818cf8"} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#d4d4d8" }}>{game.label}</div>
      <div style={{ fontSize: 13, color: "#71717a", maxWidth: 360, lineHeight: 1.55 }}>
        Lives in <span style={{ fontFamily: "var(--font-mono)", color: "#a1a1aa" }}>@itme.day/rng-react-components</span>. This kit ships the interactive <b style={{ color: "#a78bfa" }}>D20 Roll</b> as the reference console — select it above.
      </div>
    </div>
  );
}

function D20Console() {
  const [active, setActive] = useState("d20");
  const games = { d20: D20Game, coin: window.CoinGame, dice: window.DiceGame, wheel: window.WheelGame };
  const Game = games[active];
  return (
    <div>
      <Reveal as="header" style={{ marginBottom: 24 }}>
        <p className="eyebrow">RNG</p>
        <h1 className="title">Random generators</h1>
        <p className="subtitle">Dice, tables, and other tools from rng-react-components.</p>
      </Reveal>
      <div className="console-host">
        <ConsoleNav active={active} onChange={setActive} />
        {Game ? <Game /> : <GamePlaceholder game={GAMES.find((g) => g.id === active)} />}
      </div>
    </div>
  );
}

window.D20Console = D20Console;
