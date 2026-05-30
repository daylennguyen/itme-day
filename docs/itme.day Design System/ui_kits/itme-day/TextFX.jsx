// TextFX.jsx — live RuneScape-style chat text renderer.
// Type a string, pick a colour + effect, see it render in RuneScape UF, with the
// chat-code tag (effect:colour:text) shown + copyable. Effects stack: a rainbow
// colour can run alongside a wave motion.
const { useState: useFxState } = React;

const FX_COLORS = [
  { id: "red", hex: "#d83c3c" }, { id: "orange", hex: "#ee8d2c" }, { id: "yellow", hex: "#ecc24e" },
  { id: "green", hex: "#46a832" }, { id: "cyan", hex: "#46c8d2" }, { id: "blue", hex: "#3f6fd6" },
  { id: "purple", hex: "#b455c8" }, { id: "pink", hex: "#e986b4" }, { id: "brown", hex: "#8a6a46" },
  { id: "grey", hex: "#9b9b9b" }, { id: "white", hex: "#ffffff" }, { id: "inverted", hex: null },
  { id: "rainbow", hex: null },
];

// effect → category + animation spec
const FX_EFFECTS = {
  none: { kind: "none" },
  wave: { kind: "char", kf: "fxWave", dur: "1s", step: 0.07 },
  wave2: { kind: "char", kf: "fxWave2", dur: "1s", step: 0.07 },
  wave3: { kind: "char", kf: "fxWave3", dur: "1s", step: 0.07 },
  shake: { kind: "char", kf: "fxShake", dur: "0.35s", step: 0.03 },
  shake2: { kind: "char", kf: "fxShake2", dur: "0.28s", step: 0.02 },
  glow: { kind: "inner", anim: "fxGlow 1.3s ease-in-out infinite" },
  flash: { kind: "inner", anim: "fxFlash 0.7s steps(1) infinite" },
  scroll: { kind: "wrap", anim: "fxScrollL 4s linear infinite" },
  scroll2: { kind: "wrap", anim: "fxScrollR 4s linear infinite" },
  slide: { kind: "wrap", anim: "fxSlideD 2.6s ease-in-out infinite" },
  slide2: { kind: "wrap", anim: "fxSlideU 2.6s ease-in-out infinite" },
  mirror: { kind: "static", transform: "scaleX(-1)" },
};

function TextFX() {
  const [text, setText] = useFxState("Nat 20!");
  const [color, setColor] = useFxState("rainbow");
  const [effect, setEffect] = useFxState("wave");
  const [copied, setCopied] = useFxState(false);

  const spec = FX_EFFECTS[effect];
  const colorDef = FX_COLORS.find((c) => c.id === color);
  const glowColor = colorDef.hex || "#ffe27a";

  const charStyle = (i) => {
    const anims = [];
    if (spec.kind === "char") anims.push(`${spec.kf} ${spec.dur} ease-in-out infinite ${(i * spec.step).toFixed(2)}s`);
    if (color === "rainbow") anims.push(`fxRainbow 1.6s linear infinite ${(i * 0.09).toFixed(2)}s`);
    const s = { display: "inline-block", whiteSpace: "pre" };
    if (anims.length) s.animation = anims.join(", ");
    if (color === "inverted") { s.color = "transparent"; s.WebkitTextStroke = "1px #d8cdb4"; }
    else if (color !== "rainbow") { s.color = colorDef.hex; }
    return s;
  };

  const innerStyle = {};
  if (spec.kind === "inner") { innerStyle.animation = spec.anim; if (effect === "glow") innerStyle["--glow"] = glowColor; }

  const wrapStyle = { display: "inline-block", whiteSpace: "nowrap" };
  if (spec.kind === "wrap") wrapStyle.animation = spec.anim;
  if (spec.kind === "static") wrapStyle.transform = spec.transform;

  const chars = [...(text || " ")].map((ch, i) => <span key={i} style={charStyle(i)}>{ch}</span>);
  const codeTag = `${effect !== "none" ? effect + ":" : ""}${color}:${text}`;

  const copy = () => {
    navigator.clipboard?.writeText(codeTag);
    setCopied(true); setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div>
      <Reveal as="header" style={{ marginBottom: 24 }}>
        <p className="eyebrow">Text FX</p>
        <h1 className="title">Goblin text renderer</h1>
        <p className="subtitle">RuneScape-style chat colours &amp; effects. Type, pick, and watch it move.</p>
      </Reveal>

      {/* preview stage */}
      <div style={{
        background: "#09090b", backgroundImage: "var(--rng-backdrop)", border: "1px solid rgba(39,39,42,0.8)",
        borderRadius: 16, padding: "44px 22px", minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}>
        <div style={{ fontFamily: "var(--font-fantasy)", fontSize: 44, lineHeight: 1.1, color: "#fff", maxWidth: "100%" }}>
          <span style={wrapStyle}><span style={innerStyle}>{chars}</span></span>
        </div>
      </div>

      {/* code tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0 24px" }}>
        <code style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: 13, color: "#a1a1aa", background: "rgba(24,24,27,0.6)", border: "1px solid #27272a", borderRadius: 8, padding: "9px 12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{codeTag}</code>
        <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 8, border: "1px solid #27272a", background: "rgba(24,24,27,0.6)", color: copied ? "#34d399" : "#a1a1aa", fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          <Ico name={copied ? "check" : "copy"} size={14} /> {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* text input */}
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#71717a", marginBottom: 8 }}>Message</label>
      <input value={text} onChange={(e) => setText(e.target.value.slice(0, 24))} placeholder="Type a message…" style={{
        width: "100%", boxSizing: "border-box", height: 46, padding: "0 14px", marginBottom: 22,
        background: "rgba(10,10,12,0.6)", border: "1px solid #27272a", borderRadius: 10,
        color: "#fafafa", fontFamily: "var(--font-sans)", fontSize: 15, outline: "none",
      }} />

      {/* colours */}
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#71717a", marginBottom: 10 }}>Colour</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
        {FX_COLORS.map((c) => {
          const on = c.id === color;
          const swatch = c.id === "rainbow"
            ? { backgroundImage: "linear-gradient(90deg,#e34b4b,#ee8d2c,#ecc24e,#46a832,#46c8d2,#3f6fd6,#b455c8)" }
            : c.id === "inverted" ? { background: "transparent", border: "1.5px solid #d8cdb4" } : { background: c.hex };
          return (
            <button key={c.id} onClick={() => setColor(c.id)} title={c.id} style={{
              display: "flex", alignItems: "center", gap: 7, padding: "6px 11px 6px 8px", cursor: "pointer",
              borderRadius: 999, fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, textTransform: "capitalize",
              background: on ? "rgba(132,155,73,0.14)" : "rgba(24,24,27,0.5)",
              border: `1px solid ${on ? "rgba(132,155,73,0.6)" : "#27272a"}`, color: on ? "#c4d68a" : "#a1a1aa", transition: "all .15s",
            }}>
              <span style={{ width: 14, height: 14, borderRadius: "50%", ...swatch }} />
              {c.id}
            </button>
          );
        })}
      </div>

      {/* effects */}
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#71717a", marginBottom: 10 }}>Effect</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {Object.keys(FX_EFFECTS).map((id) => {
          const on = id === effect;
          return (
            <button key={id} onClick={() => setEffect(id)} style={{
              padding: "8px 14px", cursor: "pointer", borderRadius: 10, fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 700,
              textTransform: "capitalize", transition: "all .15s",
              background: on ? "rgba(79,70,229,0.2)" : "rgba(24,24,27,0.5)",
              border: `1px solid ${on ? "rgba(99,102,241,0.45)" : "#27272a"}`,
              color: on ? "#a5b4fc" : "#a1a1aa",
              boxShadow: on ? "0 0 10px rgba(99,102,241,0.18)" : "none",
            }}>{id}</button>
          );
        })}
      </div>
    </div>
  );
}

window.TextFX = TextFX;
