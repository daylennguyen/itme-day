"use client";

import { Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState, type CSSProperties } from "react";

import { runescapeUF } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type FxColorId =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "cyan"
  | "blue"
  | "purple"
  | "pink"
  | "brown"
  | "grey"
  | "white"
  | "inverted"
  | "rainbow";

type FxEffectId =
  | "none"
  | "wave"
  | "wave2"
  | "wave3"
  | "shake"
  | "shake2"
  | "glow"
  | "flash"
  | "scroll"
  | "scroll2"
  | "slide"
  | "slide2"
  | "mirror";

const FX_COLORS: { id: FxColorId; hex: string | null }[] = [
  { id: "red", hex: "#d83c3c" },
  { id: "orange", hex: "#ee8d2c" },
  { id: "yellow", hex: "#ecc24e" },
  { id: "green", hex: "#46a832" },
  { id: "cyan", hex: "#46c8d2" },
  { id: "blue", hex: "#3f6fd6" },
  { id: "purple", hex: "#b455c8" },
  { id: "pink", hex: "#e986b4" },
  { id: "brown", hex: "#8a6a46" },
  { id: "grey", hex: "#9b9b9b" },
  { id: "white", hex: "#ffffff" },
  { id: "inverted", hex: null },
  { id: "rainbow", hex: null },
];

type FxSpec =
  | { kind: "none" }
  | { kind: "char"; kf: string; dur: string; step: number }
  | { kind: "inner"; anim: string }
  | { kind: "wrap"; anim: string }
  | { kind: "static"; transform: string };

const FX_EFFECTS: Record<FxEffectId, FxSpec> = {
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

function FxPreview({
  text,
  color,
  effect,
}: {
  text: string;
  color: FxColorId;
  effect: FxEffectId;
}) {
  const spec = FX_EFFECTS[effect];
  const colorDef = FX_COLORS.find((c) => c.id === color)!;
  const glowColor = colorDef.hex ?? "#ffe27a";

  const chars = [...(text || " ")].map((ch, i) => {
    const style: CSSProperties = {
      display: "inline-block",
      whiteSpace: "pre",
    };
    const anims: string[] = [];
    if (spec.kind === "char") {
      anims.push(
        `${spec.kf} ${spec.dur} ease-in-out infinite ${(i * spec.step).toFixed(2)}s`,
      );
    }
    if (color === "rainbow") {
      anims.push(`fxRainbow 1.6s linear infinite ${(i * 0.09).toFixed(2)}s`);
    }
    if (anims.length) style.animation = anims.join(", ");
    if (color === "inverted") {
      style.color = "transparent";
      style.WebkitTextStroke = "1px #d8cdb4";
    } else if (color !== "rainbow" && colorDef.hex) {
      style.color = colorDef.hex;
    }
    return (
      <span key={i} style={style}>
        {ch}
      </span>
    );
  });

  const innerStyle: CSSProperties & { "--glow"?: string } = {};
  if (spec.kind === "inner") {
    innerStyle.animation = spec.anim;
    if (effect === "glow") innerStyle["--glow"] = glowColor;
  }

  const wrapStyle: CSSProperties = {
    display: "inline-block",
    whiteSpace: "nowrap",
  };
  if (spec.kind === "wrap") wrapStyle.animation = spec.anim;
  if (spec.kind === "static") wrapStyle.transform = spec.transform;

  return (
    <span style={wrapStyle}>
      <span style={innerStyle}>{chars}</span>
    </span>
  );
}

export function TextFxPanel() {
  const [text, setText] = useState("Nat 20!");
  const [color, setColor] = useState<FxColorId>("rainbow");
  const [effect, setEffect] = useState<FxEffectId>("wave");
  const [copied, setCopied] = useState(false);

  const codeTag = useMemo(
    () => `${effect !== "none" ? `${effect}:` : ""}${color}:${text}`,
    [color, effect, text],
  );

  const copy = async () => {
    await navigator.clipboard?.writeText(codeTag);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="flex flex-col gap-0">
      <motion.header
        className="mb-6 flex flex-col gap-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Text FX
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Goblin text renderer
        </h1>
        <p className="text-muted-foreground">
          RuneScape-style chat colours &amp; effects. Type, pick, and watch it
          move.
        </p>
      </motion.header>

      <div className="fx-stage flex min-h-[150px] items-center justify-center overflow-hidden px-5 py-11">
        <div
          className={cn(
            "max-w-full text-[44px] leading-tight text-white",
            runescapeUF.className,
          )}
        >
          <FxPreview text={text} color={color} effect={effect} />
        </div>
      </div>

      <div className="mb-6 mt-3.5 flex items-center gap-2.5">
        <code className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-rng-surface-2 bg-rng-surface/60 px-3 py-2 font-mono text-[13px] text-zinc-400">
          {codeTag}
        </code>
        <button
          type="button"
          onClick={() => void copy()}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-rng-surface-2 bg-rng-surface/60 px-3.5 py-2 font-sans text-xs font-bold text-zinc-400 transition-colors hover:text-zinc-300"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-rng-emerald" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-rng-muted">
        Message
      </label>
      <input
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, 24))}
        placeholder="Type a message…"
        className="mb-5 h-11 w-full rounded-[10px] border border-rng-surface-2 bg-[rgba(10,10,12,0.6)] px-3.5 font-sans text-[15px] text-zinc-50 outline-none ring-rng-indigo focus:ring-1"
      />

      <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-rng-muted">
        Colour
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {FX_COLORS.map((c) => {
          const on = c.id === color;
          const swatchStyle: CSSProperties =
            c.id === "rainbow"
              ? {
                  backgroundImage:
                    "linear-gradient(90deg,#e34b4b,#ee8d2c,#ecc24e,#46a832,#46c8d2,#3f6fd6,#b455c8)",
                }
              : c.id === "inverted"
                ? {
                    background: "transparent",
                    border: "1.5px solid #d8cdb4",
                  }
                : { background: c.hex ?? undefined };
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setColor(c.id)}
              title={c.id}
              className={cnFxChip(on, "gobby")}
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full"
                style={swatchStyle}
              />
              {c.id}
            </button>
          );
        })}
      </div>

      <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-rng-muted">
        Effect
      </div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(FX_EFFECTS) as FxEffectId[]).map((id) => {
          const on = id === effect;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setEffect(id)}
              className={cnFxChip(on, "rng")}
            >
              {id}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function cnFxChip(on: boolean, variant: "gobby" | "rng") {
  const base =
    "cursor-pointer rounded-full px-3 py-1.5 font-sans text-xs font-semibold capitalize transition-all duration-150";
  if (variant === "gobby") {
    return `${base} ${
      on
        ? "border border-[rgba(132,155,73,0.6)] bg-[rgba(132,155,73,0.14)] text-[#c4d68a]"
        : "border border-rng-surface-2 bg-rng-surface/50 text-zinc-400"
    }`;
  }
  return `${base} rounded-[10px] font-bold ${
    on
      ? "border border-[rgba(99,102,241,0.45)] bg-[rgba(79,70,229,0.2)] text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.18)]"
      : "border border-rng-surface-2 bg-rng-surface/50 text-zinc-400"
  }`;
}
