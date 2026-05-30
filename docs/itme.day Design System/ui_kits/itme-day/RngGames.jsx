// RngGames.jsx — Coin Flip, Dice Slider, RNG Wheel.
// Faithful cosmetic recreations of the @itme.day/rng-react-components consoles
// (orange/blue 3D coin, red/green probability track, green-arc wheel). Each shares
// ConsoleHeader + consolePanelStyle from Icons.jsx.
const { useState: useS, useRef: useR } = React;

const WIN = { t: "WIN", c: "#34d399", bg: "rgba(16,185,129,0.15)", b: "rgba(16,185,129,0.4)", glow: "rgba(16,185,129,0.25)" };
const MISS = { t: "MISS", c: "#fb7185", bg: "rgba(244,63,94,0.15)", b: "rgba(244,63,94,0.4)", glow: "rgba(244,63,94,0.25)" };

function Badge({ data, label }) {
  if (!data) return null;
  return (
    <span style={{
      padding: "6px 18px", borderRadius: 999, fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em",
      color: data.c, background: data.bg, border: `1px solid ${data.b}`, boxShadow: `0 0 16px ${data.glow}`,
    }}>{label || data.t}</span>
  );
}

function rollBtn(label, on, disabled, color) {
  return (
    <button onClick={on} disabled={disabled} style={{
      width: "100%", height: 52, border: "none", borderRadius: 12, cursor: disabled ? "default" : "pointer",
      fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff",
      background: disabled ? "#27272a" : color, opacity: disabled ? 0.8 : 1,
      boxShadow: disabled ? "none" : "0 8px 24px rgba(99,102,241,0.4), inset 0 1px 1px rgba(255,255,255,0.25)",
      transition: "filter .15s",
    }}>{label}</button>
  );
}

const stageStyle = {
  position: "relative", borderRadius: 12, background: "rgba(9,9,11,0.4)", border: "1px solid rgba(39,39,42,0.5)",
  minHeight: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, marginBottom: 20, overflow: "hidden",
};

/* ============================ COIN FLIP ============================ */
function CoinGame() {
  const [pred, setPred] = useS("orange");
  const [rot, setRot] = useS(0);
  const [flipping, setFlipping] = useS(false);
  const [outcome, setOutcome] = useS(null);
  const [stats, setStats] = useS({ wins: 0, losses: 0, streak: 0 });

  const flip = () => {
    if (flipping) return;
    setFlipping(true); setOutcome(null);
    const side = Math.random() < 0.5 ? "orange" : "blue";
    const base = rot - (rot % 360);
    const target = base + 360 * 5 + (side === "blue" ? 180 : 0) + 360;
    setRot(target);
    setTimeout(() => {
      const win = side === pred;
      setOutcome(win ? "win" : "loss");
      setStats((s) => ({ wins: s.wins + (win ? 1 : 0), losses: s.losses + (win ? 0 : 1), streak: win ? s.streak + 1 : 0 }));
      setFlipping(false);
    }, 1050);
  };

  const Face = ({ back }) => (
    <div style={{
      position: "absolute", inset: 0, borderRadius: "50%", background: "#09090b",
      border: `12px solid ${back ? "#3b82f6" : "#f59e0b"}`, backfaceVisibility: "hidden",
      transform: back ? "rotateY(180deg)" : "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: back ? "0 0 20px rgba(59,130,246,0.25), inset 0 0 15px rgba(59,130,246,0.35)" : "0 0 20px rgba(245,158,11,0.25), inset 0 0 15px rgba(245,158,11,0.35)",
    }}>
      {back
        ? <div style={{ width: 44, height: 44, transform: "rotate(45deg)", borderRadius: 6, background: "#09090b", border: "4px solid rgba(37,99,235,0.4)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)" }} />
        : <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#09090b", border: "4px solid rgba(217,119,6,0.4)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)" }} />}
    </div>
  );

  return (
    <div style={consolePanelStyle}>
      <ConsoleHeader icon="coins" iconColor="#fbbf24" title="COIN FLIP CONSOLE" stats={stats} />
      <div style={stageStyle}>
        <div style={{ width: 150, height: 150, perspective: 1200 }}>
          <div style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d", transform: `rotateY(${rot}deg)`, transition: flipping ? "transform 1.05s cubic-bezier(.3,.1,.2,1)" : "none" }}>
            <Face />
            <Face back />
          </div>
        </div>
        <Badge data={outcome === "win" ? WIN : outcome === "loss" ? MISS : null} />
      </div>

      {/* prediction selector */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
        {[{ id: "orange", label: "Orange", col: "#f59e0b" }, { id: "blue", label: "Blue", col: "#3b82f6" }].map((o) => {
          const on = pred === o.id;
          return (
            <button key={o.id} onClick={() => !flipping && setPred(o.id)} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 0", cursor: flipping ? "default" : "pointer",
              borderRadius: 12, fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em",
              background: on ? `${o.col}22` : "rgba(10,10,12,0.6)", color: on ? o.col : "#71717a",
              border: `1px solid ${on ? o.col + "80" : "#27272a"}`, transition: "all .2s",
            }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", background: o.col, boxShadow: on ? `0 0 10px ${o.col}` : "none" }} />
              {o.label}
            </button>
          );
        })}
      </div>
      {rollBtn(flipping ? "FLIPPING…" : "FLIP COIN", flip, flipping, "linear-gradient(180deg,#4f46e5,#4338ca)")}
    </div>
  );
}

/* ============================ DICE SLIDER ============================ */
function DiceGame() {
  const [target, setTarget] = useS(50);
  const [over, setOver] = useS(true);
  const [rolling, setRolling] = useS(false);
  const [result, setResult] = useS(null); // {val, win}
  const [stats, setStats] = useS({ wins: 0, losses: 0, streak: 0 });
  const trackRef = useR(null);

  const chance = over ? (100 - target) : target;

  const setFromClient = (clientX) => {
    const el = trackRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    let pct = Math.round(((clientX - r.left) / r.width) * 100);
    setTarget(Math.max(2, Math.min(98, pct)));
  };
  const onDown = (e) => {
    if (rolling) return;
    setFromClient(e.clientX);
    const move = (ev) => setFromClient(ev.clientX);
    const up = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move); window.addEventListener("mouseup", up);
  };

  const roll = () => {
    if (rolling) return;
    setRolling(true); setResult(null);
    let ticks = 0;
    const iv = setInterval(() => {
      setResult({ val: (Math.random() * 100).toFixed(2), win: null });
      if (++ticks > 12) {
        clearInterval(iv);
        const val = +(Math.random() * 100).toFixed(2);
        const win = over ? val > target : val < target;
        setResult({ val: val.toFixed(2), win });
        setStats((s) => ({ wins: s.wins + (win ? 1 : 0), losses: s.losses + (win ? 0 : 1), streak: win ? s.streak + 1 : 0 }));
        setRolling(false);
      }
    }, 45);
  };

  const trackBg = over
    ? `linear-gradient(to right, #e11d48 0%, #e11d48 ${target}%, #10b981 ${target}%, #10b981 100%)`
    : `linear-gradient(to right, #10b981 0%, #10b981 ${target}%, #e11d48 ${target}%, #e11d48 100%)`;

  return (
    <div style={consolePanelStyle}>
      <ConsoleHeader icon="activity" iconColor="#818cf8" title="DICE SLIDER CONSOLE" stats={stats} />
      <div style={{ ...stageStyle, minHeight: 200, padding: "0 24px", justifyContent: "center" }}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#71717a", fontSize: 13, fontWeight: 900, marginBottom: 14 }}>
            <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
          </div>
          <div ref={trackRef} onMouseDown={onDown} style={{ position: "relative", height: 16, borderRadius: 999, background: trackBg, cursor: rolling ? "not-allowed" : "pointer", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", left: `${target}%`, top: "50%", transform: "translate(-50%,-50%)", width: 32, height: 40, background: "#6366f1", border: "2px solid #818cf8", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
              {[0, 1, 2].map((i) => <span key={i} style={{ width: 2, height: 14, background: "rgba(199,210,254,0.6)", borderRadius: 2 }} />)}
            </div>
            {result && (
              <div style={{ position: "absolute", left: `${Math.min(96, Math.max(4, result.val))}%`, top: -46, transform: "translateX(-50%)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 16, padding: "4px 10px", borderRadius: 8, color: result.win == null ? "#d4d4d8" : result.win ? "#34d399" : "#fb7185", background: "#0a0a0c", border: `1px solid ${result.win == null ? "#3f3f46" : result.win ? "rgba(16,185,129,0.5)" : "rgba(244,63,94,0.5)"}` }}>{result.val}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
        <div style={{ background: "rgba(24,24,27,0.4)", border: "1px solid #27272a", borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.04em", color: "#a1a1aa" }}>{over ? "Roll Over" : "Roll Under"} Target</div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", background: "#0a0a0c", border: "1px solid #27272a", borderRadius: 10, padding: "0 6px 0 14px" }}>
            <span style={{ flex: 1, fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 18, color: "#fff" }}>{target}.00</span>
            <button onClick={() => !rolling && setOver(!over)} title="Switch Roll Over / Under" style={{ padding: 8, background: "transparent", border: "none", color: "#818cf8", cursor: "pointer" }}><Ico name="arrow-left-right" size={18} /></button>
          </div>
        </div>
        <div style={{ background: "rgba(24,24,27,0.4)", border: "1px solid #27272a", borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.04em", color: "#a1a1aa" }}>Win Chance %</div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0a0a0c", border: "1px solid #27272a", borderRadius: 10, padding: "12px 14px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 18, color: "#34d399" }}>{chance.toFixed(2)}</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "#71717a", fontWeight: 700 }}>%</span>
          </div>
        </div>
      </div>
      {rollBtn(rolling ? "ROLLING…" : "ROLL DICE", roll, rolling, "linear-gradient(180deg,#4f46e5,#4338ca)")}
    </div>
  );
}

/* ============================ RNG WHEEL ============================ */
function WheelGame() {
  const [chance, setChance] = useS(10);
  const [rot, setRot] = useS(0);
  const [spinning, setSpinning] = useS(false);
  const [status, setStatus] = useS("idle");
  const [stats, setStats] = useS({ wins: 0, losses: 0, streak: 0 });

  const r = 100, cx = 140, cy = 140, sw = 20, C = 2 * Math.PI * r;
  const greenDeg = (chance / 100) * 360;

  const spin = () => {
    if (spinning) return;
    setSpinning(true); setStatus("idle");
    const win = Math.random() * 100 < chance;
    const pad = Math.min(6, greenDeg / 4);
    let off; // degrees of wheel rotation modulo 360 that land pointer in/out of green
    if (win) off = (Math.random() * (greenDeg - 2 * pad) - (greenDeg / 2 - pad));
    else { const span = 360 - greenDeg - 2 * pad; off = greenDeg / 2 + pad + Math.random() * span; }
    const base = rot - (rot % 360);
    const target = base + 360 * 6 - off;
    setRot(target);
    setTimeout(() => {
      setStatus(win ? "win" : "loss");
      setStats((s) => ({ wins: s.wins + (win ? 1 : 0), losses: s.losses + (win ? 0 : 1), streak: win ? s.streak + 1 : 0 }));
      setSpinning(false);
    }, 1550);
  };

  return (
    <div style={consolePanelStyle}>
      <ConsoleHeader icon="flame" iconColor="#f43f5e" title="RNG WHEEL CONSOLE" stats={stats} />
      <div style={{ ...stageStyle, minHeight: 340 }}>
        <div style={{ position: "absolute", width: 256, height: 256, borderRadius: "50%", filter: "blur(50px)", opacity: spinning ? 0.2 : status === "win" ? 0.25 : status === "loss" ? 0.15 : 0.12, background: status === "win" ? "#10b981" : status === "loss" ? "#f43f5e" : "#6366f1", transition: "all .5s" }} />
        <div style={{ position: "relative", width: 280, height: 280 }}>
          {/* pointer */}
          <div style={{ position: "absolute", top: 4, left: 140, transform: "translateX(-50%)", zIndex: 30, filter: "drop-shadow(0 2px 8px rgba(244,63,94,0.5))" }}>
            <svg width="20" height="34" viewBox="0 0 20 34"><path d="M 10 33 C 4 25, 1 19, 1 10 A 9 9 0 0 1 19 10 C 19 19, 16 25, 10 33 Z" fill="#f43f5e" /><circle cx="10" cy="10" r="3.5" fill="#fff" /></svg>
          </div>
          {/* center */}
          <div style={{ position: "absolute", top: 80, left: 80, width: 120, height: 120, borderRadius: "50%", zIndex: 20, background: "#18181b", border: "2px solid #27272a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: status === "win" ? "0 0 24px rgba(16,185,129,0.5)" : status === "loss" ? "0 0 24px rgba(244,63,94,0.4)" : "inset 0 0 20px rgba(0,0,0,0.6)", transition: "box-shadow .4s" }}>
            {status === "idle"
              ? <><span style={{ fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 26, color: "#a78bfa" }}>{chance.toFixed(0)}%</span><span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#71717a" }}>win zone</span></>
              : <span style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em", padding: "5px 14px", borderRadius: 999, color: status === "win" ? "#34d399" : "#fb7185", background: status === "win" ? "rgba(16,185,129,0.2)" : "rgba(244,63,94,0.2)", border: `1px solid ${status === "win" ? "rgba(16,185,129,0.5)" : "rgba(244,63,94,0.5)"}` }}>{status === "win" ? "Winner!" : "Missed!"}</span>}
          </div>
          {/* wheel */}
          <svg width="280" height="280" viewBox="0 0 280 280" style={{ position: "absolute", inset: 0, zIndex: 10, transform: `rotate(${rot}deg)`, transition: spinning ? "transform 1.55s cubic-bezier(.15,.85,.25,1)" : "none", filter: "drop-shadow(0 0 12px rgba(0,0,0,0.6))" }}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e2d3d" strokeWidth={sw} />
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10b981" strokeWidth={sw} strokeDasharray={`${(chance / 100) * C} ${((100 - chance) / 100) * C}`} transform={`rotate(${-90 - greenDeg / 2} ${cx} ${cy})`} style={{ filter: "drop-shadow(0 0 6px rgba(16,185,129,0.8))" }} />
          </svg>
        </div>
      </div>

      <div style={{ background: "rgba(24,24,27,0.4)", border: "1px solid #27272a", borderRadius: 16, padding: 16, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.04em", color: "#a1a1aa" }}>Win Chance</span>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 16, color: "#34d399" }}>{chance.toFixed(0)}%</span>
        </div>
        <input type="range" min="2" max="75" value={chance} disabled={spinning} onChange={(e) => setChance(+e.target.value)} style={{ width: "100%", marginTop: 12, accentColor: "#10b981" }} />
      </div>
      {rollBtn(spinning ? "SPINNING…" : "SPIN WHEEL", spin, spinning, "linear-gradient(180deg,#4f46e5,#4338ca)")}
    </div>
  );
}

window.CoinGame = CoinGame;
window.DiceGame = DiceGame;
window.WheelGame = WheelGame;
